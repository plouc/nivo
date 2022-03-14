import { DefaultLineDatum, LineCommonProps, LineLayerId } from './types'
import { SliceTooltip } from './SliceTooltip'
import { PointTooltip } from './PointTooltip'

export const commonDefaultProps: Omit<
    LineCommonProps<DefaultLineDatum>,
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
    layers: LineLayerId[]
} = {
    layers: [
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        'legends',
    ] as LineLayerId[],

    xScale: {
        type: 'point',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    enableGridX: false,
    enableGridY: false,

    curve: 'linear' as const,
    lineWidth: 2,
    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,
    areaBlendMode: 'normal' as const,

    enablePoints: true,
    pointSize: 6,
    pointColor: { from: 'color' },
    pointBorderWidth: 0,
    pointBorderColor: { theme: 'background' },
    enablePointLabel: false,
    pointLabel: 'yFormatted',

    colors: { scheme: 'nivo' },

    opacity: 1,
    activeOpacity: 1,
    inactiveOpacity: 0.15,
    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 0.8]] },

    enableLabels: true,
    label: 'formattedValue',

    legends: [],
    markers: [],
    annotations: [],

    isInteractive: true,
    debugMesh: false,
    enableSlices: false,
    debugSlices: false,
    sliceTooltip: SliceTooltip,
    enableCrosshair: true,
    crosshairType: 'bottom-left' as const,
    tooltip: PointTooltip,

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
    cellComponent: 'rect' as const,
    defs: [],
    fill: [],
    useMesh: false,
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    axisTop: {},
    axisRight: null,
    axisBottom: null,
    axisLeft: {},
    renderCell: 'rect' as const,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
