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
    BarIndex,
    BarIndexBy,
    BarBorderColor,
    BarLabel,
    BarColors,
    BarLabelTextColor,
} from './types'
import { commonDefaultProps } from './defaults'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { computeBarTotals } from './compute/totals'

export const useBar = <D extends BarDatum = BarDatum, I extends BarIndex = string>({
    indexBy = commonDefaultProps.indexBy as BarIndexBy<D, I>,
    keys = commonDefaultProps.keys,
    label = commonDefaultProps.label as BarLabel<D, I>,
    tooltipLabel = commonDefaultProps.tooltipLabel as BarLabel<D, I>,
    valueFormat,
    colors = commonDefaultProps.colors as BarColors<D, I>,
    colorBy = commonDefaultProps.colorBy,
    borderColor = commonDefaultProps.borderColor as BarBorderColor<D, I>,
    labelTextColor = commonDefaultProps.labelTextColor as BarLabelTextColor<D, I>,
    groupMode = commonDefaultProps.groupMode,
    layout = commonDefaultProps.layout,
    data,
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
        BarCommonProps<D, I>,
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
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelColor = useInheritedColor(labelTextColor, theme)

    const generateBars = groupMode === 'grouped' ? generateGroupedBars : generateStackedBars
    const { bars, xScale, yScale } = generateBars<D, I>({
        layout,
        data,
        getIndex,
        keys,
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
                .filter((bar): bar is ComputedBarDatumWithValue<D, I> => bar.data.value !== null)
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

    const reverse = valueScale.reverse ?? false

    const legendsWithData: [BarLegendProps, LegendData[]][] = useMemo(
        () =>
            legends.map(legend => {
                const data = getLegendData<D, I>({
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
        () =>
            computeBarTotals<D, I>(
                bars,
                xScale,
                yScale,
                layout,
                groupMode,
                totalsOffset,
                formatValue
            ),
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
