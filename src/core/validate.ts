export function normalizeWeight(w?: number): number {
  if (typeof w !== 'number' || Number.isNaN(w)) return 1
  return Math.min(5, Math.max(0.5, w))
}

export function normalizeConfidence(c?: number): number {
  if (typeof c !== 'number' || Number.isNaN(c)) return 0
  return Math.min(1, Math.max(0, c))
}

export function normalizeSuspicion(s: number): number {
  return Math.min(1, s)
}
