import { createDefaultBFF } from '@bff/presets/core/default'
import { createStrictBFF } from '@bff/presets/core/strict'
import { SDK_VERSION } from '@bff/version'
import { PolicyEngine } from '@bff/policy/engine'
import { confidenceRule } from '@bff/policy/ruleHelpers'

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

    // Policy
    PolicyEngine,
    confidenceRule,

    // Presets
    presets: {
      default: createDefaultBFF,
      strict: createStrictBFF
    },

    version: SDK_VERSION
  }
}
