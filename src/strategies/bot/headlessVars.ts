import { DetectionStrategy } from '../../core/types'

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
  version: '1.0.0',
  weight: 2.5,

  run({ window }) {
    const detected = FLAGS.some(key => key in window)

    return {
      strategy: this.id,
      block: detected,
      confidence: detected ? 0.7 : 0.3,
      signal: 'headless global variables'
    }
  }
}
