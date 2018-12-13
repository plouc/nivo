/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleOrdinal } from 'd3-scale'
import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force'
import { generateSeriesAxis, computeScale } from '@nivo/scales'

export const computeBeeSwarmValueScale = ({ axis, scale, data, width, height }) => {
    const values = generateSeriesAxis(data, axis, scale, {
        getValue: d => d.value,
        setValue: (d, v) => {
            d.value = v
        },
    })

    return computeScale({ ...scale, axis }, { [axis]: values }, width, height)
}

export const computeBeeSwarmOrdinalScale = ({ axis, data, gap, width, height }) => {
    const serieCount = data.length
    let serieSize
    if (data.length === 0) {
        serieSize = axis === 'x' ? height : width
    } else if (axis === 'x') {
        serieSize = (height - gap * (serieCount - 1)) / serieCount
    } else if (axis === 'y') {
        serieSize = (width - gap * (serieCount - 1)) / serieCount
    }

    const range = data.map((d, i) => i * (serieSize + gap) + serieSize / 2)
    const domain = data.map(d => d.id)

    return scaleOrdinal(range).domain(domain)
}

export const computeBeeSwarmForces = ({
    axis,
    valueScale,
    ordinalScale,
    nodeSize,
    nodePadding,
}) => {
    const collisionRadius = (nodeSize + nodePadding / 2) / 2
    const collisionForce = forceCollide(collisionRadius)

    let xForce
    let yForce
    if (axis === 'x') {
        xForce = forceX(d => valueScale(d.value)).strength(1)
        yForce = forceY(d => ordinalScale(d.serieId))
    } else if (axis === 'y') {
        xForce = forceX(d => ordinalScale(d.serieId))
        yForce = forceY(d => valueScale(d.value)).strength(1)
    }

    return { x: xForce, y: yForce, collision: collisionForce }
}

export const computeBeeSwarmNodes = ({
    data,
    layout,
    scale,
    width,
    height,
    gap,
    nodeSize,
    nodePadding,
}) => {
    const axis = layout === 'horizontal' ? 'x' : 'y'
    const otherAxis = axis === 'x' ? 'y' : 'x'
    const valueScale = computeBeeSwarmValueScale({
        axis,
        scale,
        data,
        width,
        height,
    })
    const ordinalScale = computeBeeSwarmOrdinalScale({
        axis,
        data,
        gap,
        width,
        height,
    })
    const forces = computeBeeSwarmForces({
        axis,
        valueScale,
        ordinalScale,
        nodeSize,
        nodePadding,
    })
    const nodes = data.reduce((acc, serie) => {
        const serieNodes = serie.data.map((d, i) => ({
            ...d,
            id: `${serie.id}.${i}`,
            serieId: serie.id,
        }))
        const simulation = forceSimulation(serieNodes)
            .force('x', forces.x)
            .force('y', forces.y)
            .force('collide', forces.collision)
            .stop()

        for (var i = 0; i < 120; ++i) simulation.tick()

        return [...acc, ...simulation.nodes()]
    }, [])

    return {
        [`${axis}Scale`]: valueScale,
        [`${otherAxis}Scale`]: ordinalScale,
        nodes,
    }
}
