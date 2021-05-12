import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import isDate from 'lodash/isDate'
import { createDateNormalizer } from './timeHelpers'
import { ScaleAxis, ScaleSpec, Series, ScaleValue, SerieAxis } from './types'
import { computeScale } from './computeScale'

type XY = ReturnType<typeof generateSeriesXY>

type StackedXY = {
    [K in keyof XY]: XY[K] & {
        maxStacked: number
        minStacked: number
    }
}

type InputXYSeries = Record<'x' | 'y', number | string | Date | null>

interface Data {
    x: number
    xStacked: number | null
    y: number
    yStacked: number | null

    // Allow template literal `xStacked/yStacked` to be set on line 213
    [key: string]: number | null
}

type XYSeries = InputXYSeries & {
    data: Data[]
}

interface ComputedXYSeries extends InputXYSeries {
    data: Array<{
        data: Data
        position: {
            x: ScaleValue | null
            y: ScaleValue | null
        }
    }>
}

type Compare = <T>(a: T, b: T) => boolean

export const getOtherAxis = (axis: ScaleAxis): ScaleAxis => (axis === 'x' ? 'y' : 'x')

export const compareValues = (a: string | number, b: string | number) => a === b
export const compareDateValues = (a: Date, b: Date) => a.getTime() === b.getTime()

export const computeXYScalesForSeries = (
    _series: XYSeries[],
    xScaleSpec: ScaleSpec,
    yScaleSpec: ScaleSpec,
    width: number,
    height: number
) => {
    const series = _series.map(serie => ({
        ...serie,
        data: serie.data.map(d => ({ data: { ...d } })),
    })) as ComputedXYSeries[]

    const xy = generateSeriesXY(series, xScaleSpec, yScaleSpec)
    if ('stacked' in xScaleSpec && xScaleSpec.stacked === true) {
        stackX(xy as StackedXY, series)
    }
    if ('stacked' in yScaleSpec && yScaleSpec.stacked === true) {
        stackY(xy as StackedXY, series)
    }

    const xScale = computeScale(xScaleSpec, xy.x, width, 'x')
    const yScale = computeScale(yScaleSpec, xy.y, height, 'y')

    series.forEach(serie => {
        serie.data.forEach(d => {
            d.position = {
                x:
                    'stacked' in xScale && xScale.stacked === true
                        ? d.data.xStacked === null
                            ? null
                            : xScale(d.data.xStacked)
                        : d.data.x === null
                        ? null
                        : xScale(d.data.x) ?? null,
                y:
                    'stacked' in yScale && yScale.stacked === true
                        ? d.data.yStacked === null
                            ? null
                            : yScale(d.data.yStacked)
                        : d.data.y === null
                        ? null
                        : yScale(d.data.y) ?? null,
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

                if (value) {
                    setValue(d, (parseFloat(String(value)) as unknown) as Value)
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

                if (value) {
                    setValue(d, (parseTime(value as Date) as unknown) as Value)
                }
            })
        })
    }

    const values: unknown[] = []

    series.forEach(serie => {
        serie.data.forEach(d => {
            values.push(getValue(d))
        })
    })

    switch (scaleSpec.type) {
        case 'linear': {
            const all = sortBy(uniq(values as number[]), v => v)

            return { all, min: Math.min(...all), max: Math.max(...all) }
        }
        case 'time': {
            const all = uniqBy(values as Date[], v => v.getTime())
                .slice(0)
                .sort((a, b) => b.getTime() - a.getTime())
                .reverse()

            return { all, min: all[0], max: last(all) }
        }
        default: {
            const all = uniq(values)

            return { all, min: all[0], max: last(all) }
        }
    }
}

export const stackAxis = (axis: ScaleAxis, xy: StackedXY, series: ComputedXYSeries[]) => {
    const otherAxis = getOtherAxis(axis)
    const all: number[] = []

    xy[otherAxis].all.forEach(v => {
        const compare = (isDate(v) ? compareDateValues : compareValues) as Compare
        const stack: Array<number | null> = []

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

            if (stackValue !== null) {
                all.push(stackValue)
            }
        })
    })

    xy[axis].minStacked = Math.min(...all)
    xy[axis].maxStacked = Math.max(...all)
}

const stackX = (xy: StackedXY, series: ComputedXYSeries[]) => stackAxis('x', xy, series)
const stackY = (xy: StackedXY, series: ComputedXYSeries[]) => stackAxis('y', xy, series)
