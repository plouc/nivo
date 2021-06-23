import { BarTooltip } from './BarTooltip'
import { ComputedDatum } from './types'
import { ScaleSpec, ScaleBandSpec } from '@nivo/scales'
import { InheritedColorConfig, OrdinalColorScaleConfig } from '@nivo/colors'
import { BarItem } from './BarItem'

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
    label: 'value',
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelLinkColor: 'theme',
    labelTextColor: 'theme',

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

    animate: true,
    motionStiffness: 90,
    motionDamping: 15,

    legends: [],

    annotations: [],
}

export const svgDefaultProps = {
    ...defaultProps,
    role: 'img',
}

export const canvasDefaultProps = {
    ...defaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
}
