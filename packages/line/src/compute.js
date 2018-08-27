/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { linearScale, pointScale, timeScale } from '@nivo/scales'

export const computeScale = (scaleSpec, dimensions, data) => {
    if (scaleSpec.type === 'linear') {
        return linearScale(scaleSpec, dimensions, data)
    } else if (scaleSpec.type === 'point') {
        return pointScale(scaleSpec, dimensions, data)
    } else if (scaleSpec.type === 'time') {
        return timeScale(scaleSpec, dimensions, data)
    }
}

export const computeScales = ({ data, width, height, xScale, yScale }) => ({
    xScale: computeScale(
        {
            ...xScale,
            axis: 'x',
        },
        {
            width,
            height,
        },
        data
    ),
    yScale: computeScale(
        {
            ...yScale,
            axis: 'y',
        },
        {
            width,
            height,
        },
        data
    ),
})

export const generateLines = (enhancedData, xScale, yScale, getColor) => {
    if (yScale.stacked === true) {
        return enhancedData.y.stack.series.map(serie => ({
            ...serie,
            color: getColor(serie),
            data: serie.data.map(datum => ({
                x: datum.x !== null ? xScale(datum.x) : null,
                y: datum.y !== null ? yScale(datum.y) : null,
                data: datum,
            })),
        }))
    }

    return enhancedData.series.map(serie => ({
        ...serie,
        color: getColor(serie),
        data: serie.data.map(datum => ({
            x: datum.x !== null ? xScale(datum.x) : null,
            y: datum.y !== null ? yScale(datum.y) : null,
            data: datum,
        })),
    }))
}
