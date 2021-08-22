import { BarItem } from './BarItem'
import { BarTooltip } from './BarTooltip'
import { ComputedDatum } from './types'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { ScaleBandSpec, ScaleSpec } from '@nivo/scales'

export const defaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked' as const,
    layout: 'vertical' as const,
    reverse: false,

    minValue: 'auto' as const,
    maxValue: 'auto' as const,

    valueScale: { type: 'linear' } as ScaleSpec,
    indexScale: { type: 'band', round: true } as ScaleBandSpec,

    padding: 0.1,
    innerPadding: 0,

    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    enableLabel: true,
    label: 'formattedValue',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelTextColor: { from: 'theme', theme: 'labels.text.fill' },

    colorBy: 'id' as const,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,

    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' } as InheritedColorConfig<any>,

    isInteractive: true,
    tooltip: BarTooltip,
    tooltipLabel: <RawDatum>(datum: ComputedDatum<RawDatum>) => `${datum.id} - ${datum.indexValue}`,

    legends: [],
    initialHiddenIds: [],
    annotations: [],
    markers: [],
}

export const svgDefaultProps = {
    ...defaultProps,
    layers: ['grid', 'axes', 'bars', 'markers', 'legends', 'annotations'],
    barComponent: BarItem,

    defs: [],
    fill: [],

    animate: true,
    motionConfig: 'default',

    role: 'img',
    isFocusable: false,
}

export const canvasDefaultProps = {
    ...defaultProps,
    layers: ['grid', 'axes', 'bars', 'legends', 'annotations'],

    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
