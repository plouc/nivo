/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash'
import { spring } from 'react-motion'
import { rgb } from 'd3-color'
import {
    scaleOrdinal,
    schemeCategory10,
    schemeCategory20,
    schemeCategory20b,
    schemeCategory20c,
} from 'd3-scale'
import {
    schemeAccent,
    schemeDark2,
    schemePaired,
    schemePastel1,
    schemePastel2,
    schemeSet1,
    schemeSet2,
    schemeSet3,
} from 'd3-scale-chromatic'

export const getColorGenerator = instruction => {
    if (instruction === 'none') {
        return 'none'
    }

    if (_.isFunction(instruction)) {
        return instruction
    }

    if (instruction === 'inherit') {
        return d => d.color || d.data.color
    }

    const inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/)
    if (inheritMatches) {
        const method = inheritMatches[1]
        const amount = inheritMatches[2]

        return d => rgb(d.color || d.data.color)[method](parseFloat(amount))
    }

    return () => instruction
}

export const getColorStyleObject = (instruction, property) => {
    const style = {}

    const color = getColorGenerator(instruction)
    if (color !== 'none') {
        style[property] = color
    }

    return style
}

export const extractRGB = (_color, springConfig) => {
    const color = rgb(_color)

    if (!springConfig) {
        return {
            colorR: color.r,
            colorG: color.g,
            colorB: color.b,
        }
    }

    return {
        colorR: spring(color.r, Object.assign({}, springConfig, { precision: 1 })),
        colorG: spring(color.g, Object.assign({}, springConfig, { precision: 1 })),
        colorB: spring(color.b, Object.assign({}, springConfig, { precision: 1 })),
    }
}

const d3Colors = {
    d310: scaleOrdinal(schemeCategory10),
    d320: scaleOrdinal(schemeCategory20),
    d320b: scaleOrdinal(schemeCategory20b),
    d320c: scaleOrdinal(schemeCategory20c),
    accent: scaleOrdinal(schemeAccent),
    dark2: scaleOrdinal(schemeDark2),
    paired: scaleOrdinal(schemePaired),
    pastel1: scaleOrdinal(schemePastel1),
    pastel2: scaleOrdinal(schemePastel2),
    set1: scaleOrdinal(schemeSet1),
    set2: scaleOrdinal(schemeSet2),
    set3: scaleOrdinal(schemeSet3),
}

export const nivoCategoricalColors = () =>
    scaleOrdinal(['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'])

const dataColor = d => d.color || d.data.color

export const getColorRange = instruction => {
    if (instruction === 'data') return dataColor

    if (instruction === 'nivo') return nivoCategoricalColors()

    if (_.isFunction(instruction)) return instruction

    if (d3Colors[instruction]) return d3Colors[instruction]

    if (_.isArray(instruction)) return scaleOrdinal(instruction)

    return () => instruction
}

export const getColorsGenerator = (colors, colorBy) => {
    // skip range, color should be bound to data
    if (_.isFunction(colorBy)) return d => colorBy(d)

    let scale
    let getColorId = d => _.get(d, colorBy)

    if (colors === 'nivo') {
        // use default nivo categorical colors
        scale = nivoCategoricalColors()
    } else if (d3Colors[colors]) {
        // use predefined d3 colors
        scale = d3Colors[colors]
    } else if (_.isArray(colors)) {
        // user defined color range
        scale = scaleOrdinal(colors)
    } else {
        // just use provided value, all elements will have identical color
        return d => colors
    }

    return d => scale(getColorId(d))
}

/**
 * Memoize both color generator & color generator result.
 */
const memoizedColorModifier = _.memoize((method, _amount) => {
    const amount = parseFloat(_amount)

    return _.memoize(d => rgb(d.color)[method](amount).toString(), d => d.color)
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

    if (_.isFunction(instruction)) return instruction

    if (instruction === 'theme') {
        return (d, theme) => _.get(theme, themeKey)
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
