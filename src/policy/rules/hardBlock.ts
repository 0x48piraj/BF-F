import { PolicyRule } from '@bff/policy/types'

export const anyHardBlockRule = (
  minConfidence = 0.7
): PolicyRule => result => {
  const hasHardBlock = result.signals.some(
    s => s.block && s.confidence >= minConfidence
  )

  return hasHardBlock
    ? {
        action: 'block',
        reason: 'Hard blocking signal present',
        confidence: result.confidence
      }
    : null
}
