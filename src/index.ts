import { createDefaultDecog } from './presets/default'
export * from './version'

const engine = createDefaultDecog()

// Named exports (for ESM / CJS)
export { engine as Decog }
export * from './core/types'

export default engine
