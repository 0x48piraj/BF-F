import { PolicyRule } from '@bff/policy/types'
import { confidenceRule } from '@bff/policy/ruleHelpers'

export const aggressivePolicy: PolicyRule[] = [
  confidenceRule(0.7, 'block', 'High confidence'),
  confidenceRule(0.4, 'challenge', 'Suspicious behavior')
]
