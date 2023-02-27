import { PolicyRule } from '@bff/policy/types'
import { confidenceRule } from '@bff/policy/ruleHelpers'

export const balancedPolicy: PolicyRule[] = [
  confidenceRule(0.9, 'block', 'Very high confidence'),
  confidenceRule(0.6, 'challenge', 'Suspicious behavior'),
  confidenceRule(0.3, 'monitor', 'Low confidence signal')
]
