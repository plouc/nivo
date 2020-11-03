/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { radiansToDegrees } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'

export const datumWithArcPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired,
    formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    arc: PropTypes.shape({
        startAngle: PropTypes.number.isRequired,
        endAngle: PropTypes.number.isRequired,
        angle: PropTypes.number.isRequired,
        angleDeg: PropTypes.number.isRequired,
    }).isRequired,
})

export const PiePropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    valueFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['slices', 'radialLabels', 'sliceLabels', 'legends']),
            PropTypes.func,
        ])
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
    radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    radialLabelsSkipAngle: PropTypes.number.isRequired,
    radialLabelsTextXOffset: PropTypes.number.isRequired,
    radialLabelsTextColor: inheritedColorPropType.isRequired,
    radialLabelsLinkOffset: PropTypes.number.isRequired,
    radialLabelsLinkDiagonalLength: PropTypes.number.isRequired,
    radialLabelsLinkHorizontalLength: PropTypes.number.isRequired,
    radialLabelsLinkStrokeWidth: PropTypes.number.isRequired,
    radialLabelsLinkColor: inheritedColorPropType.isRequired,

    // slices labels
    enableSliceLabels: PropTypes.bool.isRequired,
    sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    sliceLabelsSkipAngle: PropTypes.number.isRequired,
    sliceLabelsRadiusOffset: PropTypes.number.isRequired,
    sliceLabelsTextColor: inheritedColorPropType.isRequired,

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

    // interactivity
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,

    // tooltip
    lockTooltip: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    // legends
    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const PieSvgPropTypes = {
    ...PiePropTypes,
    role: PropTypes.string.isRequired,
}

export const PieDefaultProps = {
    id: 'id',
    value: 'value',
    sortByValue: false,
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    layers: ['slices', 'radialLabels', 'sliceLabels', 'legends'],

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
    radialLabel: 'id',
    enableRadialLabels: true,
    radialLabelsSkipAngle: 0,
    radialLabelsLinkOffset: 0,
    radialLabelsLinkDiagonalLength: 16,
    radialLabelsLinkHorizontalLength: 24,
    radialLabelsLinkStrokeWidth: 1,
    radialLabelsTextXOffset: 6,
    radialLabelsTextColor: { theme: 'labels.text.fill' },
    radialLabelsLinkColor: { theme: 'axis.ticks.line.stroke' },

    // slices labels
    enableSliceLabels: true,
    sliceLabel: 'formattedValue',
    sliceLabelsSkipAngle: 0,
    sliceLabelsRadiusOffset: 0.5,
    sliceLabelsTextColor: { theme: 'labels.text.fill' },

    // styling
    colors: { scheme: 'nivo' },
    defs: [],
    fill: [],

    // interactivity
    isInteractive: true,

    // tooltip
    lockTooltip: true,

    // legends
    legends: [],
}

export const PieSvgDefaultProps = {
    ...PieDefaultProps,
    role: 'img',
}
