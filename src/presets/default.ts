import { DecogEngine } from '../core/engine'
import {
  ScriptBaitStrategy,
  DomBaitStrategy
} from '../strategies/adblock'
import {
  WebdriverStrategy,
  HeadlessVarsStrategy
} from '../strategies/bot'

export function createDefaultDecog() {
  return new DecogEngine()
    .use(ScriptBaitStrategy)
    .use(DomBaitStrategy)
    .use(WebdriverStrategy)
    .use(HeadlessVarsStrategy)
}
