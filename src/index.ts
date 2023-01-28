import { createDefaultDecog } from './presets/default'

const engine = createDefaultDecog()

// Named exports (for ESM / CJS)
export { engine as Decog }
export * from './core/types'

export default engine
