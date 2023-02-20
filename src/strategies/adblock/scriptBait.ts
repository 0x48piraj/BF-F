import { DetectionStrategy } from '../../core/types'
import { SDK_VERSION } from '../../version'

export const ScriptBaitStrategy: DetectionStrategy = {
  id: 'adblock:script',
  type: 'adblock',
  sdkVersion: SDK_VERSION,
  weight: 1,

  run() {
    const detected =
      (globalThis as any).adBlockerEnabled === true

    return {
      strategy: 'adblock:script',
      block: detected,
      confidence: detected ? 0.7 : 0.2,
      signal: 'adsbygoogle blocked'
    }
  }
}
