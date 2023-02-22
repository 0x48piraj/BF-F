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
