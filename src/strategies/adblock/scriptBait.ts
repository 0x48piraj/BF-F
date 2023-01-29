import { DetectionStrategy } from '../../core/types'

export const ScriptBaitStrategy: DetectionStrategy = {
  id: 'adblock:script',
  type: 'adblock',
  version: '1.0.0',

  run() {
    return {
      strategy: this.id,
      block: (globalThis as any).adBlockerEnabled === true,
      signal: 'adsbygoogle blocked'
    }
  }
}
