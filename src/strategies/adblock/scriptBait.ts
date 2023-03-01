import { DetectionStrategy } from '@bff/core/types'
import { SDK_VERSION } from '@bff/version'

export const ScriptBaitStrategy: DetectionStrategy = {
  id: 'adblock:script',
  type: 'adblock',
  sdkVersion: SDK_VERSION,
  weight: 1,

  run() {
    const detected =
      (globalThis as any).adBlockerEnabled === true

    return {
      block: detected,
      confidence: detected ? 0.7 : 0.2,
      signal: 'adsbygoogle blocked'
    }
  }
}
