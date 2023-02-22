import { PolicyRule } from '../../policy/rules'
import { confidenceRule } from '../../policy/ruleHelpers'

export const aggressivePolicy: PolicyRule[] = [
  confidenceRule(0.7, 'block', 'High confidence'),
  confidenceRule(0.4, 'challenge', 'Suspicious behavior')
]
