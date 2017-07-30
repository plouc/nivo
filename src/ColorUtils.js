/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash'
import { spring } from 'react-motion'
import {
    scaleOrdinal,
    schemeCategory10,
    schemeCategory20,
    schemeCategory20b,
    schemeCategory20c,
    rgb,
} from 'd3'
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

    const inheritMatches = instruction.match(
        /inherit:(darker|brighter)\(([0-9.]+)\)/
    )
    if (inheritMatches) {
        const method = inheritMatches[1]
        const amount = inheritMatches[2]

        return d => rgb(d.color || d.data.color)[method](parseFloat(amount))
    }

    return instruction
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
        colorR: spring(
            color.r,
            Object.assign({}, springConfig, { precision: 1 })
        ),
        colorG: spring(
            color.g,
            Object.assign({}, springConfig, { precision: 1 })
        ),
        colorB: spring(
            color.b,
            Object.assign({}, springConfig, { precision: 1 })
        ),
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
    scaleOrdinal([
        '#e8c1a0',
        '#f47560',
        '#f1e15b',
        '#e8a838',
        '#61cdbb',
        '#97e3d5',
    ])

const dataColor = d => d.color || d.data.color

export const getColorRange = instruction => {
    if (instruction === 'data') {
        return dataColor
    }

    if (instruction === 'nivo') {
        return nivoCategoricalColors()
    }

    if (_.isFunction(instruction)) {
        return instruction
    }

    if (d3Colors[instruction]) {
        return d3Colors[instruction]
    }

    if (_.isArray(instruction)) {
        return scaleOrdinal(instruction)
    }

    return () => instruction
}
