import { useCallback, useMemo, useState } from 'react'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { usePropertyAccessor, useTheme, useValueFormatter, Margin } from '@nivo/core'
import { DataProps, BarCommonProps, BarDatum, ComputedBarDatumWithValue } from './types'
import { defaultProps } from './props'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { LegendData, BoxLegendSpec } from '@nivo/legends'
import { uniqBy } from 'lodash'

export const useBar = <RawDatum extends BarDatum>({
    indexBy = defaultProps.indexBy,
    keys = defaultProps.keys,
    label = defaultProps.label,
    tooltipLabel = defaultProps.tooltipLabel,
    valueFormat,
    colors = defaultProps.colors,
    colorBy = defaultProps.colorBy,
    borderColor = defaultProps.borderColor,
    labelTextColor = defaultProps.labelTextColor,
    groupMode = defaultProps.groupMode,
    layout = defaultProps.layout,
    reverse = defaultProps.reverse,
    data,
    minValue = defaultProps.minValue,
    maxValue = defaultProps.maxValue,
    margin,
    width,
    height,
    padding = defaultProps.padding,
    innerPadding = defaultProps.innerPadding,
    valueScale = defaultProps.valueScale,
    indexScale = defaultProps.indexScale,
    initialHiddenIds = defaultProps.initialHiddenIds,
    enableLabel = defaultProps.enableLabel,
    labelSkipWidth = defaultProps.labelSkipWidth,
    labelSkipHeight = defaultProps.labelSkipHeight,
    legends = defaultProps.legends,
    legendLabel,
}: {
    indexBy?: BarCommonProps<RawDatum>['indexBy']
    label?: BarCommonProps<RawDatum>['label']
    tooltipLabel?: BarCommonProps<RawDatum>['tooltipLabel']
    valueFormat?: BarCommonProps<RawDatum>['valueFormat']
    colors?: BarCommonProps<RawDatum>['colors']
    colorBy?: BarCommonProps<RawDatum>['colorBy']
    borderColor?: BarCommonProps<RawDatum>['borderColor']
    labelTextColor?: BarCommonProps<RawDatum>['labelTextColor']
    groupMode?: BarCommonProps<RawDatum>['groupMode']
    layout?: BarCommonProps<RawDatum>['layout']
    reverse?: BarCommonProps<RawDatum>['reverse']
    data: DataProps<RawDatum>['data']
    keys?: BarCommonProps<RawDatum>['keys']
    minValue?: BarCommonProps<RawDatum>['minValue']
    maxValue?: BarCommonProps<RawDatum>['maxValue']
    margin: Margin
    width: number
    height: number
    padding?: BarCommonProps<RawDatum>['padding']
    innerPadding?: BarCommonProps<RawDatum>['innerPadding']
    valueScale?: BarCommonProps<RawDatum>['valueScale']
    indexScale?: BarCommonProps<RawDatum>['indexScale']
    initialHiddenIds?: BarCommonProps<RawDatum>['initialHiddenIds']
    enableLabel?: BarCommonProps<RawDatum>['enableLabel']
    labelSkipWidth?: BarCommonProps<RawDatum>['labelSkipWidth']
    labelSkipHeight?: BarCommonProps<RawDatum>['labelSkipHeight']
    legends?: BarCommonProps<RawDatum>['legends']
    legendLabel?: BarCommonProps<RawDatum>['legendLabel']
}) => {
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])
    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const getIndex = usePropertyAccessor(indexBy)
    const getLabel = usePropertyAccessor(label)
    const getTooltipLabel = usePropertyAccessor(tooltipLabel)
    const formatValue = useValueFormatter(valueFormat)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getBorderColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        borderColor,
        theme
    )
    const getLabelColor = useInheritedColor<ComputedBarDatumWithValue<RawDatum>>(
        labelTextColor,
        theme
    )

    const generateBars = groupMode === 'grouped' ? generateGroupedBars : generateStackedBars
    const { bars, xScale, yScale } = generateBars({
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width,
        height,
        getColor,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        hiddenIds,
        formatValue,
        getTooltipLabel,
        margin,
    })

    const barsWithValue = useMemo(
        () =>
            bars
                .filter(
                    (bar): bar is ComputedBarDatumWithValue<RawDatum> => bar.data.value !== null
                )
                .map((bar, index) => ({
                    ...bar,
                    index,
                })),
        [bars]
    )

    const shouldRenderBarLabel = useCallback(
        ({ width, height }: { height: number; width: number }) => {
            if (!enableLabel) return false
            if (labelSkipWidth > 0 && width < labelSkipWidth) return false
            if (labelSkipHeight > 0 && height < labelSkipHeight) return false
            return true
        },
        [enableLabel, labelSkipWidth, labelSkipHeight]
    )

    // calculate an array with as many elements as there should be items in the legend
    const legendBaseData = useMemo(() => {
        if (colorBy === 'id') {
            return keys.map(key => {
                const bar = bars.find(bar => bar.data.id === key)
                return { ...bar, data: { id: key, ...bar?.data, hidden: hiddenIds.includes(key) } }
            })
        }
        return uniqBy(bars, ({ data }) => data.indexValue)
    }, [hiddenIds, keys, bars, colorBy])

    const legendData: [BoxLegendSpec, LegendData][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData({
                    bars: legendBaseData,
                    direction: legend.direction,
                    from: colorBy,
                    groupMode,
                    layout,
                    legendLabel,
                    reverse,
                })

                return [legend, legend.data ?? data]
            }),
        [legends, legendBaseData, colorBy, groupMode, layout, legendLabel, reverse]
    )

    return {
        bars,
        barsWithValue,
        xScale,
        yScale,
        getIndex,
        getLabel,
        getTooltipLabel,
        formatValue,
        getColor,
        getBorderColor,
        getLabelColor,
        shouldRenderBarLabel,
        hiddenIds,
        toggleSerie,
        legendData,
    }
}
