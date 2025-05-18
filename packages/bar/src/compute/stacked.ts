import { Margin } from '@nivo/core'
import { OrdinalColorScale } from '@nivo/colors'
import { Scale, ScaleBand, computeScale } from '@nivo/scales'
import { Series, SeriesPoint, stack, stackOffsetDiverging } from 'd3-shape'
import { BarDatum, BarSvgProps, ComputedBarDatum, ComputedDatum } from '../types'
import { coerceValue, filterNullValues, getIndexScale, normalizeData } from './common'

type StackDatum<D extends BarDatum> = SeriesPoint<D>

type Params<D extends BarDatum, XScaleInput, YScaleInput> = {
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<ComputedDatum<D>>
    getIndex: (datum: D) => string
    getTooltipLabel: (datum: ComputedDatum<D>) => string
    innerPadding: number
    stackedData: Series<D, string>[]
    xScale: XScaleInput extends string ? ScaleBand<XScaleInput> : Scale<XScaleInput, number>
    yScale: YScaleInput extends string ? ScaleBand<YScaleInput> : Scale<YScaleInput, number>
    margin: Margin
}

const flattenDeep = <T>(arr: T[]): T =>
    arr.some(Array.isArray) ? flattenDeep(([] as T[]).concat(...arr)) : (arr as unknown as T)

const filterZerosIfLog = (array: number[], type: string) =>
    type === 'log' ? array.filter(num => num !== 0) : array

/**
 * Generates x/y scales & bars for vertical stacked bar chart.
 */
const generateVerticalStackedBars = <D extends BarDatum>(
    {
        formatValue,
        getColor,
        getIndex,
        getTooltipLabel,
        innerPadding,
        stackedData,
        xScale,
        yScale,
        margin,
    }: Params<D, string, number>,
    barWidth: number,
    reverse: boolean
): ComputedBarDatum<D>[] => {
    const getY = (d: StackDatum<D>) => yScale(d[reverse ? 0 : 1])
    const getHeight = (d: StackDatum<D>, y: number) => (yScale(d[reverse ? 1 : 0]) ?? 0) - y

    const bars: ComputedBarDatum<D>[] = []
    stackedData.forEach(stackedDataItem =>
        xScale.domain().forEach((index, i) => {
            const d = stackedDataItem[i]
            const x = xScale(getIndex(d.data)) ?? 0
            const y = (getY(d) ?? 0) + innerPadding * 0.5
            const barHeight = getHeight(d, y) - innerPadding
            const [rawValue, value] = coerceValue(d.data[stackedDataItem.key])

            const barData: ComputedDatum<D> = {
                id: stackedDataItem.key,
                value: rawValue === null ? rawValue : value,
                formattedValue: formatValue(value),
                hidden: false,
                index: i,
                indexValue: index,
                data: filterNullValues(d.data),
            }

            bars.push({
                key: `${stackedDataItem.key}.${index}`,
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
 * Generates x/y scales & bars for horizontal stacked bar chart.
 */
const generateHorizontalStackedBars = <D extends BarDatum>(
    {
        formatValue,
        getColor,
        getIndex,
        getTooltipLabel,
        innerPadding,
        stackedData,
        xScale,
        yScale,
        margin,
    }: Params<D, number, string>,
    barHeight: number,
    reverse: boolean
): ComputedBarDatum<D>[] => {
    const getX = (d: StackDatum<D>) => xScale(d[reverse ? 1 : 0])
    const getWidth = (d: StackDatum<D>, x: number) => (xScale(d[reverse ? 0 : 1]) ?? 0) - x

    const bars: ComputedBarDatum<D>[] = []
    stackedData.forEach(stackedDataItem =>
        yScale.domain().forEach((index, i) => {
            const d = stackedDataItem[i]
            const y = yScale(getIndex(d.data)) ?? 0
            const x = (getX(d) ?? 0) + innerPadding * 0.5
            const barWidth = getWidth(d, x) - innerPadding
            const [rawValue, value] = coerceValue(d.data[stackedDataItem.key])

            const barData: ComputedDatum<D> = {
                id: stackedDataItem.key,
                value: rawValue === null ? rawValue : value,
                formattedValue: formatValue(value),
                hidden: false,
                index: i,
                indexValue: index,
                data: filterNullValues(d.data),
            }

            bars.push({
                key: `${stackedDataItem.key}.${index}`,
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
 * Generates x/y scales & bars for stacked bar chart.
 */
export const generateStackedBars = <RawDatum extends BarDatum>({
    data,
    layout,
    minValue,
    maxValue,
    reverse,
    width,
    height,
    padding = 0,
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
    hiddenIds?: readonly (string | number)[]
}) => {
    const keys = props.keys.filter(key => !hiddenIds.includes(key))
    const stackedData = stack<RawDatum, string>().keys(keys).offset(stackOffsetDiverging)(
        normalizeData(data, keys)
    )

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

    const values = filterZerosIfLog(
        flattenDeep(stackedData as unknown as number[][]),
        valueScale.type
    )
    const min = Math.min(...values)
    const max = Math.max(...values)

    const scale = computeScale(
        scaleSpec as any,
        { all: values, min, max },
        axis === 'x' ? width : height,
        axis
    )

    const [xScale, yScale] = layout === 'vertical' ? [indexScale, scale] : [scale, indexScale]

    const innerPadding = props.innerPadding > 0 ? props.innerPadding : 0
    const bandwidth = indexScale.bandwidth()
    const params = [
        { ...props, innerPadding, stackedData, xScale, yScale } as Params<RawDatum, any, any>,
        bandwidth,
        scaleSpec.reverse,
    ] as const

    const bars: ComputedBarDatum<RawDatum>[] =
        bandwidth > 0
            ? layout === 'vertical'
                ? generateVerticalStackedBars(...params)
                : generateHorizontalStackedBars(...params)
            : []

    return { xScale, yScale, bars }
}
