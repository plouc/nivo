import {
    BarCommonProps,
    ComputedDatum,
    BarSvgPropsWithDefaults,
    BarCanvasPropsWithDefaults,
} from './types'
import { BarItem } from './BarItem'
import { BarTooltip } from './BarTooltip'
import { renderBar } from './renderBar'

export const commonDefaultProps: Omit<BarCommonProps, 'data' | 'theme'> = {
    indexBy: 'id',
    keys: ['value'],
    groupMode: 'stacked',
    layout: 'vertical',
    valueScale: { type: 'linear', nice: true, round: false },
    indexScale: { type: 'band', round: false },
    padding: 0.1,
    innerPadding: 0,
    enableGridX: false,
    enableGridY: true,
    enableLabel: true,
    label: 'formattedValue',
    labelPosition: 'middle',
    labelOffset: 0,
    labelSkipWidth: 0,
    labelSkipHeight: 0,
    labelTextColor: { theme: 'labels.text.fill' },
    colorBy: 'id',
    colors: { scheme: 'nivo' },
    borderRadius: 0,
    borderWidth: 0,
    borderColor: { from: 'color' },
    isInteractive: true,
    tooltip: BarTooltip,
    tooltipLabel: (datum: ComputedDatum) => `${datum.id} - ${datum.indexValue}`,
    legends: [],
    initialHiddenIds: [],
    annotations: [],
    enableTotals: true,
    totalsOffset: 10,
}

export const svgDefaultProps: Omit<BarSvgPropsWithDefaults, 'data' | 'width' | 'height' | 'theme'> =
    {
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
    BarCanvasPropsWithDefaults,
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
