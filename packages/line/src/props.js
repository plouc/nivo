/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { lineCurvePropType, blendModePropType, motionPropTypes } from '@nivo/core'
import { ordinalColorsPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'
import { scalePropType } from '@nivo/scales'
import { LegendPropShape } from '@nivo/legends'
import LinePointTooltip from './LinePointTooltip'
import LineStackedTooltip from './LineStackedTooltip'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                        PropTypes.instanceOf(Date),
                    ]),
                    y: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                        PropTypes.instanceOf(Date),
                    ]),
                })
            ).isRequired,
        })
    ).isRequired,

    xScale: scalePropType.isRequired,
    yScale: scalePropType.isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf([
                'grid',
                'markers',
                'axes',
                'areas',
                'lines',
                'slices',
                'points',
                'mesh',
                'legends',
            ]),
            PropTypes.func,
        ])
    ).isRequired,

    curve: lineCurvePropType.isRequired,

    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    gridXValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    gridYValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),

    enablePoints: PropTypes.bool.isRequired,
    pointSymbol: PropTypes.func,
    pointSize: PropTypes.number.isRequired,
    pointColor: PropTypes.any.isRequired,
    pointBorderWidth: PropTypes.number.isRequired,
    pointBorderColor: PropTypes.any.isRequired,
    enablePointLabel: PropTypes.bool.isRequired,

    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    colors: ordinalColorsPropType.isRequired,
    enableArea: PropTypes.bool.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    areaBlendMode: blendModePropType.isRequired,
    areaBaselineValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
    lineWidth: PropTypes.number.isRequired,
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    isInteractive: PropTypes.bool.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    enableStackTooltip: PropTypes.bool.isRequired,
    stackTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    debugMesh: PropTypes.bool.isRequired,
}

export const LinePropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

export const LineCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    ...commonPropTypes,
}

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

    layers: ['grid', 'markers', 'axes', 'areas', 'lines', 'slices', 'points', 'mesh', 'legends'],
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

    colors: { scheme: 'nivo' },
    enableArea: false,
    areaBaselineValue: 0,
    areaOpacity: 0.2,
    areaBlendMode: 'normal',
    lineWidth: 2,

    defs: [],

    legends: [],

    isInteractive: true,
    tooltip: LinePointTooltip,
    enableStackTooltip: false,
    stackTooltip: LineStackedTooltip,
    debugMesh: false,
}

export const LineDefaultProps = {
    ...commonDefaultProps,
    useMesh: false,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}

export const LineCanvasDefaultProps = {
    ...commonDefaultProps,
    useMesh: true,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
