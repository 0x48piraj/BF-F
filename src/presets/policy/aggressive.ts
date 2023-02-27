import { PolicyRule } from '@bff/policy/types'
import { confidenceRule } from '@bff/policy/ruleHelpers'
import { anyHardBlockRule } from '@bff/policy/rules'

export const aggressivePolicy: PolicyRule[] = [
  anyHardBlockRule(0.6),
  confidenceRule(0.7, 'block', 'High confidence'),
  confidenceRule(0.4, 'challenge', 'Suspicious behavior')
]
