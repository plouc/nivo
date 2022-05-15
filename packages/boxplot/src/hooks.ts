import { useMemo } from 'react'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { PropertyAccessor, usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import {
    BoxPlotCommonProps,
    BoxPlotDatum,
    BoxPlotSummary,
    ComputedBoxPlotSummary,
    DataProps,
    LegendData,
} from './types'
import { defaultProps } from './props'
import { generateBoxPlots, getLegendData, stratifyData, summarizeDistribution } from './compute'
import { LegendProps } from '@nivo/legends'

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
    data,
    value = defaultProps.value,
    groupBy = defaultProps.groupBy,
    groups = defaultProps.groups,
    subGroupBy = defaultProps.subGroupBy,
    subGroups = defaultProps.subGroups,
    quantiles = defaultProps.quantiles,
    width,
    height,
    layout = defaultProps.layout,
    minValue = defaultProps.minValue,
    maxValue = defaultProps.maxValue,
    valueScale = defaultProps.valueScale,
    indexScale = defaultProps.indexScale,
    padding = defaultProps.padding,
    innerPadding = defaultProps.innerPadding,
    colorBy = defaultProps.colorBy,
    colors = defaultProps.colors,
    borderColor,
    medianColor,
    whiskerColor,
    legendLabel,
    tooltipLabel = defaultProps.tooltipLabel,
    valueFormat = defaultProps.valueFormat,
    legends = defaultProps.legends,
}: {
    data: DataProps<RawDatum>['data']
    value?: BoxPlotCommonProps<RawDatum>['value']
    groupBy?: BoxPlotCommonProps<RawDatum>['groupBy']
    groups?: BoxPlotCommonProps<RawDatum>['groups']
    subGroupBy?: BoxPlotCommonProps<RawDatum>['subGroupBy']
    subGroups?: BoxPlotCommonProps<RawDatum>['subGroups']
    quantiles?: BoxPlotCommonProps<RawDatum>['quantiles']
    width: number
    height: number
    layout?: BoxPlotCommonProps<RawDatum>['layout']
    minValue?: BoxPlotCommonProps<RawDatum>['minValue']
    maxValue?: BoxPlotCommonProps<RawDatum>['maxValue']
    valueScale?: BoxPlotCommonProps<RawDatum>['valueScale']
    indexScale?: BoxPlotCommonProps<RawDatum>['indexScale']
    padding?: BoxPlotCommonProps<RawDatum>['padding']
    innerPadding?: BoxPlotCommonProps<RawDatum>['innerPadding']
    colorBy: BoxPlotCommonProps<RawDatum>['colorBy']
    colors: BoxPlotCommonProps<RawDatum>['colors']
    borderColor: BoxPlotCommonProps<RawDatum>['borderColor']
    medianColor: BoxPlotCommonProps<RawDatum>['medianColor']
    whiskerColor: BoxPlotCommonProps<RawDatum>['whiskerColor']
    legendLabel?: BoxPlotCommonProps<RawDatum>['legendLabel']
    tooltipLabel?: BoxPlotCommonProps<RawDatum>['tooltipLabel']
    valueFormat?: BoxPlotCommonProps<RawDatum>['valueFormat']
    legends?: BoxPlotCommonProps<RawDatum>['legends']
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
                summarizeDistribution({
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

    const legendsData: [LegendProps, LegendData[]][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData({
                    boxPlots,
                    dataFrom: colorBy,
                    legendLabel,
                })
                return [legend, data]
            }),
        [legends, boxPlots, colorBy, legendLabel]
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
