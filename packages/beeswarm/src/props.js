/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
// import { noop } from '@nivo/core'
import { axisPropType } from '@nivo/axes'
// import { LegendPropShape } from '@nivo/legends'
import { scalePropType } from '@nivo/scales'

export const BeeSwarmPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                        PropTypes.instanceOf(Date),
                    ]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            serieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.instanceOf(Date),
            ]).isRequired,
        })
    ).isRequired,
    scale: scalePropType.isRequired,
    layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'nodes']), PropTypes.func])
    ).isRequired,
    gap: PropTypes.number.isRequired,
    nodeSize: PropTypes.number.isRequired,
    nodePadding: PropTypes.number.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // injected by enhancer
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,

    /*
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
    */
}

export const BeeSwarmDefaultProps = {
    scale: {
        type: 'linear',
        min: 0,
        max: 'auto',
    },
    layout: 'horizontal',
    layers: ['grid', 'axes', 'nodes'],
    colors: 'nivo',
    colorBy: 'serieId',
    gap: 0,
    nodeSize: 6,
    nodePadding: 2,
    enableValueGrid: true,
    enableCategoricalGrid: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: false,

    /*
    isInteractive: true,
    useMesh: false,
    debugMesh: false,
    enableStackTooltip: true,
    onMouseEnter: noop,
    onMouseMove: noop,
    onMouseLeave: noop,
    onClick: noop,
    legends: [],
    */
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
