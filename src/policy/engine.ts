import { DetectionResult } from '../core/types'
import { PolicyDecision } from './types'
import { PolicyRule } from './rules'

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
