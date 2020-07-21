/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scalePoint, scaleLinear } from 'd3-scale'

export const computeSeries = ({ data, width, height, align, spacing, xPadding }) => {
    const slices = new Map()

    let maxSum = null
    let maxValues = null

    data.forEach(serie => {
        serie.data.forEach(datum => {
            if (!slices.has(datum.x)) {
                slices.set(datum.x, {
                    id: datum.x,
                    total: 0,
                    values: new Map(),
                })
            }

            const slice = slices.get(datum.x)

            const total = slice.total + datum.y
            slice.total = total

            slice.values.set(serie.id, {
                serieId: serie.id,
                value: datum.y,
            })

            if (total === null || total > maxSum) {
                maxSum = total
                maxValues = slice.values.size
            }
        })
    })

    const xScale = scalePoint().domain(Array.from(slices.keys())).range([0, width])

    const heightScale = scaleLinear()
        .domain([0, maxSum])
        .range([0, height - maxValues * spacing])

    slices.forEach((slice, x) => {
        slice.x = xScale(x)
        const sliceHeight = heightScale(slice.total) + slice.values.size * spacing

        let offset = 0
        if (align === 'middle') {
            offset = (height - sliceHeight) / 2
        } else if (align === 'end') {
            offset = height - sliceHeight
        }

        Array.from(slice.values.values())
            .sort((a, b) => b.value - a.value)
            .forEach((value, position, all) => {
                const previousValues = all.filter((i, pos) => pos < position)
                const beforeValue = previousValues.reduce((t, v) => t + v.value, 0)

                const sliceValue = slice.values.get(value.serieId)
                sliceValue.position = position
                sliceValue.height = heightScale(value.value)
                sliceValue.beforeHeight =
                    heightScale(beforeValue) + offset + spacing * (previousValues.length + 0.5)
            })
    })

    const areaPointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5)

    const series = data.map(serie => {
        const serieCopy = { ...serie }
        serieCopy.points = []
        serieCopy.areaPoints = []
        serie.data.forEach((datum, i) => {
            const slice = slices.get(datum.x)
            const position = slice.values.get(serie.id)

            const x = slice.x
            const { beforeHeight, height } = position
            const y = beforeHeight + height / 2
            const y0 = beforeHeight
            const y1 = beforeHeight + height

            serieCopy.points.push({
                x,
                y,
                height,
                data: { ...datum },
            })
            if (i > 0) {
                serieCopy.areaPoints.push({ x: x - areaPointPadding, y0, y1 })
            }
            serieCopy.areaPoints.push({ x, y0, y1 })
            if (i < serie.data.length - 1) {
                serieCopy.areaPoints.push({ x: x + areaPointPadding, y0, y1 })
            }
        })

        return serieCopy
    })

    return {
        xScale,
        heightScale,
        series,
    }
}
