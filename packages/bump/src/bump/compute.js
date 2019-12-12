/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scalePoint } from 'd3-scale'

export const computeSeries = ({ width, height, data, xPadding, xOuterPadding, yOuterPadding }) => {
    let xValues = new Set()
    data.forEach(serie => {
        serie.data.forEach(datum => {
            if (!xValues.has(datum.x)) {
                xValues.add(datum.x)
            }
        })
    })

    const xScale = scalePoint()
        .domain(Array.from(xValues))
        .range([0, width])
        .padding(xOuterPadding)

    const yScale = scalePoint()
        .domain(data.map((serie, i) => i + 1))
        .range([0, height])
        .padding(yOuterPadding)

    const linePointPadding = xScale.step() * Math.min(xPadding * 0.5, 0.5)

    const series = data.map(rawSerie => {
        const serie = {
            ...rawSerie,
            points: [],
            linePoints: [],
        }

        rawSerie.data.forEach((datum, i) => {
            const point = {
                id: `${rawSerie.id}.${datum.x}`,
                x: xScale(datum.x),
                y: yScale(datum.y),
                serie: rawSerie,
                data: datum,
            }
            serie.points.push(point)

            if (i === 0) {
                serie.linePoints.push([0, point.y])
            } else {
                serie.linePoints.push([point.x - linePointPadding, point.y])
            }
            serie.linePoints.push([point.x, point.y])
            if (i === rawSerie.data.length - 1) {
                serie.linePoints.push([width, point.y])
            } else {
                serie.linePoints.push([point.x + linePointPadding, point.y])
            }
        })

        return serie
    })

    return {
        series,
        xScale,
        yScale,
    }
}
