import { PointTooltip } from './PointTooltip'
import { SliceTooltip } from './SliceTooltip'

export const commonDefaultProps = {
    xScale: {
        type: 'point',
    } as const,
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    } as const,

    colors: { scheme: 'nivo' } as const,

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
    ] as const,

    curve: 'linear' as const,
    lineWidth: 2,

    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    legends: [],
    markers: [],

    enablePoints: true,
    pointSize: 6,
    pointColor: { from: 'color' },
    pointBorderWidth: 0,
    pointBorderColor: { theme: 'background' },

    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,

    isInteractive: true,
    tooltip: PointTooltip,
    enableSlices: false as const,
    debugSlices: false,
    sliceTooltip: SliceTooltip,
    debugMesh: false,
    enableCrosshair: true,
    crosshairType: 'bottom-left' as const,

    renderWrapper: true,
}

export const svgDefaultProps = {
    ...commonDefaultProps,
    enablePointLabel: false,
    pointLabel: 'yFormatted',
    areaBlendMode: 'normal' as const,
    animate: true,
    motionConfig: 'default',
    defs: [],
    fill: [],
    useMesh: false,
    role: 'img',
}

export const canvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
}
