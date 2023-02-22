import { createDefaultBFF } from './presets/core/default'
import { createStrictBFF } from './presets/core/strict'
import { SDK_VERSION } from './version'

if (typeof window === 'undefined') {
  throw new Error(
    '[BFF] Browser build loaded in a non-browser environment. ' +
    'Use the ESM/CJS build instead.'
  )
}

const g = window as any

if (!g.BFF) {
  const defaultEngine = createDefaultBFF()

  g.BFF = {
    // Singleton
    detect: defaultEngine.detect.bind(defaultEngine),
    engine: defaultEngine,

    // Factories
    create: createDefaultBFF,

    // Presets
    presets: {
      default: createDefaultBFF,
      strict: createStrictBFF
    },

    version: SDK_VERSION
  }
}
