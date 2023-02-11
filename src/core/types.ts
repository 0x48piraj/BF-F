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
  version?: string
}

export interface DetectionStrategyMeta {
  id: string
  type: DetectionType
  version?: string
  description?: string
  weight?: number
}

export interface DetectionStrategy extends DetectionStrategyMeta {
  run(ctx: DetectionContext): DetectionSignal | Promise<DetectionSignal>
}
