import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import set from 'lodash/set'
import {
    DefSpec,
    GradientSpec,
    PatternSpec,
    isDefSpec,
    isPatternSpec,
    isGradientSpec,
} from '../components/defs'
import { MatchPredicate, RuleSpec } from './types'

/** Check a node matches given def predicate. */
export const isMatchingDef = (
    predicate: MatchPredicate,
    node: Record<string, unknown>,
    dataKey?: string
): boolean => {
    if (predicate === '*') {
        return true
    } else if (isFunction(predicate)) {
        return predicate(node)
    } else if (isPlainObject(predicate)) {
        const data = dataKey ? get(node, dataKey) : node
        return isEqual(pick(data, Object.keys(predicate)), predicate)
    }
    return false
}

// Note: this function can have side effects on the prop 'node'
const bindPattern = (
    def: PatternSpec,
    node: Record<string, unknown>,
    colorKey: string,
    targetKey: string,
    id: string
): null | PatternSpec => {
    if (def.background === 'inherit' || def.color === 'inherit') {
        const nodeColor = String(get(node, colorKey))
        let background = def.background
        let color = def.color

        let inheritedId = id
        if (def.background === 'inherit') {
            inheritedId = `${inheritedId}.bg.${nodeColor}`
            background = nodeColor
        }
        if (def.color === 'inherit') {
            inheritedId = `${inheritedId}.fg.${nodeColor}`
            color = nodeColor
        }

        set(node, targetKey, `url(#${inheritedId})`)
        return {
            ...def,
            id: inheritedId,
            background,
            color,
        }
    } else {
        // do not generate new def as there's no inheritance involved
        set(node, targetKey, `url(#${id})`)
    }
    return null
}

// Note: this function can have side effects on the prop 'node'
const bindGradient = (
    def: GradientSpec,
    node: Record<string, unknown>,
    colorKey: string,
    targetKey: string,
    id: string
): null | GradientSpec => {
    const allColors = def.colors.map(({ color }) => color)

    if (allColors.includes('inherit')) {
        const nodeColor = String(get(node, colorKey))
        let inheritedId = id
        const inheritedDef = {
            ...def,
            colors: def.colors.map((colorStop, i) => {
                if (colorStop.color !== 'inherit') return colorStop

                inheritedId = `${inheritedId}.${i}.${nodeColor}`

                return {
                    ...colorStop,
                    color: colorStop.color === 'inherit' ? nodeColor : colorStop.color,
                }
            }),
        }
        inheritedDef.id = inheritedId
        set(node, targetKey, `url(#${inheritedId})`)
        return inheritedDef
    } else {
        // do not generate new def as there's no inheritance involved
        set(node, targetKey, `url(#${id})`)
    }

    return null
}

/**
 * Apply SVG defs on a set of nodes, and return the defs that have been applied
 *
 * Note: this function can have side effects on items in the array 'nodes'
 */
export const bindDefs = (
    defs: DefSpec[],
    nodes: Record<string, unknown>[],
    rules: RuleSpec[],
    {
        dataKey,
        colorKey = 'color',
        targetKey = 'fill',
    }: {
        dataKey?: string
        colorKey?: string
        targetKey?: string
    } = {}
): DefSpec[] => {
    let boundDefs: DefSpec[] = []

    // will hold generated variation ids,
    // to avoid generating multiple identical defs
    const generatedIds = new Set()

    if (defs.length && nodes.length) {
        // first, add base defs
        boundDefs = [...defs]

        // find node-rule combinations
        const hits = nodes
            .map(node => {
                return [node, rules.findIndex(({ match }) => isMatchingDef(match, node, dataKey))]
            })
            .filter(([_, i]) => i >= 0)

        // apply defs (this loop modifies nodes, boundDefs, generatedIds)
        hits.forEach(([node, index]) => {
            const id = rules[Number(index)].id
            const def = defs.find(({ id: defId }) => defId === id)
            let boundDef: DefSpec | null = null
            if (isPatternSpec(def)) {
                boundDef = bindPattern(
                    def,
                    node as Record<string, unknown>,
                    colorKey,
                    targetKey,
                    id
                )
            } else if (isGradientSpec(def)) {
                boundDef = bindGradient(
                    def,
                    node as Record<string, unknown>,
                    colorKey,
                    targetKey,
                    id
                )
            }
            if (isDefSpec(boundDef) && !generatedIds.has(boundDef.id)) {
                boundDefs.push(boundDef)
                generatedIds.add(boundDef.id)
            }
        })
    }
    return boundDefs
}
