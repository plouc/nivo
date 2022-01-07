import { DefaultHeatMapDatum, HeatMapCommonProps, LayerId } from './types'
import { HeatMapTooltip } from './HeatMapTooltip'

export const commonDefaultProps: Omit<
    HeatMapCommonProps<DefaultHeatMapDatum>,
    | 'margin'
    | 'theme'
    | 'valueFormat'
    | 'onClick'
    | 'renderWrapper'
    | 'role'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    layers: LayerId[]
} = {
    layers: ['grid', 'axes', 'cells', 'legends', 'annotations'],

    minValue: 'auto',
    maxValue: 'auto',

    forceSquare: false,
    xInnerPadding: 0,
    xOuterPadding: 0,
    yInnerPadding: 0,
    yOuterPadding: 0,
    sizeVariation: 0,

    opacity: 1,
    activeOpacity: 1,
    inactiveOpacity: 0.15,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 0.8]] },

    enableGridX: false,
    enableGridY: false,

    enableLabels: true,
    label: 'formattedValue',
    labelTextColor: { from: 'color', modifiers: [['darker', 2]] },

    colors: {
        type: 'sequential',
        scheme: 'brown_blueGreen',
    },
    emptyColor: '#000000',

    legends: [],
    annotations: [],

    isInteractive: true,
    hoverTarget: 'rowColumn',
    tooltip: HeatMapTooltip,

    animate: true,
    motionConfig: 'gentle' as const,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    axisTop: {},
    axisRight: null,
    axisBottom: null,
    axisLeft: {},
    borderRadius: 0,
    cellComponent: 'rect',
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    axisTop: {},
    axisRight: null,
    axisBottom: null,
    axisLeft: {},
    renderCell: 'rect',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
