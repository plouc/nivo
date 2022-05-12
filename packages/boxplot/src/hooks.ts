import { useMemo } from 'react'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { PropertyAccessor, usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import {
    BoxPlotCommonProps,
    BoxPlotDatum,
    BoxPlotSummary,
    ComputedBoxPlotSummary,
    LegendData,
    BoxPlotLegendProps,
} from './types'
import { defaultProps } from './props'
import { generateBoxPlots, getLegendData, stratifyData, summarizeDistributions } from './compute'

export const useLevels = <RawDatum extends BoxPlotDatum>(
    levels: string[] | null,
    data: RawDatum[],
    by: PropertyAccessor<RawDatum, string> | null
) => {
    const getLevel = usePropertyAccessor(by ?? 'id')
    if (levels) return levels
    if (!by) return null
    const result = new Set(data.map((d: RawDatum) => getLevel(d)))
    return Array.from(result)
}

export const useBoxPlot = <RawDatum extends BoxPlotDatum>({
    tooltipLabel = defaultProps.tooltipLabel,
    valueFormat = defaultProps.valueFormat,
    colors = defaultProps.colors,
    colorBy = defaultProps.colorBy,
    borderColor,
    medianColor,
    whiskerColor,
    layout = defaultProps.layout,
    data,
    value = defaultProps.value,
    groupBy = defaultProps.groupBy,
    groups = defaultProps.groups,
    subGroupBy = defaultProps.subGroupBy,
    subGroups = defaultProps.subGroups,
    quantiles = defaultProps.quantiles,
    minValue = defaultProps.minValue,
    maxValue = defaultProps.maxValue,
    width,
    height,
    padding = defaultProps.padding,
    innerPadding = defaultProps.innerPadding,
    valueScale = defaultProps.valueScale,
    indexScale = defaultProps.indexScale,
    legends = defaultProps.legends,
    legendLabel,
}: {
    tooltipLabel?: BoxPlotCommonProps<RawDatum>['tooltipLabel']
    valueFormat?: BoxPlotCommonProps<RawDatum>['valueFormat']
    colors?: BoxPlotCommonProps<RawDatum>['colors']
    colorBy?: BoxPlotCommonProps<RawDatum>['colorBy']
    borderColor: BoxPlotCommonProps<RawDatum>['borderColor']
    medianColor: BoxPlotCommonProps<RawDatum>['medianColor']
    whiskerColor: BoxPlotCommonProps<RawDatum>['whiskerColor']
    layout?: BoxPlotCommonProps<RawDatum>['layout']
    data: RawDatum[]
    value?: BoxPlotCommonProps<RawDatum>['value']
    groupBy?: BoxPlotCommonProps<RawDatum>['groupBy']
    groups?: BoxPlotCommonProps<RawDatum>['groups']
    subGroupBy?: BoxPlotCommonProps<RawDatum>['subGroupBy']
    subGroups?: BoxPlotCommonProps<RawDatum>['subGroups']
    quantiles?: BoxPlotCommonProps<RawDatum>['quantiles']
    minValue?: BoxPlotCommonProps<RawDatum>['minValue']
    maxValue?: BoxPlotCommonProps<RawDatum>['maxValue']
    width: number
    height: number
    padding?: BoxPlotCommonProps<RawDatum>['padding']
    innerPadding?: BoxPlotCommonProps<RawDatum>['innerPadding']
    valueScale?: BoxPlotCommonProps<RawDatum>['valueScale']
    indexScale?: BoxPlotCommonProps<RawDatum>['indexScale']
    legends?: BoxPlotCommonProps<RawDatum>['legends']
    legendLabel?: BoxPlotCommonProps<RawDatum>['legendLabel']
}) => {
    // ensure that groups and subGroups are defined
    groups = useLevels(groups, data, groupBy)
    subGroups = useLevels(subGroups, data, subGroupBy)
    const getGroup = usePropertyAccessor(groupBy ?? 'group')
    const getSubGroup = usePropertyAccessor(subGroupBy ?? 'subGroup')
    const getTooltipLabel = usePropertyAccessor(tooltipLabel)
    const getValue = usePropertyAccessor(value)
    const formatValue = useValueFormatter(valueFormat)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, colorBy)
    // trigger color fetch for all groups and subgroups
    if (groups && colorBy === 'group') {
        groups.map(group => getColor({ group } as BoxPlotSummary))
    }
    if (subGroups && colorBy === 'subGroup') {
        subGroups.map(subGroup => getColor({ subGroup } as BoxPlotSummary))
    }

    const getBorderColor = useInheritedColor<ComputedBoxPlotSummary>(borderColor, theme)
    const getMedianColor = useInheritedColor<ComputedBoxPlotSummary>(medianColor, theme)
    const getWhiskerColor = useInheritedColor<ComputedBoxPlotSummary>(whiskerColor, theme)

    // stratify long array with individual data points into arrays that will
    // feed boxplot representations
    const dataStratified = stratifyData({
        data,
        groups,
        getGroup,
        subGroups,
        getSubGroup,
    })

    const nSubGroups = Math.max(1, subGroups ? subGroups.length : 1)
    const dataSummary = useMemo(
        () =>
            dataStratified.map((stratum: RawDatum[], index) =>
                summarizeDistributions({
                    data: stratum,
                    getValue,
                    groups,
                    subGroups,
                    groupIndex: Math.floor(index / nSubGroups),
                    subGroupIndex: index % nSubGroups,
                    quantiles,
                })
            ),
        [dataStratified, getValue, groups, subGroups, nSubGroups, quantiles]
    )

    const { boxPlots, xScale, yScale } = useMemo(
        () =>
            generateBoxPlots({
                layout,
                data: dataSummary.filter(stratum => stratum.n > 0),
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
                indexScale,
                getTooltipLabel,
            }),
        [
            layout,
            dataSummary,
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
            indexScale,
            getTooltipLabel,
        ]
    )

    const legendsData: [BoxPlotLegendProps, LegendData[]][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData({
                    boxPlots,
                    legendLabel,
                    ...legend,
                })
                return [legend, data]
            }),
        [legends, boxPlots, legendLabel]
    )

    return {
        boxPlots,
        xScale,
        yScale,
        getTooltipLabel,
        formatValue,
        getColor,
        getBorderColor,
        getMedianColor,
        getWhiskerColor,
        legendsData,
    }
}
