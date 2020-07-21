/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { motionPropTypes } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'
import LineTooltip from './LineTooltip'
import Point from './Point'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                })
            ).isRequired,
        })
    ).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'labels', 'lines', 'points']),
            PropTypes.func,
        ])
    ).isRequired,

    interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    xPadding: PropTypes.number.isRequired,
    xOuterPadding: PropTypes.number.isRequired,
    yOuterPadding: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activeLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactiveLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactiveOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

    startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    startLabelPadding: PropTypes.number.isRequired,
    startLabelTextColor: inheritedColorPropType.isRequired,
    endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    endLabelPadding: PropTypes.number.isRequired,
    endLabelTextColor: inheritedColorPropType.isRequired,

    pointComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    pointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactivePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    pointColor: inheritedColorPropType.isRequired,
    pointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activePointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactivePointBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    pointBorderColor: inheritedColorPropType.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
}

export const BumpPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

const commonDefaultProps = {
    layers: ['grid', 'axes', 'labels', 'lines', 'points'],

    interpolation: 'smooth',
    xPadding: 0.6,
    xOuterPadding: 0.5,
    yOuterPadding: 0.5,

    colors: { scheme: 'nivo' },
    lineWidth: 2,
    activeLineWidth: 4,
    inactiveLineWidth: 1,
    opacity: 1,
    activeOpacity: 1,
    inactiveOpacity: 0.3,

    startLabel: false,
    startLabelPadding: 16,
    startLabelTextColor: { from: 'color' },
    endLabel: 'id',
    endLabelPadding: 16,
    endLabelTextColor: { from: 'color' },

    pointSize: 6,
    activePointSize: 8,
    inactivePointSize: 4,
    pointColor: { from: 'serie.color' },
    pointBorderWidth: 0,
    activePointBorderWidth: 0,
    inactivePointBorderWidth: 0,
    pointBorderColor: { from: 'serie.color', modifiers: [['darker', 1.4]] },

    enableGridX: true,
    enableGridY: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},

    isInteractive: true,
    tooltip: LineTooltip,
}

export const BumpDefaultProps = {
    ...commonDefaultProps,
    pointComponent: Point,
    animate: true,
    motionConfig: 'gentle',
}
