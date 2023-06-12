import uniq from 'lodash/uniq'
import { min as _min, max as _max } from 'lodash'
import uniqBy from 'lodash/uniqBy'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import isDate from 'lodash/isDate'
import { createDateNormalizer } from './timeHelpers'
import { ScaleAxis, ScaleSpec, ScaleValue, SerieAxis, ComputedSerieAxis } from './types'
import { createLinearScale } from './linearScale'
import { createPointScale } from './pointScale'
import { createBandScale } from './bandScale'
import { createTimeScale } from './timeScale'
import { createLogScale } from './logScale'
import { createSymlogScale } from './symlogScale'

type XY = ReturnType<typeof generateSeriesXY>

type StackedXY = {
    [K in keyof XY]: XY[K] & {
        maxStacked: number
        minStacked: number
    }
}

interface SerieDatum {
    x: number | string | Date
    // only numbers can be stacked
    xStacked?: number | null
    y: number | string | Date
    // only numbers can be stacked
    yStacked?: number | null
}

type Serie<S = never, D extends SerieDatum = SerieDatum> = S & {
    data: D[]
}

type NestedSerie<S = never, D extends SerieDatum = SerieDatum> = S & {
    data: {
        data: D
    }[]
}

export type ComputedSerie<S = never, D extends SerieDatum = SerieDatum> = S & {
    data: {
        data: D
        position: {
            x: number | null
            y: number | null
        }
    }[]
}

type Compare = <T>(a: T, b: T) => boolean

export const getOtherAxis = (axis: ScaleAxis): ScaleAxis => (axis === 'x' ? 'y' : 'x')

export const compareValues = (a: string | number, b: string | number) => a === b
export const compareDateValues = (a: Date, b: Date) => a.getTime() === b.getTime()

export function computeScale<Input extends ScaleValue>(
    spec: ScaleSpec,
    data: ComputedSerieAxis<any>,
    size: number,
    axis: ScaleAxis
) {
    switch (spec.type) {
        case 'linear':
            return createLinearScale(spec, data, size, axis)
        case 'point':
            return createPointScale<Input>(spec, data, size)
        case 'band':
            return createBandScale<Input>(spec, data, size, axis)
        case 'time':
            return createTimeScale(spec, data, size)
        case 'log':
            return createLogScale(spec, data, size, axis)
        case 'symlog':
            return createSymlogScale(spec, data, size, axis)
        default:
            throw new Error('invalid scale spec')
    }
}

/**
 * Convert serie data to have the original data stored in a nested prop.
 *
 * We do this in order to avoid conflicts between raw & computed properties.
 * <- { data: { x: 1, y: 3 }[] }
 * -> { data: { data: { x: 1, y: 3 } }[] }
 */
const nestSerieData = <S = never, D extends SerieDatum = SerieDatum>(
    serie: Serie<S, D>
): NestedSerie<S, D> => ({
    ...serie,
    data: serie.data.map(d => ({ data: { ...d } })),
})

const getDatumAxisPosition = <D extends SerieDatum = SerieDatum>(
    datum: { data: D },
    axis: ScaleAxis,
    scale: any
): number | null => {
    if ('stacked' in scale && scale.stacked) {
        const stackedValue = datum.data[axis === 'x' ? 'xStacked' : 'yStacked']
        if (stackedValue === null || stackedValue === undefined) {
            return null
        }

        return scale(stackedValue)
    }

    return scale(datum.data[axis]) ?? null
}

/**
 * Compute x/y d3 scales from an array of data series, and scale specifications.
 *
 * We use generics as it's not uncommon to have extra properties such as an id
 * added to the series, or extra props on data, in such case, you should override
 * the default types.
 */
export const computeXYScalesForSeries = <S = never, D extends SerieDatum = SerieDatum>(
    series: Serie<S, D>[],
    xScaleSpec: ScaleSpec,
    yScaleSpec: ScaleSpec,
    width: number,
    height: number
) => {
    // first nest series to avoid property conflicts
    const nestedSeries = series.map(serie => nestSerieData<S, D>(serie))

    // then compute data for each axis: all, min, max values
    const xy = generateSeriesXY<S, D>(nestedSeries, xScaleSpec, yScaleSpec)

    // stack x values depending on xScale
    if ('stacked' in xScaleSpec && xScaleSpec.stacked === true) {
        stackX<S, D>(xy as StackedXY, nestedSeries)
    }

    // stack y values depending on yScale
    if ('stacked' in yScaleSpec && yScaleSpec.stacked === true) {
        stackY<S, D>(xy as StackedXY, nestedSeries)
    }

    // computes scales
    const xScale = computeScale<D['x']>(xScaleSpec, xy.x, width, 'x')
    const yScale = computeScale<D['y']>(yScaleSpec, xy.y, height, 'y')

    // assign position to each datum in every scale
    const computedSeries: ComputedSerie<S, D>[] = nestedSeries.map(serie => ({
        ...serie,
        data: serie.data.map(datum => ({
            ...datum,
            position: {
                x: getDatumAxisPosition(datum, 'x', xScale),
                y: getDatumAxisPosition(datum, 'y', yScale),
            },
        })),
    }))

    return {
        ...xy,
        series: computedSeries,
        xScale,
        yScale,
    }
}

export const generateSeriesXY = <S = never, D extends SerieDatum = SerieDatum>(
    series: NestedSerie<S, D>[],
    xScaleSpec: ScaleSpec,
    yScaleSpec: ScaleSpec
) => ({
    x: generateSeriesAxis<'x', D['x']>(series, 'x', xScaleSpec),
    y: generateSeriesAxis<'y', D['y']>(series, 'y', yScaleSpec),
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
                    setValue(d, parseFloat(String(value)) as unknown as Value)
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
                    setValue(d, parseTime(value as Date) as unknown as Value)
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
            const all = sortBy(
                // filer null values to deal with holes in linechart
                uniq(values as number[]).filter(v => v !== null),
                v => v
            )

            return { all, min: _min(all), max: _max(all) }
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

// returns [min, max] of array
// Math.min(...array) and Math.max(...array) wil cause stack overflow
// if the array is too large for its elements to be copied to the stack
const arrayExtent = (array:number[]) => {
    return array.reduce((acc, val) => {
        if (!(val > acc[0])) {
            acc[0] = val;
        }
        if (!(val < acc[1])) {
            acc[1] = val;
        }
        return acc;
    }, [NaN, NaN])
}


export const stackAxis = <S = never, D extends SerieDatum = SerieDatum>(
    axis: ScaleAxis,
    xy: StackedXY,
    series: NestedSerie<S, D>[]
) => {
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
                // stacked values only support numbers
                value = datum.data[axis] as number
                if (value !== null) {
                    const head = last(stack)
                    if (head === undefined) {
                        stackValue = value
                    } else if (head !== null) {
                        stackValue = head + value
                    }
                }

                datum.data[axis === 'x' ? 'xStacked' : 'yStacked'] = stackValue
            }

            stack.push(stackValue)

            if (stackValue !== null) {
                all.push(stackValue)
            }
        })
    })

    const [min, max] = arrayExtent(all)

    xy[axis].minStacked = min
    xy[axis].maxStacked = max
}



const stackX = <S = never, D extends SerieDatum = SerieDatum>(
    xy: StackedXY,
    series: NestedSerie<S, D>[]
) => stackAxis<S, D>('x', xy, series)

const stackY = <S = never, D extends SerieDatum = SerieDatum>(
    xy: StackedXY,
    series: NestedSerie<S, D>[]
) => stackAxis<S, D>('y', xy, series)
