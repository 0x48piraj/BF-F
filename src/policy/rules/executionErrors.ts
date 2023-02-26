import { PolicyRule } from '@bff/policy/rules'

export const unstableEnvironmentRule = (
  minErrors = 2
): PolicyRule => result => {
  const errors = result.signals.filter(
    s => s.executionError
  )

  return errors.length >= minErrors
    ? {
        action: 'monitor',
        reason: 'Multiple strategy execution failures',
        confidence: result.confidence
      }
    : null
}
