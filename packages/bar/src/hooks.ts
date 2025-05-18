import { useCallback, useMemo, useState } from 'react'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { usePropertyAccessor, useValueFormatter, Margin } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import {
    DataProps,
    BarCommonProps,
    BarDatum,
    ComputedBarDatumWithValue,
    LegendData,
    BarLegendProps,
} from './types'
import { commonDefaultProps } from './defaults'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { computeBarTotals } from './compute/totals'

export const useBar = <D extends BarDatum>({
    indexBy = commonDefaultProps.indexBy,
    keys = commonDefaultProps.keys,
    label = commonDefaultProps.label,
    tooltipLabel = commonDefaultProps.tooltipLabel,
    valueFormat,
    colors = commonDefaultProps.colors,
    colorBy = commonDefaultProps.colorBy,
    borderColor = commonDefaultProps.borderColor,
    labelTextColor = commonDefaultProps.labelTextColor,
    groupMode = commonDefaultProps.groupMode,
    layout = commonDefaultProps.layout,
    reverse = commonDefaultProps.reverse,
    data,
    minValue = commonDefaultProps.minValue,
    maxValue = commonDefaultProps.maxValue,
    margin,
    width,
    height,
    padding = commonDefaultProps.padding,
    innerPadding = commonDefaultProps.innerPadding,
    valueScale = commonDefaultProps.valueScale,
    indexScale = commonDefaultProps.indexScale,
    initialHiddenIds = commonDefaultProps.initialHiddenIds,
    enableLabel = commonDefaultProps.enableLabel,
    labelSkipWidth = commonDefaultProps.labelSkipWidth,
    labelSkipHeight = commonDefaultProps.labelSkipHeight,
    legends = commonDefaultProps.legends,
    legendLabel,
    totalsOffset = commonDefaultProps.totalsOffset,
}: Partial<
    Pick<
        BarCommonProps<D>,
        | 'indexBy'
        | 'keys'
        | 'label'
        | 'tooltipLabel'
        | 'valueFormat'
        | 'colors'
        | 'colorBy'
        | 'borderColor'
        | 'labelTextColor'
        | 'groupMode'
        | 'layout'
        | 'reverse'
        | 'minValue'
        | 'maxValue'
        | 'padding'
        | 'innerPadding'
        | 'valueScale'
        | 'indexScale'
        | 'initialHiddenIds'
        | 'enableLabel'
        | 'labelSkipWidth'
        | 'labelSkipHeight'
        | 'legends'
        | 'legendLabel'
        | 'totalsOffset'
    >
> & {
    width: number
    height: number
    margin: Margin
    data: DataProps<D>['data']
}) => {
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])
    const toggleSerie = useCallback((id: string | number) => {
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
    const getBorderColor = useInheritedColor<ComputedBarDatumWithValue<D>>(borderColor, theme)
    const getLabelColor = useInheritedColor<ComputedBarDatumWithValue<D>>(labelTextColor, theme)

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
                .filter((bar): bar is ComputedBarDatumWithValue<D> => bar.data.value !== null)
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

    const legendData = useMemo(
        () =>
            keys.map(key => {
                const bar = bars.find(bar => bar.data.id === key)

                return { ...bar, data: { id: key, ...bar?.data, hidden: hiddenIds.includes(key) } }
            }),
        [hiddenIds, keys, bars]
    )

    const legendsWithData: [BarLegendProps, LegendData[]][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData({
                    bars: legend.dataFrom === 'keys' ? legendData : bars,
                    direction: legend.direction,
                    from: legend.dataFrom,
                    groupMode,
                    layout,
                    legendLabel,
                    reverse,
                })

                return [legend, data]
            }),
        [legends, legendData, bars, groupMode, layout, legendLabel, reverse]
    )

    const barTotals = useMemo(
        () => computeBarTotals(bars, xScale, yScale, layout, groupMode, totalsOffset, formatValue),
        [bars, xScale, yScale, layout, groupMode, totalsOffset, formatValue]
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
        legendsWithData,
        barTotals,
    }
}
