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
import { ResponsiveLineCanvasProps } from './ResponsiveLineCanvas';
import { ResponsiveLineProps } from './ResponsiveLine';

const commonDefaultProps = {
    curve: 'linear' as const,

    xScale: {
        type: 'point' as const,
    },
    yScale: {
        type: 'linear' as const,
        min: 0,
        max: 'auto' as const,
    },

    layers: [
        'grid' as const,
        'markers' as const,
        'axes' as const,
        'areas' as const,
        'crosshair' as const,
        'lines' as const,
        'points' as const,
        'slices' as const,
        'mesh' as const,
        'legends' as const,
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

    colors: { scheme: 'nivo' as const },
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
    crosshairType: 'bottom-left' as const,
}

export const LineDefaultProps: Omit<ResponsiveLineProps, 'data'> = {
    ...commonDefaultProps,
    enablePointLabel: false,
    useMesh: false,
    defs: [],
    fill: [],
}

export const LineCanvasDefaultProps: Omit<ResponsiveLineCanvasProps, 'data'> = {
    ...commonDefaultProps,
    pixelRatio:
        typeof window !== 'undefined' && window.devicePixelRatio ? window.devicePixelRatio : 1,
}
