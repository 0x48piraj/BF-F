import { DetectionStrategy } from '@bff/core/types'

type StrategyNode = {
  strategy: DetectionStrategy
  edges: Set<string>
  indegree: number
}

export function sortStrategies(
  strategies: DetectionStrategy[]
): DetectionStrategy[] {
  const nodes = new Map<string, StrategyNode>()

  // Initialize nodes
  for (const s of strategies) {
    nodes.set(s.id, {
      strategy: s,
      edges: new Set(),
      indegree: 0
    })
  }

  // Build dependency edges
  for (const s of strategies) {
    const node = nodes.get(s.id)!
    const after = s.after ?? []
    const before = s.before ?? []
    const dependsOn = s.dependsOn ?? []

    for (const dep of [...after, ...dependsOn]) {
      if (dep === s.id) {
          throw new Error(
          `[BFF] Strategy "${s.id}" cannot depend on itself`
          )
      }

      const depNode = nodes.get(dep)
      if (!depNode) {
        throw new Error(
          `[BFF] Strategy "${s.id}" depends on missing strategy "${dep}"`
        )
      }

      depNode.edges.add(s.id)
      node.indegree++
    }

    for (const b of before) {
      const bNode = nodes.get(b)
      if (!bNode) {
        throw new Error(
          `[BFF] Strategy "${s.id}" declares before missing strategy "${b}"`
        )
      }
      node.edges.add(b)
      bNode.indegree++
    }
  }

  // Kahn's algorithm with deterministic ordering
  const queue = [...nodes.values()]
    .filter(n => n.indegree === 0)
    .sort(
      (a, b) =>
        (a.strategy.order ?? 100) - (b.strategy.order ?? 100)
    )

  const result: DetectionStrategy[] = []

  while (queue.length) {
    const node = queue.shift()!
    result.push(node.strategy)

    for (const id of node.edges) {
      const next = nodes.get(id)!
      next.indegree--

      if (next.indegree === 0) {
        queue.push(next)
        queue.sort(
          (a, b) =>
            (a.strategy.order ?? 100) - (b.strategy.order ?? 100)
        )
      }
    }
  }

  if (result.length !== strategies.length) {
    throw new Error('[BFF] Cyclic strategy dependencies detected')
  }

  return result
}
