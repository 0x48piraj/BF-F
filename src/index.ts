import { createDefaultBFF } from '@bff/presets/core/default'
export * from '@bff/version'
export * from '@bff/core/types'

// Explicit singleton
export const BFF = createDefaultBFF()

// Factory for isolated instances
export { createDefaultBFF }

// Default export
export default BFF
