import { PolicyRule } from '../../policy/rules'
import { confidenceRule } from '../../policy/ruleHelpers'

export const conservativePolicy: PolicyRule[] = [
  confidenceRule(0.8, 'monitor', 'High suspicion'),
  confidenceRule(0.5, 'monitor', 'Moderate suspicion')
]
