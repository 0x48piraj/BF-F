export type DetectionType = 'adblock' | 'bot' | 'browser'

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
  confidence?: number
  error?: boolean
}

export interface DetectionResult {
  blocked: boolean
  confidence: number
  signals: DetectionSignal[]
}

export interface DetectionStrategy {
  id: string
  type: DetectionType
  version?: string
  run(ctx: DetectionContext): DetectionSignal | Promise<DetectionSignal>
}
