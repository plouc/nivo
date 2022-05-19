import { BoxPlotItem } from './BoxPlotItem'
import { BoxPlotTooltip, BoxPlotTooltipLabel } from './BoxPlotTooltip'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { ScaleBandSpec, ScaleLinearSpec } from '@nivo/scales'
import { ComputedBoxPlotSummary } from './types'

export const defaultProps = {
    value: 'value',
    groupBy: 'group',
    groups: null,
    subGroupBy: null,
    subGroups: null,

    quantiles: [0.1, 0.25, 0.5, 0.75, 0.9],

    layout: 'vertical' as const,

    minValue: 'auto' as const,
    maxValue: 'auto' as const,

    valueScale: { type: 'linear' } as ScaleLinearSpec,
    indexScale: { type: 'band', round: true } as ScaleBandSpec,

    padding: 0.1,
    innerPadding: 6,

    opacity: 1,
    activeOpacity: 1,
    inactiveOpacity: 0.25,

    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    valueFormat: (value: number) => value.toPrecision(4),

    colorBy: 'subGroup' as const,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,

    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' } as InheritedColorConfig<ComputedBoxPlotSummary>,

    medianWidth: 3,
    medianColor: {
        from: 'color',
        modifiers: [['darker', 2.0]],
    } as InheritedColorConfig<ComputedBoxPlotSummary>,

    whiskerWidth: 2,
    whiskerColor: {
        from: 'color',
    } as InheritedColorConfig<ComputedBoxPlotSummary>,
    whiskerEndSize: 0,

    isInteractive: true,
    tooltip: BoxPlotTooltip,
    tooltipLabel: BoxPlotTooltipLabel,

    legends: [],
    annotations: [],
    markers: [],
}

export const svgDefaultProps = {
    ...defaultProps,
    layers: ['grid', 'axes', 'boxPlots', 'markers', 'legends', 'annotations'],
    boxPlotComponent: BoxPlotItem,

    defs: [],
    fill: [],

    animate: true,
    motionConfig: 'default',

    role: 'img',
    isFocusable: false,
}
