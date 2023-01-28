import { DetectionContext } from './types'

export function createContext(): DetectionContext {
  return {
    window,
    document,
    navigator,
    userAgent: navigator.userAgent,
    now: Date.now()
  }
}
