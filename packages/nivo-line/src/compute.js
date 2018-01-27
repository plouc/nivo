/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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
                    x: d.x,
                    y: d.y,
                })
            ),
        }
    })

/**
 * Generates x/y scales & lines for stacked line chart.
 *
 * @param {Array.<Object>} data
 *
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export const generateStackedLines = data =>
    data.reduce((acc, serie, serieIndex) => {
        const previousPoints = serieIndex === 0 ? null : acc[serieIndex - 1].data

        const { data: serieData } = serie

        return [
            ...acc,
            {
                ...serie,
                data: serieData.map((d, i) => {
                    if (!previousPoints) {
                        return {
                            ...d,
                            value: d.y,
                        }
                    }

                    const previousY = previousPoints[i].y

                    return {
                        ...d,
                        value: d.y,
                        y: previousY === null || d.y === null ? null : d.y + previousY,
                    }
                }),
            },
        ]
    }, [])
