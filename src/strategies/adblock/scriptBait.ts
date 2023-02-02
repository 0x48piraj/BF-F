import { DetectionStrategy } from '../../core/types'

export const ScriptBaitStrategy: DetectionStrategy = {
  id: 'adblock:script',
  type: 'adblock',
  version: '1.0.0',
  weight: 1,

  run() {
    const detected =
      (globalThis as any).adBlockerEnabled === true

    return {
      strategy: this.id,
      block: detected,
      confidence: detected ? 0.7 : 0.2,
      signal: 'adsbygoogle blocked'
    }
  }
}
