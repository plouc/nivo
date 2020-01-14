/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { isFunction, isPlainObject, pick, isEqual, get, set } from 'lodash'
import { gradientTypes, patternTypes } from '../components/defs'

const gradientKeys = Object.keys(gradientTypes)
const patternKeys = Object.keys(patternTypes)

/**
 * Check a node matches given def predicate.
 * Predicate can be either a wildcard, a function or an object.
 */
export const isMatchingDef = (predicate: any, node: any, dataKey?: string) => {
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

/**
 * Compute SVG defs.
 */
export const bindDefs = (
    // Base SVG defs configs
    defs: any[],
    // Data nodes to apply defs on
    nodes: any[],
    // Rules used to conditionally apply defs on data nodes
    rules: any[],
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
    let boundDefs: any[] = []

    // will hold generated variation ids,
    // to avoid generating multiple identical defs
    const generatedIds: any = {}

    if (defs.length && nodes.length) {
        // first, add base defs
        boundDefs = [...defs]

        nodes.forEach(node => {
            for (let i = 0; i < rules.length; i++) {
                const { id, match } = rules[i]
                if (isMatchingDef(match, node, dataKey)) {
                    const def = defs.find(({ id: defId }) => defId === id)
                    if (def) {
                        if (patternKeys.includes(def.type)) {
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
                        } else if (gradientKeys.includes(def.type)) {
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
