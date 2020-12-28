import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import isDate from 'lodash/isDate'
import { createDateNormalizer } from './timeHelpers'
import { ScaleAxis, ScaleSpec, Series, ScaleValue, SerieAxis, OtherScaleAxis } from './types'
import { computeScale } from './computeScale'

export const getOtherAxis = (axis: ScaleAxis): OtherScaleAxis<typeof axis> =>
    axis === 'x' ? 'y' : 'x'

const a = getOtherAxis('x')
if (a === 'x') {
    console.log('crap')
}

export const compareValues = (a: string | number, b: string | number) => a === b
export const compareDateValues = (a: Date, b: Date) => a.getTime() === b.getTime()

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

    const xScale = computeScale({ ...xScaleSpec, axis: 'x' }, xy.x, width, 'x')
    const yScale = computeScale({ ...yScaleSpec, axis: 'y' }, xy.y, height, 'y')

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

export const generateSeriesXY = <XValue extends ScaleValue, YValue extends ScaleValue>(
    series: Series<XValue, YValue>,
    xScaleSpec: ScaleSpec,
    yScaleSpec: ScaleSpec
) => ({
    x: generateSeriesAxis<'x', XValue>(series, 'x', xScaleSpec),
    y: generateSeriesAxis<'y', YValue>(series, 'y', yScaleSpec),
})

/**
 * Normalize data according to scale type, (time => Date, linear => Number)
 * compute sorted unique values and min/max.
 */
export const generateSeriesAxis = <Axis extends ScaleAxis, Value extends ScaleValue>(
    series: SerieAxis<Axis, Value>,
    axis: Axis,
    scaleSpec: ScaleSpec,
    {
        getValue = d => d.data[axis],
        setValue = (d, v) => {
            d.data[axis] = v
        },
    }: {
        getValue?: (d: { data: Record<Axis, Value | null> }) => Value | null
        setValue?: (d: { data: Record<Axis, Value | null> }, v: Value) => void
    } = {}
) => {
    if (scaleSpec.type === 'linear') {
        series.forEach(serie => {
            serie.data.forEach(d => {
                const value = getValue(d)
                if (value !== null) {
                    setValue(d, parseFloat(value))
                }
            })
        })
    } else if (scaleSpec.type === 'time' && scaleSpec.format !== 'native') {
        // `native` means we already have Date instances,
        // otherwise we have to convert the values to Date.
        const parseTime = createDateNormalizer(scaleSpec)
        series.forEach(serie => {
            serie.data.forEach(d => {
                const value = getValue(d)
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

export const stackAxis = (axis: ScaleAxis, otherType: ScaleAxis, xy: any, series: any) => {
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

export const stackX = (xy, otherType: ScaleAxis, series) => stackAxis('x', xy, otherType, series)
export const stackY = (xy, otherType: ScaleAxis, series) => stackAxis('y', xy, otherType, series)

export const computeAxisSlices = (axis: ScaleAxis, data) => {
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
