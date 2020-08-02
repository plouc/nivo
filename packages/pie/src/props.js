/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop, radiansToDegrees } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'

export const arcPropType = PropTypes.shape({
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
    angleDeg: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
})

export const PiePropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    // layout
    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    fit: PropTypes.bool.isRequired,
    padAngle: PropTypes.number.isRequired,
    sortByValue: PropTypes.bool.isRequired,
    innerRadius: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,

    // radial labels
    enableRadialLabels: PropTypes.bool.isRequired,
    radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radialLabelsSkipAngle: PropTypes.number,
    radialLabelsTextXOffset: PropTypes.number,
    radialLabelsTextColor: inheritedColorPropType.isRequired,
    radialLabelsLinkOffset: PropTypes.number,
    radialLabelsLinkDiagonalLength: PropTypes.number,
    radialLabelsLinkHorizontalLength: PropTypes.number,
    radialLabelsLinkStrokeWidth: PropTypes.number,
    radialLabelsLinkColor: inheritedColorPropType.isRequired,

    // slices labels
    enableSlicesLabels: PropTypes.bool.isRequired,
    sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    slicesLabelsSkipAngle: PropTypes.number,
    slicesLabelsTextColor: inheritedColorPropType.isRequired,

    // styling
    colors: ordinalColorsPropType.isRequired,
    defs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    fill: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            match: PropTypes.oneOfType([PropTypes.oneOf(['*']), PropTypes.object, PropTypes.func])
                .isRequired,
        })
    ).isRequired,
    //boundDefs: PropTypes.array.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,

    // tooltip
    lockTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    // legends
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
    /*
    legendData: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            fill: PropTypes.string.isRequired,
        })
    ).isRequired,
    */
}

export const PieDefaultProps = {
    sortByValue: false,
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    // layout
    startAngle: 0,
    endAngle: radiansToDegrees(Math.PI * 2),
    fit: true,

    // border
    borderWidth: 0,
    borderColor: {
        from: 'color',
        modifiers: [['darker', 1]],
    },

    // radial labels
    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsTextColor: { theme: 'labels.text.fill' },
    radialLabelsLinkColor: { theme: 'axis.ticks.line.stroke' },

    // slices labels
    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsTextColor: { theme: 'labels.text.fill' },

    // styling
    colors: { scheme: 'nivo' },
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop,

    // tooltip
    lockTooltip: true,

    // legends
    legends: [],
}
