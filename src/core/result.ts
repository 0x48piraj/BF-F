import { DetectionSignal, DetectionResult } from './types'

export function aggregate(signals: DetectionSignal[]): DetectionResult {
  const positives = signals.filter(s => s.block)

  return {
    blocked: positives.length > 0,
    confidence: signals.length
      ? positives.length / signals.length
      : 0,
    signals
  }
}
