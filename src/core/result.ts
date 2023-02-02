import { DetectionSignal, DetectionResult } from './types'

export function aggregate(signals: DetectionSignal[]): DetectionResult {
  let total = 0
  let positive = 0

  for (const s of signals) {
    const weight = s.weight ?? 1
    const confidence = s.confidence ?? 1
    const contribution = weight * confidence

    total += contribution
    if (s.block) positive += contribution
  }

  return {
    blocked: positive > 0,
    confidence: total > 0 ? positive / total : 0,
    signals
  }
}
