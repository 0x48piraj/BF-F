import {
  DetectionStrategy,
  DetectionType,
  DetectionResult
} from './types'
import { createContext } from './context'
import { aggregate } from './result'
import { SDK_VERSION } from '../version'

export class BFFEngine {
  readonly version = SDK_VERSION
  private strategies = new Map<string, DetectionStrategy>()

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

    for (const strategy of this.strategies.values()) {
      if (strategy.type !== type) continue

      try {
        const raw = await strategy.run(ctx)

        const signal = {
            strategy: strategy.id,
            block: Boolean(raw.block),
            signal: raw.signal,
            error: raw.error,
            confidence: raw.confidence,
            weight: raw.weight ?? strategy.weight
        }

        signals.push(signal)

        if (signal.block) break
      } catch (err) {
        signals.push({
          strategy: strategy.id,
          block: false,
          error: true,
          confidence: 0,
          weight: strategy.weight,
          signal:
          err instanceof Error ? err.message : 'strategy execution error'
        })
      }
    }

    return aggregate(signals)
  }

  async detectAll(ctx = createContext()) {
    return {
      adblock: await this.detect('adblock', ctx),
      bot: await this.detect('bot', ctx),
      browser: await this.detect('browser', ctx)
    }
  }
}
