import { DetectionResult } from '@bff/core/types'
import { PolicyDecision } from '@bff/policy/types'
import { PolicyRule } from '@bff/policy/rules'

export class PolicyEngine {
  private rules: PolicyRule[] = []

  use(rule: PolicyRule): this {
    this.rules.push(rule)
    return this
  }

  evaluate(result: DetectionResult): PolicyDecision {
    for (const rule of this.rules) {
      const decision = rule(result)
      if (decision) return decision
    }

    return {
      action: 'allow',
      reason: 'no policy matched',
      confidence: result.confidence
    }
  }
}
