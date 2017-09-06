/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memoize, isFunction, get } from 'lodash'
import { rgb } from 'd3-color'

/**
 * Memoize both color generator & color generator result.
 */
const memoizedColorModifier = memoize((method, _amount) => {
    const amount = parseFloat(_amount)

    return memoize(
        d =>
            rgb(d.color)
                [method](amount)
                .toString(),
        d => d.color
    )
}, (method, amount) => `${method}.${amount}`)

const noneGenerator = () => 'none'
const inheritGenerator = d => d.color

/**
 * @param {string|Function} instruction
 * @param {string}          [themeKey]
 * @return {Function}
 */
export const getInheritedColorGenerator = (instruction, themeKey) => {
    if (instruction === 'none') return noneGenerator

    if (isFunction(instruction)) return instruction

    if (instruction === 'theme') {
        if (!themeKey) {
            throw new Error(`Cannot use 'theme' directive without providing 'themeKey'`)
        }

        return (d, theme) => get(theme, themeKey)
    }

    if (instruction === 'inherit') return inheritGenerator

    const inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/)
    if (inheritMatches) {
        const method = inheritMatches[1]
        const amount = inheritMatches[2]

        return memoizedColorModifier(method, amount)
    }

    return () => instruction
}
