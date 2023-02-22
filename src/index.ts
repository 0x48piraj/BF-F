import { createDefaultBFF } from './presets/core/default'
export * from './version'
export * from './core/types'

// Explicit singleton
export const BFF = createDefaultBFF()

// Factory for isolated instances
export { createDefaultBFF }

// Default export
export default BFF
