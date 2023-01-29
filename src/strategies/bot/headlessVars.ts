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

  run({ window }) {
    const detected = FLAGS.some(key => key in window)

    return {
      strategy: this.id,
      block: detected,
      signal: 'headless global variables'
    }
  }
}
