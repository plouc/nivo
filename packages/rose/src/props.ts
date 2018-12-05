/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as PropTypes from 'prop-types'
import { noop } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'

export const ArcPropType = PropTypes.shape({
    color: PropTypes.string.isRequired,
    startAngle: PropTypes.number.isRequired,
    midAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
})

export const RosePropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,

    angleStep: PropTypes.number.isRequired,
    angleScale: PropTypes.func.isRequired,

    innerRadius: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    radiusScale: PropTypes.func.isRequired,

    arcs: PropTypes.arrayOf(ArcPropType).isRequired,
    renderArc: PropTypes.func.isRequired,

    cornerRadius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['arcs', 'arcLabels']), PropTypes.func])
    ).isRequired,

    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    getColor: PropTypes.func.isRequired,

    enableArcLabel: PropTypes.bool.isRequired,
    renderArcLabel: PropTypes.func.isRequired,
    rotateArcLabel: PropTypes.bool.isRequired,

    isInteractive: PropTypes.bool.isRequired,

    onMouseEnter: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,

    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,

    pixelRatio: PropTypes.number.isRequired,
}

export const RoseDefaultProps = {
    maxValue: 'auto',

    layers: ['arcs', 'arcLabels'],

    innerRadius: 0,

    colors: 'nivo',
    colorBy: 'serieId',

    cornerRadius: 0,
    borderWidth: 0,

    renderArc: () => {},

    enableArcLabel: true,
    renderArcLabel: () => {},
    rotateArcLabel: true,

    isInteractive: true,
    enableStackTooltip: true,
    onMouseEnter: noop,
    onMouseMove: noop,
    onMouseLeave: noop,
    onClick: noop,

    legends: [],

    // pixelRatio:
    //    global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
