import { DetectionStrategy } from '../../core/types'

export const WebdriverStrategy: DetectionStrategy = {
  id: 'bot:webdriver',
  type: 'bot',
  version: '1.0.0',

  run({ navigator }) {
    return {
      strategy: this.id,
      block: navigator.webdriver === true,
      signal: 'navigator.webdriver'
    }
  }
}
