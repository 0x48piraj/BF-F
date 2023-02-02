import { DetectionStrategy } from '../../core/types'

export const DomBaitStrategy: DetectionStrategy = {
  id: 'adblock:dom',
  type: 'adblock',
  version: '1.0.0',
  weight: 1.5,

  run({ document }) {
    const bait = document.createElement('div')
    bait.className = 'adsbox ad-banner'
    bait.style.cssText =
      'height:1px;position:absolute;left:-9999px'

    document.body.appendChild(bait)

    const blocked = bait.offsetHeight === 0
    bait.remove()

    return {
      strategy: this.id,
      block: blocked,
      confidence: blocked ? 0.8 : 0.3,
      signal: 'dom bait hidden'
    }
  }
}
