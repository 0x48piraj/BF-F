import { DetectionStrategy } from '../../core/types'
import { SDK_VERSION } from '../../version'

const FLAGS = [
  '__nightmare',
  '_phantom',
  'callPhantom',
  '_selenium',
  'webdriver'
]

export const HeadlessVarsStrategy: DetectionStrategy = {
  id: 'bot:globals',
  type: 'bot',
  version: SDK_VERSION,
  weight: 2.5,

  run({ window }) {
    const detected = FLAGS.some(key => key in window)

    return {
      strategy: 'bot:globals',
      block: detected,
      confidence: detected ? 0.7 : 0.3,
      signal: 'headless global variables'
    }
  }
}
