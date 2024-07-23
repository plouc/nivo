import PointTooltip from './PointTooltip'
import SliceTooltip from './SliceTooltip'

const commonDefaultProps = {
    curve: 'linear',

    xScale: {
        type: 'point',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

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
    ],
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    enablePoints: true,
    pointSize: 6,
    pointColor: { from: 'color' },
    pointBorderWidth: 0,
    pointBorderColor: { theme: 'background' },
    enablePointLabel: false,
    pointLabel: 'yFormatted',

    colors: { scheme: 'nivo' },
    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,
    areaBlendMode: 'normal',
    lineWidth: 2,

    legends: [],

    isInteractive: true,
    tooltip: PointTooltip,
    enableSlices: false,
    debugSlices: false,
    sliceTooltip: SliceTooltip,
    debugMesh: false,
    enableCrosshair: true,
    crosshairType: 'bottom-left',
}

export const LineDefaultProps = {
    ...commonDefaultProps,
    enablePointLabel: false,
    useMesh: false,
    enableTouchCrosshair: false,
    animate: true,
    motionConfig: 'gentle',
    defs: [],
    fill: [],
    role: 'img',
    initialHiddenIds: [],
}

export const LineCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
