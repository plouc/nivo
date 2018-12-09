/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { uniq, uniqBy, sortBy, last, isDate } from 'lodash'
import { linearScale, LinearScaleInnerConfig, ScaleLinearWithType } from './linearScale'
import { pointScale, PointScaleInnerConfig, ScalePointWithType } from './pointScale'
import { timeScale, TimeScaleInnerConfig, ScaleTimeWithType } from './timeScale'
import { ScaleConfig } from './props'
import { createDateNormalizer } from './timeHelpers'

export const getOtherAxis = (axis: 'x' | 'y'): 'x' | 'y' => (axis === 'x' ? 'y' : 'x')

export const compareValues = (a: number | string, b: number | string): boolean => a === b
export const compareDateValues = (a: Date, b: Date): boolean => a.getTime() === b.getTime()
type Comparator = (a: number | string | Date, b: number | string | Date) => boolean

export const computeXYScalesForSeries = (rawSeries, xScaleSpec, yScaleSpec, width, height) => {
    const series = rawSeries.map(serie => ({
        ...serie,
        data: serie.data.map(d => ({ data: { ...d } })),
    }))

    const xy = generateSeriesXY(series, xScaleSpec, yScaleSpec)
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
                    xScale.type === 'linear' && xScale.stacked === true
                        ? d.data.xStacked === null
                            ? null
                            : xScale(d.data.xStacked)
                        : d.data.x === null
                            ? null
                            : (xScale as (d: number | string | Date) => number)(d.data.x),
                y:
                    yScale.type === 'linear' && yScale.stacked === true
                        ? d.data.yStacked === null
                            ? null
                            : yScale(d.data.yStacked)
                        : d.data.y === null
                            ? null
                            : (yScale as (d: number | string | Date) => number)(d.data.y),
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

export const computeScale = (
    spec: LinearScaleInnerConfig | PointScaleInnerConfig | TimeScaleInnerConfig,
    xy,
    width,
    height
):
    | ScaleLinearWithType<number, number>
    | ScalePointWithType<string>
    | ScaleTimeWithType<number, number> => {
    if (spec.type === 'linear') return linearScale(spec, xy, width, height)
    else if (spec.type === 'point') return pointScale(spec, xy, width, height)
    else if (spec.type === 'time') return timeScale(spec, xy, width, height)
}

export const generateSeriesXY = (series, xScaleSpec, yScaleSpec) => ({
    x: generateSeriesAxis(series, 'x', xScaleSpec),
    y: generateSeriesAxis(series, 'y', yScaleSpec),
})

/**
 * Normalize data according to scale type, (time => Date, linear => Number)
 * compute sorted unique values and min/max.
 */
export const generateSeriesAxis = (series, axis: 'x' | 'y', scaleConfig: ScaleConfig) => {
    if (scaleConfig.type === 'linear') {
        series.forEach(serie => {
            serie.data.forEach(d => {
                d.data[axis] = d.data[axis] === null ? null : parseFloat(d.data[axis])
            })
        })
    } else if (scaleConfig.type === 'time' && scaleConfig.format !== 'native') {
        const parseTime = createDateNormalizer(scaleConfig)
        series.forEach(serie => {
            serie.data.forEach(d => {
                d.data[axis] = d.data[axis] === null ? null : parseTime(d.data[axis])
            })
        })
    }

    let all = []
    series.forEach(serie => {
        serie.data.forEach(d => {
            all.push(d.data[axis])
        })
    })

    let min
    let max
    if (scaleConfig.type === 'linear') {
        all = uniq(all)
        all = sortBy(all, v => v)
        min = Math.min(...all)
        max = Math.max(...all)
    } else if (scaleConfig.type === 'time') {
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

export const stackAxis = (axis: 'x' | 'y', otherType, xy, series) => {
    const otherAxis = getOtherAxis(axis)

    let all = []
    xy[otherAxis].all.forEach(v => {
        const compare: Comparator = isDate(v) ? compareDateValues : compareValues
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

export const computeAxisSlices = (axis: 'x' | 'y', data) => {
    const otherAxis = getOtherAxis(axis)

    return data[otherAxis].all.map(v => {
        const slice = {
            id: v,
            [otherAxis]: data[`${otherAxis}Scale`](v),
            data: [],
        }
        const compare: Comparator = isDate(v) ? compareDateValues : compareValues
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
