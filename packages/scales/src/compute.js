/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import isDate from 'lodash/isDate'
import { linearScale } from './linearScale'
import { logScale } from './logScale'
import { symlogScale } from './symlogScale'
import { pointScale } from './pointScale'
import { timeScale } from './timeScale'
import { createDateNormalizer } from './timeHelpers'

export const getOtherAxis = axis => (axis === 'x' ? 'y' : 'x')

export const compareValues = (a, b) => a === b
export const compareDateValues = (a, b) => a.getTime() === b.getTime()

export const computeXYScalesForSeries = (_series, xScaleSpec, yScaleSpec, width, height) => {
    const series = _series.map(serie => ({
        ...serie,
        data: serie.data.map(d => ({ data: { ...d } })),
    }))

    let xy = generateSeriesXY(series, xScaleSpec, yScaleSpec)
    if (xScaleSpec.stacked === true) {
        stackX(yScaleSpec.type, xy, series)
    }
    if (yScaleSpec.stacked === true) {
        stackY(xScaleSpec.type, xy, series)
    }

    const xScale = computeScale({ ...xScaleSpec, axis: 'x' }, xy, width, height)
    const yScale = computeScale({ ...yScaleSpec, axis: 'y' }, xy, width, height)

    series.forEach(serie => {
        serie.data.forEach(d => {
            d.position = {
                x:
                    xScale.stacked === true
                        ? d.data.xStacked === null
                            ? null
                            : xScale(d.data.xStacked)
                        : d.data.x === null
                        ? null
                        : xScale(d.data.x),
                y:
                    yScale.stacked === true
                        ? d.data.yStacked === null
                            ? null
                            : yScale(d.data.yStacked)
                        : d.data.y === null
                        ? null
                        : yScale(d.data.y),
            }
        })
    })

    return {
        ...xy,
        series,
        xScale,
        yScale,
    }
}

export const computeScale = (spec, xy, width, height) => {
    if (spec.type === 'linear') return linearScale(spec, xy, width, height)
    else if (spec.type === 'point') return pointScale(spec, xy, width, height)
    else if (spec.type === 'time') return timeScale(spec, xy, width, height)
    else if (spec.type === 'log') return logScale(spec, xy, width, height)
    else if (spec.type === 'symlog') return symlogScale(spec, xy, width, height)
}

export const generateSeriesXY = (series, xScaleSpec, yScaleSpec) => ({
    x: generateSeriesAxis(series, 'x', xScaleSpec),
    y: generateSeriesAxis(series, 'y', yScaleSpec),
})

/**
 * Normalize data according to scale type, (time => Date, linear => Number)
 * compute sorted unique values and min/max.
 */
export const generateSeriesAxis = (
    series,
    axis,
    scaleSpec,
    {
        getValue = d => d.data[axis],
        setValue = (d, v) => {
            d.data[axis] = v
        },
    } = {}
) => {
    if (scaleSpec.type === 'linear') {
        series.forEach(serie => {
            serie.data.forEach(d => {
                setValue(d, getValue(d) === null ? null : parseFloat(getValue(d)))
            })
        })
    } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
        const parseTime = createDateNormalizer(scaleSpec)
        series.forEach(serie => {
            serie.data.forEach(d => {
                setValue(d, getValue(d) === null ? null : parseTime(getValue(d)))
            })
        })
    }

    let all = []
    series.forEach(serie => {
        serie.data.forEach(d => {
            all.push(getValue(d))
        })
    })

    let min, max
    if (scaleSpec.type === 'linear') {
        all = uniq(all)
        all = sortBy(all, v => v)
        min = Math.min(...all)
        max = Math.max(...all)
    } else if (scaleSpec.type === 'time') {
        all = uniqBy(all, v => v.getTime())
        all = all
            .slice(0)
            .sort((a, b) => b - a)
            .reverse()
        min = all[0]
        max = last(all)
    } else {
        all = uniq(all)
        min = all[0]
        max = last(all)
    }

    return { all, min, max }
}

export const stackAxis = (axis, otherType, xy, series) => {
    const otherAxis = getOtherAxis(axis)

    let all = []
    xy[otherAxis].all.forEach(v => {
        const compare = isDate(v) ? compareDateValues : compareValues
        const stack = []
        series.forEach(serie => {
            const datum = serie.data.find(d => compare(d.data[otherAxis], v))
            let value = null
            let stackValue = null
            if (datum !== undefined) {
                value = datum.data[axis]
                if (value !== null) {
                    const head = last(stack)
                    if (head === undefined) {
                        stackValue = value
                    } else if (head !== null) {
                        stackValue = head + value
                    }
                }
                datum.data[`${axis}Stacked`] = stackValue
            }
            stack.push(stackValue)
            all.push(stackValue)
        })
    })
    all = all.filter(v => v !== null)

    xy[axis].minStacked = Math.min(...all)
    xy[axis].maxStacked = Math.max(...all)
}

export const stackX = (xy, otherType, series) => stackAxis('x', xy, otherType, series)
export const stackY = (xy, otherType, series) => stackAxis('y', xy, otherType, series)

export const computeAxisSlices = (axis, data) => {
    const otherAxis = getOtherAxis(axis)

    return data[otherAxis].all.map(v => {
        const slice = {
            id: v,
            [otherAxis]: data[`${otherAxis}Scale`](v),
            data: [],
        }
        const compare = isDate(v) ? compareDateValues : compareValues
        data.series.forEach(serie => {
            const datum = serie.data.find(d => compare(d.data[otherAxis], v))
            if (datum !== undefined) {
                slice.data.push({
                    ...datum,
                    serie,
                })
            }
        })
        slice.data.reverse()

        return slice
    })
}

export const computeXSlices = data => computeAxisSlices('x', data)
export const computeYSlices = data => computeAxisSlices('y', data)
