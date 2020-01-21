/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { isFunction, isPlainObject, pick, isEqual, get, set, cloneDeep } from 'lodash'
import { DefSpec, isGradientDefSpec, isPatternDefSpec } from '../components/defs'

/**
 * Check a node matches given def predicate.
 * Predicate can be either a wildcard, a function or an object.
 */
export const isMatchingDef = <Datum = any>(
    predicate: ((datum: Datum) => boolean) | '*',
    datum: Datum,
    dataKey?: string
): boolean => {
    if (predicate === '*') {
        return true
    } else if (isFunction(predicate)) {
        return predicate(datum)
    } else if (isPlainObject(predicate)) {
        const data = dataKey ? get(datum, dataKey) : datum
        return isEqual(pick(data, Object.keys(predicate)), predicate)
    }

    return false
}

export interface DefRule {
    id: string
    match: any
}

export interface DatumWithFill {
    fill?: string
}

/**
 * Compute SVG defs.
 */
export const bindDefs = <Datum extends DatumWithFill = any>(
    // Base SVG defs configs
    defs: DefSpec[],
    // Data nodes to apply defs on
    nodes: Datum[],
    // Rules used to conditionally apply defs on data nodes
    rules: DefRule[],
    {
        dataKey,
        colorKey = 'color',
        targetKey = 'fill',
    }: {
        // Path to node data, used for rule object query based predicate
        dataKey?: string
        // Node color path, required when inheritance is involved
        colorKey?: string
        // Node target property to apply def ID on
        targetKey?: string
    } = {}
) => {
    // defs populated with proper ids/parameters
    let boundDefs: any[] = []

    // will hold generated variation ids,
    // to avoid generating multiple identical defs
    const generatedIds: any = {}

    if (defs.length && nodes.length) {
        // first, add base defs
        boundDefs = [...defs]

        nodes.forEach(node => {
            for (const rule of rules) {
                const { id, match } = rule
                if (isMatchingDef(match, node, dataKey)) {
                    const def = defs.find(({ id: defId }) => defId === id)
                    if (def) {
                        if (isPatternDefSpec(def)) {
                            if (def.background === 'inherit' || def.color === 'inherit') {
                                const nodeColor = get(node, colorKey)
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
                                if (!generatedIds[inheritedId]) {
                                    boundDefs.push({
                                        ...def,
                                        id: inheritedId,
                                        background,
                                        color,
                                    })
                                    generatedIds[inheritedId] = 1
                                }
                            } else {
                                // do not generate new def as there's no inheritance involved
                                set(node, targetKey, `url(#${id})`)
                            }
                        } else if (isGradientDefSpec(def)) {
                            const allColors = def.colors.map(({ color }: any) => color)

                            if (allColors.includes('inherit')) {
                                const nodeColor = get(node, colorKey)

                                let inheritedId = id
                                const inheritedDef = {
                                    ...def,
                                    colors: def.colors.map((colorStop: any, i: number) => {
                                        if (colorStop.color !== 'inherit') return colorStop

                                        inheritedId = `${inheritedId}.${i}.${nodeColor}`

                                        return {
                                            ...colorStop,
                                            color:
                                                colorStop.color === 'inherit'
                                                    ? nodeColor
                                                    : colorStop.color,
                                        }
                                    }),
                                }
                                inheritedDef.id = inheritedId

                                set(node, targetKey, `url(#${inheritedId})`)
                                if (!generatedIds[inheritedId]) {
                                    boundDefs.push(inheritedDef)
                                    generatedIds[inheritedId] = 1
                                }
                            } else {
                                // do not generate new def as there's no inheritance involved
                                set(node, targetKey, `url(#${id})`)
                            }
                        }
                    }

                    // break loop on first match
                    break
                }
            }
        })
    }

    return boundDefs
}

export const useBindDefs = <Datum extends DatumWithFill = any>(
    // Base SVG defs configs
    defs: DefSpec[],
    // Data nodes to apply defs on
    nodes: Datum[],
    // Rules used to conditionally apply defs on data nodes
    rules: DefRule[],
    {
        dataKey,
        colorKey = 'color',
        targetKey = 'fill',
    }: {
        // Path to node data, used for rule object query based predicate
        dataKey?: string
        // Node color path, required when inheritance is involved
        colorKey?: string
        // Node target property to apply def ID on
        targetKey?: string
    } = {}
) => {
    // We need to copy the nodes to change refs,
    // required to re-trigger rendering or force
    // further computations when using hooks.
    const nodesCopy = cloneDeep(nodes)

    const boundDefs = useMemo(() => bindDefs(defs, nodesCopy, rules), [defs, nodesCopy, rules])

    return { nodes: nodesCopy, boundDefs }
}
