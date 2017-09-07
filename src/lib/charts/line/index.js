/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { range, min, max, maxBy, sumBy, uniq } from 'lodash'
import { scalePoint, scaleLinear } from 'd3-scale'

/**
 * Generates X scale.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @returns {Function}
 */
export const getXScale = (data, width) => {
    const xLengths = uniq(data.map(({ data }) => data.length))
    if (xLengths.length > 1) {
        throw new Error(
            [
                `Found inconsitent data for x,`,
                `expecting all series to have same length`,
                `but found: ${xLengths.join(', ')}`,
            ].join(' ')
        )
    }

    return scalePoint()
        .range([0, width])
        .domain(data[0].data.map(({ x }) => x))
}

/**
 * Generates Y scale for line chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         height
 * @param {number|string}  minValue
 * @param {number|string}  maxValue
 * @returns {Function}
 */
export const getYScale = (data, height, minValue, maxValue) => {
    let minY = minValue
    if (minValue === 'auto') {
        minY = min(data.map(serie => min(serie.data.map(d => d.y))))
    }

    let maxY = maxValue
    if (maxValue === 'auto') {
        maxY = max(data.map(serie => max(serie.data.map(d => d.y))))
    }

    return scaleLinear()
        .rangeRound([height, 0])
        .domain([minY, maxY])
}

/**
 * Generates Y scale for stacked line chart.
 *
 * @param {Array.<Object>} data
 * @param {Object}         xScale
 * @param {number}         height
 * @param {number|string}  minValue
 * @param {number|string}  maxValue
 * @returns {Function}
 */
export const getStackedYScale = (data, xScale, height, minValue, maxValue) => {
    let minY = minValue
    if (minValue === 'auto') {
        minY = min(data.map(serie => min(serie.data.map(d => d.y))))
    }

    let maxY = maxValue
    if (maxValue === 'auto') {
        maxY = max(range(xScale.domain().length).map(i => sumBy(data, serie => serie.data[i].y)))
    }

    return scaleLinear()
        .rangeRound([height, 0])
        .domain([minY, maxY])
}

/**
 * Generates stacked x/y scales.
 *
 * @param {Array}         data
 * @param {number}        width
 * @param {number}        height
 * @param {number|string} minY
 * @param {number|string} maxY
 * @return {{ xScale: Function, yScale: Function }}
 */
export const getStackedScales = ({ data, width, height, minY, maxY }) => {
    const xScale = getXScale(data, width)
    const yScale = getStackedYScale(data, xScale, height, minY, maxY)

    return { xScale, yScale }
}

/**
 * Generates non stacked x/ scales
 *
 * @param {Array}         data
 * @param {number}        width
 * @param {number}        height
 * @param {number|string} minY
 * @param {number|string} maxY
 * @return {{ xScale: Function, yScale: Function }}
 */
export const getScales = ({ data, width, height, minY, maxY }) => {
    const xScale = getXScale(data, width)
    const yScale = getYScale(data, height, minY, maxY)

    return { xScale, yScale }
}

/**
 * Generates x/y scales & lines for line chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       xScale
 * @param {Function}       yScale
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export const generateLines = (data, xScale, yScale, color) =>
    data.map(serie => {
        const { id, data: serieData } = serie

        return {
            id,
            color: color(serie),
            data: serie,
            points: serieData.map(d =>
                Object.assign({}, d, {
                    value: d.y,
                    x: xScale(d.x),
                    y: yScale(d.y),
                })
            ),
        }
    })

/**
 * Generates x/y scales & lines for stacked line chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       xScale
 * @param {Function}       yScale
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export const generateStackedLines = (data, xScale, yScale, color) =>
    data.reduce((acc, serie, serieIndex) => {
        const previousPoints = serieIndex === 0 ? null : acc[serieIndex - 1].points

        const { id, data: serieData } = serie

        return [
            ...acc,
            {
                id,
                color: color(serie),
                data: serie,
                points: serieData
                    .map((d, i) => {
                        if (!previousPoints) {
                            return Object.assign({}, d, {
                                value: d.y,
                                x: d.x,
                                y: d.y,
                            })
                        }

                        return Object.assign({}, d, {
                            value: d.y,
                            x: d.x,
                            y: d.y + previousPoints[i].accY,
                        })
                    })
                    .map(d => ({
                        key: d.x,
                        value: d.value,
                        accY: d.y,
                        x: xScale(d.x),
                        y: yScale(d.y),
                    })),
            },
        ]
    }, [])
