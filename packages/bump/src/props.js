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
import { ordinalColorsPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    xOuterPadding: PropTypes.number.isRequired,
    yOuterPadding: PropTypes.number.isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'labels', 'lines', 'points']),
            PropTypes.func,
        ])
    ).isRequired,

    lineInterpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    lineCurvaturePadding: PropTypes.number.isRequired,
    lineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    lineOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activeLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activeLineOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactiveLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactiveLineOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,

    startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    startLabelPadding: PropTypes.number.isRequired,
    endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    endLabelPadding: PropTypes.number.isRequired,

    pointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    activePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    inactivePointSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    pointColor: PropTypes.any.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisRight: axisPropType,
    axisBottom: axisPropType,
    axisLeft: axisPropType,

    colors: ordinalColorsPropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
}

export const BumpPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

const commonDefaultProps = {
    xOuterPadding: 0.5,
    yOuterPadding: 0.5,

    layers: ['grid', 'axes', 'labels', 'lines', 'points'],

    lineInterpolation: 'smooth',
    lineCurvaturePadding: 0.25,
    lineWidth: 2,
    lineOpacity: 1,
    activeLineWidth: 4,
    activeLineOpacity: 1,
    inactiveLineWidth: 1,
    inactiveLineOpacity: 0.3,

    startLabel: false,
    startLabelPadding: 16,
    startLabelTextColor: { from: 'color' },
    endLabel: 'id',
    endLabelPadding: 16,
    endLabelTextColor: { from: 'color' },

    pointSize: 6,
    pointColor: { from: 'serie.color' },

    enableGridX: true,
    enableGridY: true,
    axisTop: {},
    axisBottom: {},
    axisLeft: {},

    colors: { scheme: 'nivo' },

    isInteractive: true,
}

export const BumpDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}
