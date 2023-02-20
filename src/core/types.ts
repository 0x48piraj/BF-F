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

export interface DetectionSignal {
  strategy: string
  block: boolean
  signal?: string
  weight?: number
  confidence?: number
  error?: boolean
  evidence?: Record<string, unknown>
}

export interface DetectionResult {
  blocked: boolean
  confidence: number
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
  run(ctx: DetectionContext): DetectionSignal | Promise<DetectionSignal>
}

export type DetectionAggregator = (
  signals: DetectionSignal[]
) => DetectionResult

export interface BFFHooks {
  onSignal?(signal: DetectionSignal, ctx: DetectionContext): void
  onResult?(result: DetectionResult, ctx: DetectionContext): void
}
