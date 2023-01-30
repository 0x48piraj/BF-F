import { BFFEngine } from '../core/engine'
import {
  ScriptBaitStrategy,
  DomBaitStrategy
} from '../strategies/adblock'
import {
  WebdriverStrategy,
  HeadlessVarsStrategy
} from '../strategies/bot'

export function createDefaultBFF() {
  return new BFFEngine()
    .use(ScriptBaitStrategy)
    .use(DomBaitStrategy)
    .use(WebdriverStrategy)
    .use(HeadlessVarsStrategy)
}
