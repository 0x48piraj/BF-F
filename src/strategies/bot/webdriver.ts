import { DetectionStrategy } from '../../core/types'
import { SDK_VERSION } from '../../version'

export const WebdriverStrategy: DetectionStrategy = {
  id: 'bot:webdriver',
  type: 'bot',
  version: SDK_VERSION,
  weight: 4,

  run({ navigator }) {
    const detected = navigator.webdriver === true

    return {
      strategy: 'bot:webdriver',
      block: detected,
      confidence: detected ? 1 : 0,
      signal: 'navigator.webdriver',
      evidence: {
          webdriver: navigator.webdriver
      }
    }
  }
}
