import { PolicyRule } from '@bff/policy/types'

export const confidenceRule =
  (
    threshold: number,
    action: 'block' | 'challenge' | 'monitor',
    reason?: string
  ): PolicyRule =>
  result =>
    result.confidence >= threshold
      ? {
          action,
          reason: reason ?? `confidence >= ${threshold}`,
          confidence: result.confidence
        }
      : null
