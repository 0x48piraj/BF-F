import { DetectionResult } from '../core/types'
import { PolicyDecision } from './types'

export type PolicyRule = (
  result: DetectionResult
) => PolicyDecision | null
