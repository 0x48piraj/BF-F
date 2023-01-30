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
        const signal = await strategy.run(ctx)
        signals.push(signal)

        if (signal.block) break
      } catch {
        signals.push({
          strategy: strategy.id,
          block: false,
          error: true
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
