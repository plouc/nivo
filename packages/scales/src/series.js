/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'

export const prepareSeries = series => {
    let allX = []
    let allY = []

    let xType
    let yType

    series.forEach(serie => {
        serie.data.forEach(({ x, y }) => {
            if (xType === undefined && typeof x === 'number') {
                xType = 'number'
            }
            allX.push(x)

            if (yType === undefined && typeof y === 'number') {
                yType = 'number'
            }
            allY.push(y)
        })
    })

    allX = uniq(allX)
    allY = uniq(allY)

    const sortedX = xType === 'number' ? sortBy(allX, v => v) : allX
    const sortedY = yType === 'number' ? sortBy(allY, v => v) : allY

    const stackX = {
        buckets: sortedY.map(y => ({ y, x: [], stack: [] })),
        series: series.reduce((agg, serie) => [...agg, { ...serie, data: [] }], []),
    }
    const stackY = {
        buckets: sortedX.map(x => ({ x, y: [], stack: [] })),
        series: series.reduce((agg, serie) => [...agg, { ...serie, data: [] }], []),
    }

    const allStackX = []
    const allStackY = []

    if (xType === 'number' || yType === 'number') {
        series.forEach(serie => {
            if (xType === 'number') {
                stackX.buckets.forEach(bucket => {
                    const datum = serie.data.find(({ y }) => y === bucket.y)
                    let value = null
                    let stackValue = null
                    if (datum !== undefined) {
                        value = datum.x
                        if (value !== null) {
                            const head = last(bucket.stack)
                            if (head === undefined) {
                                stackValue = value
                            } else if (head !== null) {
                                stackValue = head + value
                            }
                        }
                    }
                    bucket.x.push(value)
                    bucket.stack.push(stackValue)
                    allStackX.push(stackValue)
                    stackX.series.find(({ id }) => id === serie.id).data.push({
                        x: stackValue,
                        y: bucket.y,
                    })
                })
            }

            if (yType === 'number') {
                stackY.buckets.forEach(bucket => {
                    const datum = serie.data.find(({ x }) => x === bucket.x)
                    let value = null
                    let stackValue = null
                    if (datum !== undefined) {
                        value = datum.y
                        if (value !== null) {
                            const head = last(bucket.stack)
                            if (head === undefined) {
                                stackValue = value
                            } else if (head !== null) {
                                stackValue = head + value
                            }
                        }
                    }
                    bucket.y.push(value)
                    bucket.stack.push(stackValue)
                    allStackY.push(stackValue)
                    stackY.series.find(({ id }) => id === serie.id).data.push({
                        x: bucket.x,
                        y: stackValue,
                    })
                })
            }
        })
    }

    const result = {
        series,
        x: {
            type: xType,
            all: allX,
            sorted: sortedX,
        },
        y: {
            type: yType,
            all: allY,
            sorted: sortedY,
        },
    }

    if (xType === 'number') {
        result.x.min = Math.min(...allX)
        result.x.max = Math.max(...allX)
        result.x.stack = {
            ...stackX,
            min: Math.min(...allStackX),
            max: Math.max(...allStackX),
        }
    }

    if (yType === 'number') {
        result.y.min = Math.min(...allY)
        result.y.max = Math.max(...allY)
        result.y.stack = {
            ...stackY,
            min: Math.min(...allStackY),
            max: Math.max(...allStackY),
        }
    }

    return result
}
