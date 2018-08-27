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
import { timeParse } from 'd3-time-format'
import { linearScale } from './linearScale'
import { pointScale } from './pointScale'
import { timeScale } from './timeScale'

export const computeXYScalesForSeries = (series, xScaleSpec, yScaleSpec, width, height) => {
    let xy = generateSeriesXY(series, xScaleSpec, yScaleSpec)

    if (xScaleSpec.stacked === true) xy = stackX(yScaleSpec.type, xy, xy.series)
    if (yScaleSpec.stacked === true) xy = stackY(xScaleSpec.type, xy, xy.series)

    return {
        ...xy,
        x: {
            ...xy.x,
            scale: computeScale({ ...xScaleSpec, axis: 'x' }, xy, width, height),
        },
        y: {
            ...xy.y,
            scale: computeScale({ ...yScaleSpec, axis: 'y' }, xy, width, height),
        },
    }
}

export const computeScale = (spec, xy, width, height) => {
    if (spec.type === 'linear') return linearScale(spec, xy, width, height)
    else if (spec.type === 'point') return pointScale(spec, xy, width, height)
    else if (spec.type === 'time') return timeScale(spec, xy, width, height)
}

export const generateSeriesXY = (_series, xScaleSpec, yScaleSpec) => {
    let series = _series

    let allX = []
    let allY = []

    series.forEach(serie => {
        serie.data.forEach(({ x, y }) => {
            allX.push(x)
            allY.push(y)
        })
    })

    allX = uniq(allX)
    allY = uniq(allY)

    let sortedX = allX
    let minX
    let maxX
    if (xScaleSpec.type === 'linear') {
        sortedX = sortBy(allX, v => v)
        minX = Math.min(...allX)
        maxX = Math.max(...allX)
    } else if (xScaleSpec.type === 'time') {
        if (xScaleSpec.format !== 'native') {
            const parseXTime = timeParse(xScaleSpec.format)
            allX = allX.map(v => parseXTime(v))
            series = series.map(serie => ({
                ...serie,
                data: serie.data.map(d => ({
                    ...d,
                    x: parseXTime(d.x),
                })),
            }))
        }
        sortedX = allX
            .slice(0)
            .sort((a, b) => b - a)
            .reverse()
        minX = sortedX[0]
        maxX = last(sortedX)
    }

    let sortedY = allY
    let minY
    let maxY
    if (yScaleSpec.type === 'linear') {
        sortedY = sortBy(allY, v => v)
        minY = Math.min(...allY)
        maxY = Math.max(...allY)
    } else if (yScaleSpec.type === 'time') {
        if (yScaleSpec.format !== 'native') {
            const parseYTime = timeParse(yScaleSpec.format)
            allY = allY.map(v => parseYTime(v))
            series = series.map(serie => ({
                ...serie,
                data: serie.data.map(d => ({
                    ...d,
                    y: parseYTime(d.y),
                })),
            }))
        }
        sortedY = allY
            .slice(0)
            .sort((a, b) => b - a)
            .reverse()
        minY = sortedY[0]
        maxY = last(sortedY)
    }

    return {
        series,
        x: {
            all: allX,
            sorted: sortedX,
            min: minX,
            max: maxX,
        },
        y: {
            all: allY,
            sorted: sortedY,
            min: minY,
            max: maxY,
        },
    }
}

export const stackAxis = (axis, otherType, xy, _series) => {
    const otherAxis = axis === 'x' ? 'y' : 'x'

    const buckets = xy[otherAxis].sorted.map(v => ({
        [otherAxis]: v,
        [axis]: [],
        stack: [],
    }))
    const series = _series.reduce((agg, serie) => [...agg, { ...serie, data: [] }], [])
    const all = []

    _series.forEach(serie => {
        buckets.forEach(bucket => {
            let predicate
            if (otherType === 'time') {
                predicate = d => d[otherAxis].getTime() === bucket[otherAxis].getTime()
            } else {
                predicate = d => d[otherAxis] === bucket[otherAxis]
            }
            const datum = serie.data.find(predicate)
            let value = null
            let stackValue = null
            if (datum !== undefined) {
                value = datum[axis]
                if (value !== null) {
                    const head = last(bucket.stack)
                    if (head === undefined) {
                        stackValue = value
                    } else if (head !== null) {
                        stackValue = head + value
                    }
                }
            }
            bucket[axis].push(value)
            bucket.stack.push(stackValue)
            all.push(stackValue)
            series.find(({ id }) => id === serie.id).data.push({
                [axis]: stackValue,
                [otherAxis]: bucket[otherAxis],
            })
        })
    })

    return {
        ...xy,
        [axis]: {
            ...xy[axis],
            stacked: {
                buckets,
                series,
                min: Math.min(...all),
                max: Math.max(...all),
            },
        },
    }
}

export const stackX = (xy, otherType, series) => stackAxis('x', xy, otherType, series)
export const stackY = (xy, otherType, series) => stackAxis('y', xy, otherType, series)
