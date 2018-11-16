/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop } from '@nivo/core'
import { axisPropType } from '@nivo/axes'
import { LegendPropShape } from '@nivo/legends'
import { scalePropType } from '@nivo/scales'

export const ScatterPlotPropTypes = {
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
    yScale: scalePropType.isRequired,

    computedData: PropTypes.shape({
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,
    }).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'points', 'markers', 'mesh', 'legends']),
            PropTypes.func,
        ])
    ).isRequired,

    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    symbolSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]).isRequired,
    symbolShape: PropTypes.oneOfType([PropTypes.oneOf(['circle', 'square'])]).isRequired,

    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    getColor: PropTypes.func.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    useMesh: PropTypes.bool.isRequired,
    debugMesh: PropTypes.bool.isRequired,

    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    pixelRatio: PropTypes.number.isRequired,
}

export const ScatterPlotDefaultProps = {
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

    layers: ['grid', 'axes', 'points', 'markers', 'mesh', 'legends'],

    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    symbolSize: 6,
    symbolShape: 'circle',

    colors: 'nivo',
    colorBy: 'serie.id',

    isInteractive: true,
    useMesh: false,
    debugMesh: false,
    enableStackTooltip: true,
    onMouseEnter: noop,
    onMouseMove: noop,
    onMouseLeave: noop,
    onClick: noop,

    legends: [],

    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
