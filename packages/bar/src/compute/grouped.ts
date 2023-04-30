import { Margin } from '@nivo/core'
import { OrdinalColorScale } from '@nivo/colors'
import { Scale, ScaleBand, computeScale } from '@nivo/scales'
import { BarDatum, BarSvgProps, ComputedBarDatum, ComputedDatum } from '../types'
import { coerceValue, filterNullValues, getIndexScale, normalizeData } from './common'

type Params<RawDatum, XScaleInput, YScaleInput> = {
    data: RawDatum[]
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<ComputedDatum<RawDatum>>
    getIndex: (datum: RawDatum) => string
    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string
    innerPadding: number
    keys: string[]
    xScale: XScaleInput extends string ? ScaleBand<XScaleInput> : Scale<XScaleInput, number>
    yScale: YScaleInput extends string ? ScaleBand<YScaleInput> : Scale<YScaleInput, number>
    margin: Margin
}

const gt = (value: number, other: number) => value > other
const lt = (value: number, other: number) => value < other

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
        formatValue,
        getColor,
        getIndex,
        getTooltipLabel,
        innerPadding = 0,
        keys,
        xScale,
        yScale,
        margin,
    }: Params<RawDatum, string, number>,
    barWidth: number,
    reverse: boolean,
    yRef: number
): ComputedBarDatum<RawDatum>[] => {
    const compare = reverse ? lt : gt
    const getY = (d: number) => (compare(d, 0) ? yScale(d) ?? 0 : yRef)
    const getHeight = (d: number, y: number) => (compare(d, 0) ? yRef - y : (yScale(d) ?? 0) - yRef)
    const cleanedData = data.map(filterNullValues)

    const bars: ComputedBarDatum<RawDatum>[] = []
    keys.forEach((key, i) =>
        range(0, xScale.domain().length).forEach(index => {
            const [rawValue, value] = coerceValue(data[index][key])
            const indexValue = getIndex(data[index])
            const x = (xScale(indexValue) ?? 0) + barWidth * i + innerPadding * i
            const y = getY(value)
            const barHeight = getHeight(value, y)
            const barData: ComputedDatum<RawDatum> = {
                id: key,
                value: rawValue === null ? rawValue : value,
                formattedValue: formatValue(value),
                hidden: false,
                index,
                indexValue,
                data: cleanedData[index],
            }

            bars.push({
                key: `${key}.${barData.indexValue}`,
                index: bars.length,
                data: barData,
                x,
                y,
                absX: margin.left + x,
                absY: margin.top + y,
                width: barWidth,
                height: barHeight,
                color: getColor(barData),
                label: getTooltipLabel(barData),
            })
        })
    )

    return bars
}

/**
 * Generates x/y scales & bars for horizontal grouped bar chart.
 */
const generateHorizontalGroupedBars = <RawDatum extends Record<string, unknown>>(
    {
        data,
        formatValue,
        getIndex,
        getColor,
        getTooltipLabel,
        keys,
        innerPadding = 0,
        xScale,
        yScale,
        margin,
    }: Params<RawDatum, number, string>,
    barHeight: number,
    reverse: boolean,
    xRef: number
): ComputedBarDatum<RawDatum>[] => {
    const compare = reverse ? lt : gt
    const getX = (d: number) => (compare(d, 0) ? xRef : xScale(d) ?? 0)
    const getWidth = (d: number, x: number) => (compare(d, 0) ? (xScale(d) ?? 0) - xRef : xRef - x)
    const cleanedData = data.map(filterNullValues)

    const bars: ComputedBarDatum<RawDatum>[] = []
    keys.forEach((key, i) =>
        range(0, yScale.domain().length).forEach(index => {
            const [rawValue, value] = coerceValue(data[index][key])
            const indexValue = getIndex(data[index])
            const x = getX(value)
            const y = (yScale(indexValue) ?? 0) + barHeight * i + innerPadding * i
            const barWidth = getWidth(value, x)
            const barData: ComputedDatum<RawDatum> = {
                id: key,
                value: rawValue === null ? rawValue : value,
                formattedValue: formatValue(value),
                hidden: false,
                index,
                indexValue,
                data: cleanedData[index],
            }

            bars.push({
                key: `${key}.${barData.indexValue}`,
                index: bars.length,
                data: barData,
                x,
                y,
                absX: margin.left + x,
                absY: margin.top + y,
                width: barWidth,
                height: barHeight,
                color: getColor(barData),
                label: getTooltipLabel(barData),
            })
        })
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
    hiddenIds = [],
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
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<ComputedDatum<RawDatum>>
    getIndex: (datum: RawDatum) => string
    getTooltipLabel: (datum: ComputedDatum<RawDatum>) => string
    margin: Margin
    hiddenIds?: (string | number)[]
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
