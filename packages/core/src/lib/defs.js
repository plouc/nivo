import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import set from 'lodash/set'
import { gradientTypes, patternTypes } from '../components/defs'

const gradientKeys = Object.keys(gradientTypes)
const patternKeys = Object.keys(patternTypes)

/**
 * Check a node matches given def predicate.
 *
 * @param {string|Function|Object} predicate
 * @param {Object}                 node
 * @param {string}                 [dataKey] - Optional path to access node data
 * @returns {boolean}
 */
export const isMatchingDef = (predicate, node, dataKey) => {
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
 *
 * @param {Array.<Object>} defs               - Base SVG defs configs
 * @param {Array.<Object>} nodes              - Data nodes to apply defs on
 * @param {Array.<Object>} rules              - Rules used to conditionally apply defs on data nodes
 * @param {string}         [dataKey]          - Path to node data, used for rule object query based predicate
 * @param {string}         [colorKey='color'] - Node color path, required when inheritance is involved
 * @param {string}         [targetKey='fill'] - Node target property to apply def ID on
 * @returns {Array}
 */
export const bindDefs = (
    defs,
    nodes,
    rules,
    { dataKey, colorKey = 'color', targetKey = 'fill' } = {}
) => {
    let boundDefs = []

    // will hold generated variation ids,
    // to avoid generating multiple identical defs
    const generatedIds = {}

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
                            const allColors = def.colors.map(({ color }) => color)

                            if (allColors.includes('inherit')) {
                                const nodeColor = get(node, colorKey)

                                let inheritedId = id
                                const inheritedDef = {
                                    ...def,
                                    colors: def.colors.map((colorStop, i) => {
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
