import { BFFEngine } from '../core/engine'
import * as Adblock from '../strategies/adblock'
import * as Bot from '../strategies/bot'

export function createStrictBFF() {
  const engine = new BFFEngine()

  Object.values(Adblock).forEach(s => engine.use(s))
  Object.values(Bot).forEach(s => engine.use(s))

  return engine
}
