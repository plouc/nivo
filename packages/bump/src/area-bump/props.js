/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { motionPropTypes, blendModePropType } from '@nivo/core'
import { ordinalColorsPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'

const commonPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    align: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.oneOf(['grid', 'axes', 'labels', 'areas']),
            PropTypes.func,
        ])
    ).isRequired,

    interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    spacing: PropTypes.number.isRequired,
    xPadding: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    blendMode: blendModePropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    activeFillOpacity: PropTypes.number.isRequired,
    inactiveFillOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    activeBorderWidth: PropTypes.number.isRequired,
    inactiveBorderWidth: PropTypes.number.isRequired,
    borderOpacity: PropTypes.number.isRequired,
    activeBorderOpacity: PropTypes.number.isRequired,
    inactiveBorderOpacity: PropTypes.number.isRequired,

    startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    startLabelPadding: PropTypes.number.isRequired,
    endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    endLabelPadding: PropTypes.number.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisBottom: axisPropType,

    isInteractive: PropTypes.bool.isRequired,
}

export const AreaBumpPropTypes = {
    ...commonPropTypes,
    ...motionPropTypes,
}

const commonDefaultProps = {
    align: 'middle',

    layers: ['grid', 'axes', 'labels', 'areas'],

    interpolation: 'smooth',
    spacing: 0,
    xPadding: 0.5,

    colors: { scheme: 'nivo' },
    blendMode: 'normal',
    fillOpacity: .8,
    activeFillOpacity: 1,
    inactiveFillOpacity: .15,
    borderWidth: 1,
    activeBorderWidth: 1,
    inactiveBorderWidth: 0,
    borderOpacity: 1,
    activeBorderOpacity: 1,
    inactiveBorderOpacity: 0,

    startLabel: false,
    startLabelPadding: 16,
    startLabelTextColor: { from: 'color', modifiers: [['darker', 1.4]] },
    endLabel: 'id',
    endLabelPadding: 16,
    endLabelTextColor: { from: 'color', modifiers: [['darker', 1.4]] },

    enableGridX: true,
    axisTop: {},
    axisBottom: {},

    isInteractive: true,
}

export const AreaBumpDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
}
