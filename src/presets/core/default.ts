import { BFFEngine } from '@bff/core/engine'
import {
  ScriptBaitStrategy,
  DomBaitStrategy
} from '@bff/strategies/adblock'
import {
  WebdriverStrategy,
  HeadlessVarsStrategy
} from '@bff/strategies/bot'

export function createDefaultBFF() {
  return new BFFEngine()
    .use(ScriptBaitStrategy)
    .use(DomBaitStrategy)
    .use(WebdriverStrategy)
    .use(HeadlessVarsStrategy)
}
