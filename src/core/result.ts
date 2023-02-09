import { DetectionSignal, DetectionResult } from './types'
import { normalizeWeight, normalizeConfidence } from './validate'
import { SDK_VERSION } from '../version'

export function aggregate(signals: DetectionSignal[]): DetectionResult {
  let total = 0
  let positive = 0

  for (const s of signals) {
    const weight = normalizeWeight(s.weight)
    const confidence = normalizeConfidence(s.confidence)
    const contribution = weight * confidence

    total += contribution
    if (s.block) positive += contribution
  }

  return {
    blocked: positive > 0,
    confidence: total > 0 ? positive / total : 0,
    signals,
    version: SDK_VERSION
  }
}
