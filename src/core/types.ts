export type DetectionType =
  | 'adblock'
  | 'bot'
  | 'browser'
  | (string & {})

export interface DetectionContext {
  window: Window
  document: Document
  navigator: Navigator
  userAgent: string
  now: number
}

/**
 * What a strategy reports.
 * This is raw, partial, and untrusted.
 */
export interface StrategyResult {
  block?: boolean
  confidence?: number
  signal?: string
  weight?: number
  error?: boolean
  evidence?: Record<string, string | number | boolean | null>
}

/**
 * A normalized, engine-owned signal.
 * This is what aggregation and policies consume.
 */
export interface DetectionSignal {
  strategy: string
  block: boolean
  confidence: number
  weight: number
  signal?: string
  evidence?: Record<string, string | number | boolean | null>
  executionError?: boolean
}

export interface DetectionResult {
  blocked: boolean
  confidence: number
  suspicion: number
  signals: DetectionSignal[]
  sdkVersion?: string
}

export interface DetectionStrategyMeta {
  id: string
  type: DetectionType
  sdkVersion?: string
  description?: string
  weight?: number
  order?: number
  after?: string[]
  before?: string[]
  dependsOn?: string[]
}

export interface DetectionStrategy extends DetectionStrategyMeta {
  run(ctx: DetectionContext): StrategyResult | Promise<StrategyResult>
}

export type DetectionAggregator = (
  signals: DetectionSignal[]
) => DetectionResult

export interface BFFHooks {
  onSignal?(signal: DetectionSignal, ctx: DetectionContext): void
  onResult?(result: DetectionResult, ctx: DetectionContext): void
}
