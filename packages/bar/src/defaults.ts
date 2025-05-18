import { ScaleBandSpec, ScaleSpec } from '@nivo/scales'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import {
    BarCommonProps,
    BarDatum,
    ComputedDatum,
    BarSvgPropsWithDefaults,
    BarCanvasPropsWithDefaults,
} from './types'
import { BarItem } from './BarItem'
import { BarTooltip } from './BarTooltip'
import { renderBar } from './renderBar'

export const commonDefaultProps: Omit<BarCommonProps<BarDatum>, 'data' | 'theme'> = {
    indexBy: 'id',
    keys: ['value'],
    groupMode: 'stacked' as const,
    layout: 'vertical' as const,
    reverse: false,
    minValue: 'auto' as const,
    maxValue: 'auto' as const,
    valueScale: { type: 'linear', nice: true } as ScaleSpec,
    indexScale: { type: 'band', round: true } as ScaleBandSpec,
    padding: 0.1,
    innerPadding: 0,
    enableGridX: false,
    enableGridY: true,
    enableLabel: true,
    label: 'formattedValue',
    labelPosition: 'middle' as const,
    labelOffset: 0,
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelTextColor: { theme: 'labels.text.fill' },
    colorBy: 'id' as const,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' } as InheritedColorConfig<any>,
    isInteractive: true,
    tooltip: BarTooltip,
    tooltipLabel: (datum: ComputedDatum<BarDatum>) => `${datum.id} - ${datum.indexValue}`,
    legends: [],
    initialHiddenIds: [],
    annotations: [],
    enableTotals: false,
    totalsOffset: 10,
}

export const svgDefaultProps: Omit<
    BarSvgPropsWithDefaults<BarDatum>,
    'data' | 'width' | 'height' | 'theme'
> = {
    ...commonDefaultProps,
    layers: ['grid', 'axes', 'bars', 'totals', 'markers', 'legends', 'annotations'],
    axisTop: null,
    axisRight: null,
    axisBottom: {},
    axisLeft: {},
    barComponent: BarItem,
    defs: [],
    fill: [],
    markers: [],
    animate: true,
    animateOnMount: false,
    motionConfig: 'default',
    role: 'img',
    isFocusable: false,
}

export const canvasDefaultProps: Omit<
    BarCanvasPropsWithDefaults<BarDatum>,
    'data' | 'width' | 'height' | 'theme'
> = {
    ...commonDefaultProps,
    layers: ['grid', 'axes', 'bars', 'totals', 'legends', 'annotations'],
    axisTop: null,
    axisRight: null,
    axisBottom: {},
    axisLeft: {},
    renderBar,
    pixelRatio: typeof window !== 'undefined' ? (window.devicePixelRatio ?? 1) : 1,
}
