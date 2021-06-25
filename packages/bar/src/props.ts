import { BarItem } from './BarItem'
import { BarTooltip } from './BarTooltip'
import { ComputedDatum } from './types'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { ScaleBandSpec, ScaleSpec } from '@nivo/scales'

export const defaultProps = {
    indexBy: 'id',
    keys: ['value'],
    layers: ['grid', 'axes', 'bars', 'markers', 'legends', 'annotations'],

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

    barComponent: BarItem,

    enableLabel: true,
    label: 'formattedValue',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelLinkColor: 'theme',
    labelTextColor: { from: 'theme', theme: 'labels.text.fill' },

    colorBy: 'id' as const,
    colors: { scheme: 'nivo' } as OrdinalColorScaleConfig,
    defs: [],
    fill: [],
    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' } as InheritedColorConfig<any>,

    isInteractive: true,
    tooltip: BarTooltip,
    tooltipLabel: (datum: ComputedDatum<any>) => `${datum.id} - ${datum.indexValue}`,

    legends: [],

    annotations: [],
}

export const svgDefaultProps = {
    ...defaultProps,
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
}

export const canvasDefaultProps = {
    ...defaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
