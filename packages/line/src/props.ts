/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PointTooltip from './PointTooltip'
import SliceTooltip from './SliceTooltip'
import { LineCanvasProps, LineProps } from './hooks';

const commonDefaultProps = {
    curve: 'linear' as const,

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
    enableSlices: false as const,
    debugSlices: false,
    sliceTooltip: SliceTooltip,
    debugMesh: false,
    enableCrosshair: true,
    crosshairType: 'bottom-left',
}

export const LineDefaultProps: LineProps = {
    ...commonDefaultProps,
    enablePointLabel: false,
    useMesh: false,
    defs: [],
    fill: [],
}

export const LineCanvasDefaultProps: LineCanvasProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
