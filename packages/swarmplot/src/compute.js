/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import { scaleOrdinal, scaleLinear } from 'd3-scale'
import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
import { computeScale, generateSeriesAxis, createDateNormalizer } from '@nivo/scales'

export const getSizeGenerator = size => {
    if (typeof size === 'function') return size
    if (isNumber(size)) return () => size
    if (isPlainObject(size)) {
        if (!isString(size.key)) {
            throw new Error(
                'Size is invalid, key should be a string pointing to the property to use to determine node size'
            )
        }
        if (!Array.isArray(size.values) || size.values.length !== 2) {
            throw new Error(
                'Size is invalid, values spec should be an array containing two values, min and max'
            )
        }
        if (!Array.isArray(size.sizes) || size.sizes.length !== 2) {
            throw new Error(
                'Size is invalid, sizes spec should be an array containing two values, min and max'
            )
        }

        const sizeScale = scaleLinear()
            .domain([size.values[0], size.values[1]])
            .range([size.sizes[0], size.sizes[1]])

        return d => sizeScale(get(d, size.key))
    }

    throw new Error('Size is invalid, it should be either a function, a number or an object')
}

export const computeValueScale = ({ width, height, axis, getValue, scale, data }) => {
    const values = data.map(getValue)
    if (scale.type === 'time') {
        const series = [{ data: values.map(p => ({ data: { [axis]: p } })) }]
        const axes = generateSeriesAxis(series, axis, scale)
        return computeScale({ ...scale, axis }, { [axis]: axes }, width, height)
    } else {
        const min = Math.min(...values)
        const max = Math.max(...values)
        return computeScale({ ...scale, axis }, { [axis]: { min, max } }, width, height)
    }
}

export const computeOrdinalScale = ({ width, height, axis, groups, gap }) => {
    if (!Array.isArray(groups) || groups.length === 0) {
        throw new Error(`'groups' should be an array containing at least one item`)
    }

    const groupCount = groups.length

    let groupSize
    if (axis === 'x') {
        groupSize = (height - gap * (groupCount - 1)) / groupCount
    } else if (axis === 'y') {
        groupSize = (width - gap * (groupCount - 1)) / groupCount
    }

    const range = groups.map((g, i) => i * (groupSize + gap) + groupSize / 2)

    return scaleOrdinal(range).domain(groups)
}

export const computeForces = ({ axis, valueScale, ordinalScale, spacing, forceStrength }) => {
    const collisionForce = forceCollide(d => d.size / 2 + spacing / 2)

    let xForce
    let yForce
    if (axis === 'x') {
        xForce = forceX(d => {
            //console.log(d)
            return valueScale(d.value)
        }).strength(forceStrength)
        yForce = forceY(d => ordinalScale(d.group))
    } else if (axis === 'y') {
        xForce = forceX(d => ordinalScale(d.group))
        yForce = forceY(d => valueScale(d.value)).strength(forceStrength)
    }

    return { x: xForce, y: yForce, collision: collisionForce }
}

export const getParsedValue = scaleSpec => {
    if (scaleSpec.type === 'linear') {
        return parseFloat
    } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
        return createDateNormalizer(scaleSpec)
    } else {
        return x => x
    }
}

export const computeNodes = ({
    data,
    getIdentity,
    layout,
    getValue,
    valueScale,
    getGroup,
    ordinalScale,
    getSize,
    forces,
    simulationIterations,
    valueScaleConfig,
}) => {
    const config = {
        horizontal: ['x', 'y'],
        vertical: ['y', 'x'],
    }

    const simulatedNodes = data.map(d => ({
        id: getIdentity(d),
        group: getGroup(d),
        value: getParsedValue(valueScaleConfig)(getValue(d)),
        size: getSize(d),
        data: { ...d },
    }))
    const simulation = forceSimulation(simulatedNodes)
        .force('x', forces.x)
        .force('y', forces.y)
        .force('collide', forces.collision)
        .stop()

    simulation.tick(simulationIterations)

    return {
        [`${config[layout][0]}Scale`]: valueScale,
        [`${config[layout][1]}Scale`]: ordinalScale,
        nodes: simulation.nodes(),
    }
}
