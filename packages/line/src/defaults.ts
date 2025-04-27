import {
    CommonLineProps,
    LineSvgPropsWithDefaults,
    LineCanvasPropsWithDefaults,
    DefaultSeries,
    LineLayerId,
} from './types'
import { PointTooltip } from './PointTooltip'
import { SliceTooltip } from './SliceTooltip'

export const commonDefaultProps: Omit<
    CommonLineProps<DefaultSeries>,
    | 'data'
    | 'xFormat'
    | 'yFormat'
    | 'layers'
    | 'width'
    | 'height'
    | 'margin'
    | 'theme'
    | 'pointSymbol'
    | 'gridXValues'
    | 'gridYValues'
    | 'axisTop'
    | 'axisRight'
    | 'onMouseEnter'
    | 'onMouseMove'
    | 'onMouseLeave'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onClick'
    | 'onDoubleClick'
    | 'onTouchStart'
    | 'onTouchMove'
    | 'onTouchEnd'
> & {
    layers: LineLayerId[]
} = {
    xScale: {
        type: 'point',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    curve: 'linear',
    colors: { scheme: 'nivo' },
    lineWidth: 2,
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
    enablePoints: true,
    pointSize: 6,
    pointColor: { from: 'color' },
    pointBorderWidth: 0,
    pointBorderColor: { theme: 'background' },
    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,
    enableGridX: true,
    enableGridY: true,
    legends: [],
    isInteractive: true,
    tooltip: PointTooltip,
    sliceTooltip: SliceTooltip,
    debugMesh: false,
    renderWrapper: true,
}

export const svgDefaultProps: Omit<
    LineSvgPropsWithDefaults<DefaultSeries>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    defs: [],
    fill: [],
    enablePointLabel: false,
    pointLabel: 'data.yFormatted',
    areaBlendMode: 'normal',
    axisBottom: {},
    axisLeft: {},
    useMesh: false,
    enableSlices: false,
    debugSlices: false,
    enableCrosshair: true,
    crosshairType: 'bottom-left',
    enableTouchCrosshair: false,
    initialHiddenIds: [],
    animate: true,
    motionConfig: 'gentle',
    role: 'img',
}

export const canvasDefaultProps: Omit<
    LineCanvasPropsWithDefaults<DefaultSeries>,
    'data' | 'width' | 'height' | 'margin' | 'theme'
> = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio ?? 1 : 1,
    axisBottom: {},
    axisLeft: {},
}
