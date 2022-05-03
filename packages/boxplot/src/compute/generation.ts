import { OrdinalColorScale } from '@nivo/colors'
import { Scale, ScaleBand, computeScale, ScaleSpec, ScaleBandSpec } from '@nivo/scales'
import { BoxPlotSummary, ComputedBoxPlotSummary } from '../types'
import { getIndexScale } from './common'

type Params<XScaleInput, YScaleInput> = {
    data: BoxPlotSummary[]
    formatValue: (value: number) => string
    getColor: OrdinalColorScale<BoxPlotSummary>
    getTooltipLabel: (datum: BoxPlotSummary) => string
    innerPadding: number
    groups: string[]
    subGroups: string[]
    xScale: XScaleInput extends string ? ScaleBand<XScaleInput> : Scale<XScaleInput, number>
    yScale: YScaleInput extends string ? ScaleBand<YScaleInput> : Scale<YScaleInput, number>
}

const generateVerticalBoxPlots = (
    {
        data,
        getColor,
        getTooltipLabel,
        innerPadding = 0,
        groups,
        xScale,
        yScale,
        formatValue,
    }: Params<string, number>,
    bandwidth: number
): ComputedBoxPlotSummary[] => {
    return data.map(datum => {
        const { group, subGroup, groupIndex, subGroupIndex } = datum
        const x =
            (xScale(groups[groupIndex]) ?? 0) +
            bandwidth * subGroupIndex +
            innerPadding * subGroupIndex
        const y = yScale(datum.values[3]) ?? 0
        const height = (yScale(datum.values[1]) ?? 0) - (yScale(datum.values[3]) ?? 0)
        const key = `${groupIndex}.${subGroupIndex}`
        return {
            key,
            group,
            subGroup,
            data: datum,
            coordinates: {
                mean: yScale(datum.mean) ?? 0,
                extrema: datum.extrema.map(v => yScale(v) ?? 0),
                values: datum.values.map(v => yScale(v) ?? 0),
            },
            formatted: {
                n: datum.n,
                mean: formatValue(datum.mean),
                extrema: datum.extrema.map(formatValue),
                values: datum.values.map(formatValue),
                quantiles: datum.quantiles,
            },
            x: x,
            y: y,
            width: bandwidth,
            height,
            color: getColor(datum),
            label: getTooltipLabel(datum),
        } as ComputedBoxPlotSummary
    })
}

const generateHorizontalBoxPlots = (
    {
        data,
        getColor,
        getTooltipLabel,
        innerPadding = 0,
        groups,
        xScale,
        yScale,
        formatValue,
    }: Params<number, string>,
    bandwidth: number
): ComputedBoxPlotSummary[] => {
    return data.map(datum => {
        const { group, subGroup, groupIndex, subGroupIndex } = datum
        const x = xScale(datum.values[1]) ?? 0
        const y =
            (yScale(groups[groupIndex]) ?? 0) +
            bandwidth * subGroupIndex +
            innerPadding * subGroupIndex
        const width = (xScale(datum.values[3]) ?? 0) - (xScale(datum.values[1]) ?? 0)
        const key = `${groupIndex}.${subGroupIndex}`
        return {
            key,
            group,
            subGroup,
            data: datum,
            coordinates: {
                mean: xScale(datum.mean) ?? 0,
                extrema: datum.extrema.map(v => xScale(v) ?? 0),
                values: datum.values.map(v => xScale(v) ?? 0),
            },
            formatted: {
                n: datum.n,
                mean: formatValue(datum.mean),
                extrema: datum.extrema.map(formatValue),
                quantiles: datum.quantiles,
                values: datum.values.map(formatValue),
            },
            x: x,
            y: y,
            width,
            height: bandwidth,
            color: getColor(datum),
            label: getTooltipLabel(datum),
        } as ComputedBoxPlotSummary
    })
}

export const generateBoxPlots = ({
    data,
    layout,
    groups,
    subGroups,
    formatValue,
    minValue,
    maxValue,
    width,
    height,
    getColor,
    padding,
    innerPadding,
    valueScale,
    indexScale: indexScaleConfig,
    getTooltipLabel,
}: {
    data: BoxPlotSummary[]
    layout: string
    groups: string[] | null
    subGroups: string[] | null
    formatValue: (value: number) => string
    minValue: 'auto' | number
    maxValue: 'auto' | number
    width: number
    height: number
    getColor: OrdinalColorScale<BoxPlotSummary>
    padding: number
    innerPadding: number
    valueScale: ScaleSpec
    indexScale: ScaleBandSpec
    getTooltipLabel: (datum: BoxPlotSummary) => string
}) => {
    const [axis, otherAxis, size] =
        layout === 'vertical' ? (['y', 'x', width] as const) : (['x', 'y', height] as const)
    const indexScale = getIndexScale(groups ?? [], padding, indexScaleConfig, size, otherAxis)

    const scaleSpec = {
        max: maxValue,
        min: minValue,
        ...valueScale,
    }

    const values = data.map((datum: BoxPlotSummary) => datum.values).flat()
    const min = values.reduce((acc: number, value: number) => Math.min(acc, value), Infinity)
    const max = values.reduce((acc: number, value: number) => Math.max(acc, value), -Infinity)

    const scale = computeScale(
        scaleSpec as any,
        { all: [min, max], min, max },
        axis === 'x' ? width : height,
        axis
    )

    const [xScale, yScale] = layout === 'vertical' ? [indexScale, scale] : [scale, indexScale]

    const nSubGroups = Math.max(1, subGroups ? subGroups.length : 1)
    const bandwidth = (indexScale.bandwidth() - innerPadding * (nSubGroups - 1)) / nSubGroups

    const params = {
        data,
        getColor,
        groups,
        subGroups,
        getTooltipLabel,
        innerPadding,
        xScale,
        yScale,
        formatValue,
    } as Params<any, any>
    const boxPlots: ComputedBoxPlotSummary[] =
        bandwidth > 0
            ? layout === 'vertical'
                ? generateVerticalBoxPlots(params, bandwidth)
                : generateHorizontalBoxPlots(params, bandwidth)
            : []

    return { xScale, yScale, boxPlots }
}
