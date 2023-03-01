import { DetectionStrategy } from '@bff/core/types'
import { SDK_VERSION } from '@bff/version'

export const WebdriverStrategy: DetectionStrategy = {
  id: 'bot:webdriver',
  type: 'bot',
  sdkVersion: SDK_VERSION,
  weight: 4,

  run({ navigator }) {
    const detected = navigator.webdriver === true

    return {
      block: detected,
      confidence: detected ? 1 : 0,
      signal: 'navigator.webdriver',
      evidence: {
          webdriver: navigator.webdriver
      }
    }
  }
}
