/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { uniq, uniqBy, sortBy, last, isDate } from 'lodash'
import { linearScale } from './linearScale'
import { logScale } from './logScale'
import { pointScale } from './pointScale'
import { timeScale } from './timeScale'
import { createDateNormalizer } from './timeHelpers'
import { ScaleOptions } from './index'

export const getOtherAxis = (axis: 'x' | 'y') => (axis === 'x' ? 'y' : 'x')

export const compareValues = (a: any, b: any) => a === b
export const compareDateValues = (a: Date, b: Date) => a.getTime() === b.getTime()

export const computeXYScalesForSeries = (
    _series: any[],
    xScaleSpec: ScaleOptions,
    yScaleSpec: ScaleOptions,
    width: number,
    height: number
) => {
    const series = _series.map(serie => ({
        ...serie,
        data: serie.data.map((d: any) => ({ data: { ...d } })),
    }))

    const xy: any = generateSeriesXY(series, xScaleSpec, yScaleSpec)

    // only linear scales support stacking
    if (xScaleSpec.type === 'linear' && xScaleSpec.stacked === true) {
        stackX(xy, series)
    }
    if (yScaleSpec.type === 'linear' && yScaleSpec.stacked === true) {
        stackY(xy, series)
    }

    const xScale = computeScale({ ...xScaleSpec, axis: 'x' }, xy, width, height)
    const yScale = computeScale({ ...yScaleSpec, axis: 'y' }, xy, width, height)

    series.forEach(serie => {
        serie.data.forEach((d: any) => {
            d.position = {
                x:
                    xScale.type === 'linear' && xScale.stacked
                        ? d.data.xStacked === null
                            ? null
                            : xScale(d.data.xStacked)
                        : d.data.x === null
                        ? null
                        : xScale(d.data.x),
                y:
                    yScale.type === 'linear' && yScale.stacked
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

export const computeScale = (spec: ScaleOptions, xy: any, width: number, height: number) => {
    if (spec.type === 'linear') {
        return linearScale(spec, xy, width, height)
    } else if (spec.type === 'point') {
        return pointScale(spec, xy, width, height)
    } else if (spec.type === 'time') {
        return timeScale(spec, xy, width, height)
    } else if (spec.type === 'log') {
        return logScale(spec, xy, width, height)
    } else {
        throw new Error(`Invalid scale type`)
    }
}

export const generateSeriesXY = (
    series: any,
    xScaleSpec: ScaleOptions,
    yScaleSpec: ScaleOptions
) => ({
    x: generateSeriesAxis(series, 'x', xScaleSpec),
    y: generateSeriesAxis(series, 'y', yScaleSpec),
})

/**
 * Normalize data according to scale type, (time => Date, linear => Number)
 * compute sorted unique values and min/max.
 */
export const generateSeriesAxis = (
    series: any[],
    axis: 'x' | 'y',
    scaleSpec: ScaleOptions,
    {
        getValue = (d: any) => d.data[axis],
        setValue = (d: any, v: any) => {
            d.data[axis] = v
        },
    } = {}
) => {
    if (scaleSpec.type === 'linear') {
        series.forEach(serie => {
            serie.data.forEach((d: any) => {
                setValue(d, getValue(d) === null ? null : parseFloat(getValue(d)))
            })
        })
    } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
        const parseTime = createDateNormalizer(scaleSpec)
        series.forEach((serie: any) => {
            serie.data.forEach((d: any) => {
                setValue(d, getValue(d) === null ? null : parseTime(getValue(d)))
            })
        })
    }

    let all: any[] = []
    series.forEach(serie => {
        serie.data.forEach((d: any) => {
            all.push(getValue(d))
        })
    })

    let min
    let max
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

export const stackAxis = (axis: 'x' | 'y', xy: any, series: any[]) => {
    const otherAxis = getOtherAxis(axis)

    let all: any = []
    xy[otherAxis].all.forEach((v: number | string | Date) => {
        const compare = isDate(v) ? compareDateValues : compareValues
        const stack: any[] = []
        series.forEach(serie => {
            const datum = serie.data.find((d: any) => compare(d.data[otherAxis], v as any))
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
    all = all.filter((v: any) => v !== null)

    xy[axis].minStacked = Math.min(...all)
    xy[axis].maxStacked = Math.max(...all)
}

export const stackX = (xy: any, series: any[]) => stackAxis('x', xy, series)
export const stackY = (xy: any, series: any[]) => stackAxis('y', xy, series)

export const computeAxisSlices = (
    axis: 'x' | 'y',
    data: {
        series: Array<{
            data: any[]
        }>
        xScale?: any
        x?: {
            all: any[]
        }
        yScale?: any
        y?: {
            all: any[]
        }
    }
) => {
    const otherAxis = getOtherAxis(axis)

    if (data[otherAxis] === undefined) {
        throw new Error(`No data defined for axis: ${otherAxis}`)
    }

    return data[otherAxis]!.all.map(v => {
        const slice = {
            id: v,
            [otherAxis]: data[`${otherAxis}Scale` as keyof typeof data](v),
            data: [] as any[],
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

export const computeXSlices = (data: any) => computeAxisSlices('x', data)
export const computeYSlices = (data: any) => computeAxisSlices('y', data)
