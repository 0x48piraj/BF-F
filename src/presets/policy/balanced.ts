import { PolicyRule } from '../../policy/rules'
import { confidenceRule } from '../../policy/ruleHelpers'

export const balancedPolicy: PolicyRule[] = [
  confidenceRule(0.9, 'block', 'Very high confidence'),
  confidenceRule(0.6, 'challenge', 'Suspicious behavior'),
  confidenceRule(0.3, 'monitor', 'Low confidence signal')
]
