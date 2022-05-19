import {
    Scale,
    ScaleBand,
    computeScale,
    ScaleBandSpec,
    ScaleLinearSpec,
    ScaleLogSpec,
    ScaleSymlogSpec,
    ScaleTimeSpec,
} from '@nivo/scales'
import { BoxPlotSummary, ComputedBoxPlotSummary } from '../types'
import { getIndexScale } from './common'

type Params = {
    data: BoxPlotSummary[]
    formatValue: (value: number) => string
    getTooltipLabel: (datum: BoxPlotSummary) => string
    innerPadding: number
    groups: string[]
    subGroups: string[]
    indexScale: ScaleBand<string>
    valueScale: Scale<number, number>
    bandwidth: number
    layout: 'vertical' | 'horizontal'
}

const generateComputedBoxPlotSummaries = ({
    data,
    getTooltipLabel,
    innerPadding = 0,
    groups,
    indexScale,
    valueScale,
    formatValue,
    bandwidth,
    layout,
}: Params): ComputedBoxPlotSummary[] => {
    if (bandwidth === 0) {
        return Array<ComputedBoxPlotSummary>()
    }
    const vertical = layout === 'vertical'
    return data.map(datum => {
        const { group, subGroup, groupIndex, subGroupIndex, values } = datum
        const indexCoordinate =
            (indexScale(groups[groupIndex]) ?? 0) +
            bandwidth * subGroupIndex +
            innerPadding * subGroupIndex
        const key = `${groupIndex}.${subGroupIndex}`
        const coords = values.map(valueScale).map(v => v ?? 0)
        const intervals = [0, 1, 2, 3].map(i => Math.abs(coords[i + 1] - coords[i]) ?? 0)
        // top-left of rectangle and width/height depend on the layout
        // (this conditional inside the loop is not ideal, but typical loops will be short)
        const position = vertical
            ? {
                  x: indexCoordinate,
                  y: valueScale(datum.values[3]) ?? 0,
                  width: bandwidth,
                  height: intervals[1] + intervals[2],
              }
            : {
                  x: valueScale(datum.values[1]) ?? 0,
                  y: indexCoordinate,
                  width: intervals[1] + intervals[2],
                  height: bandwidth,
              }
        return {
            key,
            group,
            subGroup,
            data: datum,
            formatted: {
                n: String(datum.n),
                mean: formatValue(datum.mean),
                extrema: datum.extrema.map(formatValue),
                values: datum.values.map(formatValue),
                quantiles: datum.quantiles.map(v => String(100 * v)),
            },
            ...position,
            coordinates: {
                index: indexCoordinate,
                values: values.map(v => valueScale(v) ?? 0),
            },
            bandwidth,
            label: getTooltipLabel(datum),
            layout,
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
    padding,
    innerPadding,
    valueScale: valueScaleConfig,
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
    padding: number
    innerPadding: number
    valueScale: ScaleLinearSpec | ScaleLogSpec | ScaleSymlogSpec | ScaleTimeSpec
    indexScale: ScaleBandSpec
    getTooltipLabel: (datum: BoxPlotSummary) => string
}) => {
    const [axis, otherAxis, size] =
        layout === 'vertical' ? (['y', 'x', width] as const) : (['x', 'y', height] as const)
    const indexScale = getIndexScale(groups ?? [], padding, indexScaleConfig, size, otherAxis)

    const valueScaleSpec = {
        max: maxValue,
        min: minValue,
        ...valueScaleConfig,
    }

    const values = data.map((datum: BoxPlotSummary) => datum.values).flat()
    const min = values.reduce((acc: number, value: number) => Math.min(acc, value), Infinity)
    const max = values.reduce((acc: number, value: number) => Math.max(acc, value), -Infinity)

    const valueScale = computeScale(
        valueScaleSpec as ScaleLinearSpec | ScaleLogSpec | ScaleSymlogSpec | ScaleTimeSpec,
        { all: [min, max], min, max },
        axis === 'x' ? width : height,
        axis
    )

    const [xScale, yScale] =
        layout === 'vertical' ? [indexScale, valueScale] : [valueScale, indexScale]

    const nSubGroups = Math.max(1, subGroups ? subGroups.length : 1)
    const bandwidth = (indexScale.bandwidth() - innerPadding * (nSubGroups - 1)) / nSubGroups

    const params = {
        data,
        groups,
        subGroups,
        getTooltipLabel,
        innerPadding,
        indexScale,
        valueScale,
        formatValue,
        bandwidth,
        layout,
    } as Params
    const boxPlots = generateComputedBoxPlotSummaries(params)

    return { xScale, yScale, boxPlots }
}
