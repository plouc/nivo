import { BarDatum, BarSvgProps, ComputedBarDatum, ComputedDatum } from '../types'
import { OrdinalColorScale } from '@nivo/colors'
import { Scale, ScaleBand } from '@nivo/scales'
import { coerceValue, filterNullValues, getIndexScale, normalizeData } from './common'
import { computeScale } from '@nivo/scales'

type Params<RawDatum, XScaleInput, YScaleInput> = {
    data: RawDatum[]
    getColor: OrdinalColorScale<ComputedDatum<RawDatum>>
    getIndex: (datum: RawDatum) => string
    innerPadding: number
    keys: string[]
    xScale: XScaleInput extends string ? ScaleBand<XScaleInput> : Scale<XScaleInput, number>
    yScale: YScaleInput extends string ? ScaleBand<YScaleInput> : Scale<YScaleInput, number>
}

const gt = (value: number, other: number) => value > other
const lt = (value: number, other: number) => value < other

const flatten = <T>(array: T[][]) => ([] as T[]).concat(...array)
const range = (start: number, end: number) =>
    Array.from(' '.repeat(end - start), (_, index) => start + index)

const clampToZero = (value: number) => (gt(value, 0) ? 0 : value)
const zeroIfNotFinite = (value: number) => (isFinite(value) ? value : 0)

/**
 * Generates x/y scales & bars for vertical grouped bar chart.
 */
const generateVerticalGroupedBars = <RawDatum extends Record<string, unknown>>(
    {
        data,
        getIndex,
        keys,
        getColor,
        innerPadding = 0,
        xScale,
        yScale,
    }: Params<RawDatum, string, number>,
    barWidth: number,
    reverse: boolean,
    yRef: number
) => {
    const compare = reverse ? lt : gt
    const getY = (d: number) => (compare(d, 0) ? yScale(d) ?? 0 : yRef)
    const getHeight = (d: number, y: number) => (compare(d, 0) ? yRef - y : (yScale(d) ?? 0) - yRef)
    const cleanedData = data.map(filterNullValues)

    const bars = flatten(
        keys.map((key, i) =>
            range(0, xScale.domain().length).map(index => {
                const [rawValue, value] = coerceValue(data[index][key])
                const indexValue = getIndex(data[index])
                const x = (xScale(indexValue) ?? 0) + barWidth * i + innerPadding * i
                const y = getY(value)
                const barHeight = getHeight(value, y)
                const barData = {
                    id: key,
                    value: rawValue === null ? rawValue : value,
                    index,
                    indexValue,
                    data: cleanedData[index],
                }

                return {
                    key: `${key}.${barData.indexValue}`,
                    data: barData,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(barData),
                }
            })
        )
    )

    return bars
}

/**
 * Generates x/y scales & bars for horizontal grouped bar chart.
 */
const generateHorizontalGroupedBars = <RawDatum extends Record<string, unknown>>(
    {
        data,
        getIndex,
        keys,
        getColor,
        innerPadding = 0,
        xScale,
        yScale,
    }: Params<RawDatum, number, string>,
    barHeight: number,
    reverse: boolean,
    xRef: number
) => {
    const compare = reverse ? lt : gt
    const getX = (d: number) => (compare(d, 0) ? xRef : xScale(d) ?? 0)
    const getWidth = (d: number, x: number) => (compare(d, 0) ? (xScale(d) ?? 0) - xRef : xRef - x)
    const cleanedData = data.map(filterNullValues)

    const bars = flatten(
        keys.map((key, i) =>
            range(0, yScale.domain().length).map(index => {
                const [rawValue, value] = coerceValue(data[index][key])
                const indexValue = getIndex(data[index])
                const x = getX(value)
                const y = (yScale(indexValue) ?? 0) + barHeight * i + innerPadding * i
                const barWidth = getWidth(value, x)
                const barData = {
                    id: key,
                    value: rawValue === null ? rawValue : value,
                    index,
                    indexValue,
                    data: cleanedData[index],
                }

                return {
                    key: `${key}.${barData.indexValue}`,
                    data: barData,
                    x,
                    y,
                    width: barWidth,
                    height: barHeight,
                    color: getColor(barData),
                }
            })
        )
    )

    return bars
}

/**
 * Generates x/y scales & bars for grouped bar chart.
 */
export const generateGroupedBars = <RawDatum extends BarDatum>({
    layout,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    padding = 0,
    innerPadding = 0,
    valueScale,
    indexScale: indexScaleConfig,
    hiddenIds,
    ...props
}: Pick<
    Required<BarSvgProps<RawDatum>>,
    | 'data'
    | 'height'
    | 'indexScale'
    | 'innerPadding'
    | 'keys'
    | 'layout'
    | 'maxValue'
    | 'minValue'
    | 'padding'
    | 'reverse'
    | 'valueScale'
    | 'width'
> & {
    getColor: OrdinalColorScale<ComputedDatum<RawDatum>>
    getIndex: (datum: RawDatum) => string
    hiddenIds: string[]
}) => {
    const keys = props.keys.filter(key => !hiddenIds.includes(key))
    const data = normalizeData(props.data, keys)
    const [axis, otherAxis, size] =
        layout === 'vertical' ? (['y', 'x', width] as const) : (['x', 'y', height] as const)
    const indexScale = getIndexScale(
        data,
        props.getIndex,
        padding,
        indexScaleConfig,
        size,
        otherAxis
    )

    const scaleSpec = {
        max: maxValue,
        min: minValue,
        reverse,
        ...valueScale,
    }

    const clampMin = scaleSpec.min === 'auto' ? clampToZero : (value: number) => value

    const values = data
        .reduce<number[]>((acc, entry) => [...acc, ...keys.map(k => entry[k] as number)], [])
        .filter(Boolean)
    const min = clampMin(Math.min(...values))
    const max = zeroIfNotFinite(Math.max(...values))

    const scale = computeScale(
        scaleSpec as any,
        { all: values, min, max },
        axis === 'x' ? width : height,
        axis
    )

    const [xScale, yScale] = layout === 'vertical' ? [indexScale, scale] : [scale, indexScale]

    const bandwidth = (indexScale.bandwidth() - innerPadding * (keys.length - 1)) / keys.length
    const params = [
        { ...props, data, keys, innerPadding, xScale, yScale } as Params<RawDatum, any, any>,
        bandwidth,
        scaleSpec.reverse,
        scale(0) ?? 0,
    ] as const

    const bars: ComputedBarDatum<RawDatum>[] =
        bandwidth > 0
            ? layout === 'vertical'
                ? generateVerticalGroupedBars(...params)
                : generateHorizontalGroupedBars(...params)
            : []

    return { xScale, yScale, bars }
}
