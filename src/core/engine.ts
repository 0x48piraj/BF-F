import {
  DetectionStrategy,
  DetectionType,
  DetectionResult,
  DetectionAggregator,
  BFFHooks
} from './types'
import { createContext } from './context'
import { aggregate } from './result'
import { SDK_VERSION } from '../version'
import { sortStrategies } from './strategyGraph'

export class BFFEngine {
  readonly version = SDK_VERSION
  private strategies = new Map<string, DetectionStrategy>()
  private aggregateFn: DetectionAggregator
  private hooks?: BFFHooks

  constructor(
    aggregator: DetectionAggregator = aggregate,
    hooks?: BFFHooks
  ) {
    this.aggregateFn = aggregator
    this.hooks = hooks
  }

  use(strategy: DetectionStrategy): this {
    if (!strategy.id || !strategy.run) {
      throw new Error('Invalid strategy')
    }
    this.strategies.set(strategy.id, strategy)
    return this
  }

  remove(id: string): void {
    this.strategies.delete(id)
  }

  async detect(
    type: DetectionType,
    ctx = createContext()
  ): Promise<DetectionResult> {
    const signals = []

    const candidates = [...this.strategies.values()]
      .filter(s => s.type === type)

    const ordered = sortStrategies(candidates)

    for (const strategy of ordered) {
      if (strategy.type !== type) continue

      try {
        const raw = await strategy.run(ctx)

        const signal = {
            strategy: strategy.id,
            block: Boolean(raw.block),
            signal: raw.signal,
            error: raw.error,
            confidence: raw.confidence,
            weight: raw.weight ?? strategy.weight ?? 1,
            evidence: raw.evidence
        }

        signals.push(signal)
        this.hooks?.onSignal?.(signal, ctx)

        if (signal.block) break
      } catch (err) {
        const signal = {
          strategy: strategy.id,
          block: false,
          error: true,
          confidence: 0,
          weight: strategy.weight ?? 1,
          signal:
          err instanceof Error ? err.message : 'strategy execution error'
        }

        signals.push(signal)
        this.hooks?.onSignal?.(signal, ctx)
        }
    }

    const result = this.aggregateFn(signals)
    this.hooks?.onResult?.(result, ctx)

    return result
    }

  async detectAll(ctx = createContext()) {
    return {
      adblock: await this.detect('adblock', ctx),
      bot: await this.detect('bot', ctx),
      browser: await this.detect('browser', ctx)
    }
  }
}
