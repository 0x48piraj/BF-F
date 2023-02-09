import { createDefaultBFF } from './presets/default'

if (typeof window === 'undefined') {
  throw new Error(
    '[BFF] Browser build loaded in a non-browser environment. ' +
    'Use the ESM/CJS build instead.'
  )
}

;(window as any).BFF = createDefaultBFF()
