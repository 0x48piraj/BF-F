import { DetectionStrategy } from '@bff/core/types'
import { SDK_VERSION } from '@bff/version'

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
  sdkVersion: SDK_VERSION,
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
