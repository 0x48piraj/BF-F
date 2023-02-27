import { DetectionResult } from '@bff/core/types'

export type PolicyAction =
  | 'allow'
  | 'block'
  | 'challenge'
  | 'monitor'

export interface PolicyDecision {
  action: PolicyAction
  reason: string
  confidence: number
}

/**
 * A policy rule evaluates a DetectionResult
 * and may return a decision.
 */
export type PolicyRule = (
  result: DetectionResult
) => PolicyDecision | null
