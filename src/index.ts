import { createDefaultBFF } from './presets/default'
export * from './version'

const engine = createDefaultBFF()

// Named exports (for ESM / CJS)
export { engine as BFF }
export * from './core/types'

export default engine
