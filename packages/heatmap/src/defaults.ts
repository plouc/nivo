import { DefaultHeatMapDatum, HeatMapCommonProps, LayerId } from './types'
import { HeatMapTooltip } from './HeatMapTooltip'

export const commonDefaultProps: Omit<
    HeatMapCommonProps<DefaultHeatMapDatum>,
    | 'margin'
    | 'theme'
    | 'onClick'
    | 'renderWrapper'
    | 'role'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'ariaDescribedBy'
> & {
    layers: LayerId[]
} = {
    layers: ['grid', 'axes', 'cells', 'legends'],

    minValue: 'auto',
    maxValue: 'auto',

    forceSquare: false,
    xInnerPadding: 0,
    xOuterPadding: 0,
    yInnerPadding: 0,
    yOuterPadding: 0,
    sizeVariation: 0,

    opacity: 0.85,
    activeOpacity: 1,
    inactiveOpacity: 0.35,
    borderWidth: 0,
    borderColor: { from: 'color' },

    enableGridX: false,
    enableGridY: false,
    axisTop: {},
    axisRight: null,
    axisBottom: null,
    axisLeft: {},

    enableLabels: true,
    label: 'formattedValue',
    labelTextColor: { from: 'color', modifiers: [['darker', 1.4]] },

    colors: {
        type: 'sequential',
        scheme: 'brown_blueGreen',
    },
    nanColor: '#000000',

    legends: [],

    isInteractive: true,
    hoverTarget: 'rowColumn',
    tooltip: HeatMapTooltip,

    animate: true,
    motionConfig: 'gentle' as const,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    borderRadius: 0,
    cellComponent: 'rect',
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    renderCell: 'rect',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
