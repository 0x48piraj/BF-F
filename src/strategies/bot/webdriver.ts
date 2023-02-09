import { DetectionStrategy } from '../../core/types'

export const WebdriverStrategy: DetectionStrategy = {
  id: 'bot:webdriver',
  type: 'bot',
  version: '1.0.0',
  weight: 4,

  run({ navigator }) {
    const detected = navigator.webdriver === true

    return {
      strategy: 'bot:webdriver',
      block: detected,
      confidence: detected ? 1 : 0,
      signal: 'navigator.webdriver'
    }
  }
}
