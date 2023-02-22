import { PolicyRule } from '@bff/policy/rules'
import { confidenceRule } from '@bff/policy/ruleHelpers'

export const conservativePolicy: PolicyRule[] = [
  confidenceRule(0.8, 'monitor', 'High suspicion'),
  confidenceRule(0.5, 'monitor', 'Moderate suspicion')
]
