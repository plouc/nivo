/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop, motionPropTypes, blendModePropType } from '@nivo/core'
import { ordinalColorsPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'
import { LegendPropShape } from '@nivo/legends'
import { scalePropType } from '@nivo/scales'
import Node from './Node'
import Tooltip from './Tooltip'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                        PropTypes.instanceOf(Date),
                    ]).isRequired,
                    y: PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string,
                        PropTypes.instanceOf(Date),
                    ]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    xScale: scalePropType.isRequired,
    xFormat: PropTypes.any,
    yScale: scalePropType.isRequired,
    yFormat: PropTypes.any,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'nodes', 'markers', 'mesh', 'legends']),
            PropTypes.func,
        ])
    ).isRequired,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    nodeSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            values: PropTypes.arrayOf(PropTypes.number).isRequired,
            sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
        PropTypes.func,
    ]).isRequired,
    renderNode: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    colors: ordinalColorsPropType.isRequired,
    blendMode: blendModePropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    useMesh: PropTypes.bool.isRequired,
    debugMesh: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const ScatterPlotPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

export const ScatterPlotCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const commonDefaultProps = {
    xScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    yScale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },

    layers: ['grid', 'axes', 'nodes', 'markers', 'mesh', 'legends'],

    enableGridX: true,
    enableGridY: true,
    axisBottom: {},
    axisLeft: {},

    nodeSize: 9,
    renderNode: Node,

    colors: { scheme: 'nivo' },
    blendMode: 'normal',

    isInteractive: true,
    useMesh: false,
    debugMesh: false,

    tooltip: Tooltip,

    legends: [],
}

export const ScatterPlotDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}

export const ScatterPlotCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}

export const NodePropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    data: PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
            .isRequired,
        formattedX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
            .isRequired,
        formattedY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    style: PropTypes.shape({
        color: PropTypes.string.isRequired,
    }).isRequired,
})
