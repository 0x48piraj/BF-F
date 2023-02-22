import { DetectionResult } from '@bff/core/types'
import { PolicyDecision } from '@bff/policy/types'

export type PolicyRule = (
  result: DetectionResult
) => PolicyDecision | null
