import { useMemo, useState } from 'react'
import { SpringConfig, useTransition } from '@react-spring/web'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { PropertyAccessor, usePropertyAccessor, useTheme, useValueFormatter } from '@nivo/core'
import {
    BoxPlotCommonProps,
    BoxPlotDatum,
    BoxPlotItemProps,
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
    value,
    groupBy,
    groups = defaultProps.groups,
    subGroupBy = defaultProps.subGroupBy,
    subGroups = defaultProps.subGroups,
    quantiles = defaultProps.quantiles,
    width,
    height,
    layout,
    minValue,
    maxValue,
    valueScale = defaultProps.valueScale,
    indexScale = defaultProps.indexScale,
    padding = defaultProps.padding,
    innerPadding = defaultProps.innerPadding,
    colorBy = defaultProps.colorBy,
    colors = defaultProps.colors,
    opacity,
    activeOpacity,
    inactiveOpacity,
    borderColor,
    medianColor,
    whiskerColor,
    legendLabel,
    tooltipLabel,
    valueFormat = defaultProps.valueFormat,
    legends = defaultProps.legends,
}: {
    data: DataProps<RawDatum>['data']
    width: number
    height: number
} & Pick<
    BoxPlotCommonProps<RawDatum>,
    | 'value'
    | 'groupBy'
    | 'groups'
    | 'subGroupBy'
    | 'subGroups'
    | 'quantiles'
    | 'layout'
    | 'minValue'
    | 'maxValue'
    | 'valueScale'
    | 'indexScale'
    | 'padding'
    | 'innerPadding'
    | 'colorBy'
    | 'colors'
    | 'opacity'
    | 'activeOpacity'
    | 'inactiveOpacity'
    | 'borderColor'
    | 'medianColor'
    | 'whiskerColor'
    | 'legendLabel'
    | 'tooltipLabel'
    | 'valueFormat'
    | 'legends'
>) => {
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

    const {
        boxPlots: unStyledBoxPlots,
        xScale,
        yScale,
    } = useMemo(
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
            padding,
            innerPadding,
            valueScale,
            indexScale,
            getTooltipLabel,
        ]
    )

    const [activeItem, setActiveItem] = useState<ComputedBoxPlotSummary | null>(null)
    const activeKeys = useMemo(() => {
        if (!activeItem) return []
        const activeGroup = activeItem.group
        const activeSubGroup = activeItem.subGroup
        return unStyledBoxPlots
            .filter(boxPlot => activeGroup === boxPlot.group || activeSubGroup === boxPlot.subGroup)
            .map(boxPlot => boxPlot.key)
    }, [unStyledBoxPlots, activeItem])

    const boxPlots: ComputedBoxPlotSummary[] = useMemo(
        () =>
            unStyledBoxPlots.map(boxPlot => {
                let computedOpacity = activeKeys.includes(boxPlot.key)
                    ? activeOpacity
                    : inactiveOpacity
                if (!activeItem) {
                    computedOpacity = opacity
                }
                return {
                    ...boxPlot,
                    color: getColor(boxPlot.data),
                    opacity: computedOpacity,
                }
            }),
        [
            unStyledBoxPlots,
            activeItem,
            activeKeys,
            opacity,
            activeOpacity,
            inactiveOpacity,
            getColor,
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
        activeItem,
        setActiveItem,
    }
}

export const useBoxPlotTransition = ({
    boxPlots,
    getBorderColor,
    getMedianColor,
    getWhiskerColor,
    animate,
    springConfig,
}: {
    boxPlots: ComputedBoxPlotSummary[]
    getBorderColor: (d: ComputedBoxPlotSummary) => string
    getMedianColor: (d: ComputedBoxPlotSummary) => string
    getWhiskerColor: (d: ComputedBoxPlotSummary) => string
    animate: boolean
    springConfig: SpringConfig
}) => {
    const getTransitionProps = (boxPlot: ComputedBoxPlotSummary) => ({
        borderColor: getBorderColor(boxPlot) as string,
        medianColor: getMedianColor(boxPlot) as string,
        whiskerColor: getWhiskerColor(boxPlot) as string,
        color: boxPlot.color,
        opacity: boxPlot.opacity,
        valueInterval: Math.abs(boxPlot.coordinates.values[3] - boxPlot.coordinates.values[1]),
        valueDistance0: boxPlot.coordinates.values[0] - boxPlot.coordinates.values[2],
        valueDistance1: boxPlot.coordinates.values[1] - boxPlot.coordinates.values[2],
        valueDistance3: boxPlot.coordinates.values[3] - boxPlot.coordinates.values[2],
        valueDistance4: boxPlot.coordinates.values[4] - boxPlot.coordinates.values[2],
        // translate to the midpoint of the median line
        transform:
            boxPlot.layout === 'vertical'
                ? `translate(${boxPlot.x + boxPlot.width / 2}, ${boxPlot.coordinates.values[2]})`
                : `translate(${boxPlot.coordinates.values[2]}, ${
                      boxPlot.y + boxPlot.height / 2
                  }) rotate(-90)`,
    })

    return useTransition<ComputedBoxPlotSummary, BoxPlotItemProps<BoxPlotDatum>['animatedProps']>(
        boxPlots,
        {
            keys: boxPlot => boxPlot.key,
            initial: animate ? undefined : null, // required for ssr
            from: boxPlot => ({
                ...getTransitionProps(boxPlot),
                valueInterval: 0,
                valueDistance0: 0,
                valueDistance1: 0,
                valueDistance3: 0,
                valueDistance4: 0,
            }),
            enter: boxPlot => ({ ...getTransitionProps(boxPlot) }),
            update: boxPlot => ({ ...getTransitionProps(boxPlot) }),
            leave: boxPlot => ({
                ...getTransitionProps(boxPlot),
                valueInterval: 0,
                valueDistance0: 0,
                valueDistance1: 0,
                valueDistance3: 0,
                valueDistance4: 0,
            }),
            config: springConfig,
            immediate: !animate,
        }
    )
}
