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
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.any.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    pixelRatio: PropTypes.number.isRequired,

    // injected by enhancer
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    getColor: PropTypes.func,
    getBorderColor: PropTypes.func,

    /*
    useMesh: PropTypes.bool.isRequired,
    debugMesh: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
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
    borderWidth: 0,
    borderColor: 'inherit:darker(.3)',
    enableValueGrid: true,
    enableCategoricalGrid: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: false,
    isInteractive: true,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
    /*
    useMesh: false,
    debugMesh: false,
    enableStackTooltip: true,
    legends: [],
    */
}
