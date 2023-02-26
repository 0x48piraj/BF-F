import { DetectionSignal, DetectionResult } from '@bff/core/types'
import { normalizeSuspicion } from '@bff/core/validate'
import { SDK_VERSION } from '@bff/version'

export function aggregate(signals: DetectionSignal[]): DetectionResult {
  let suspicion = 0

  for (const s of signals) {
    const contribution = s.weight * s.confidence
    suspicion += contribution
  }

  return {
    confidence: normalizeSuspicion(suspicion),
    suspicion,
    signals,
    sdkVersion: SDK_VERSION
  }
}
