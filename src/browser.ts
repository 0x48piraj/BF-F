import { createDefaultBFF } from './presets/default'

if (typeof window === 'undefined') {
  throw new Error(
    '[BFF] Browser build loaded in a non-browser environment. ' +
    'Use the ESM/CJS build instead.'
  )
}

const g = window as any

if (!g.BFF) {
  g.BFF = {
    create: createDefaultBFF,
    version: '1.0.0'
  }
}
