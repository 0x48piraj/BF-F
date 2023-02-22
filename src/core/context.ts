import { DetectionContext } from '@bff/core/types'

export function createContext(): DetectionContext {
  if (typeof window === 'undefined') {
    throw new Error(
      '[BFF] createContext() called outside a browser environment. ' +
      'Provide a DetectionContext explicitly if running in tests or SSR.'
    )
  }

  return {
    window,
    document,
    navigator,
    userAgent: navigator.userAgent,
    now: Date.now()
  }
}
