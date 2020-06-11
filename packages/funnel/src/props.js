/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { motionPropTypes } from '@nivo/core'

export const FunnelPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.number.isRequired,
            label: PropTypes.string,
        })
    ).isRequired,

    layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['parts']), PropTypes.func]))
        .isRequired,

    direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    spacing: PropTypes.number.isRequired,
    shapeContinuity: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    borderOpacity: PropTypes.number.isRequired,

    enableBeforeSeparators: PropTypes.bool.isRequired,
    beforeSeparatorsLength: PropTypes.number.isRequired,
    beforeSeparatorsOffset: PropTypes.number.isRequired,
    enableAfterSeparators: PropTypes.bool.isRequired,
    afterSeparatorsLength: PropTypes.number.isRequired,
    afterSeparatorsOffset: PropTypes.number.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    ...motionPropTypes,
}

export const FunnelDefaultProps = {
    layers: ['parts'],

    direction: 'vertical',
    interpolation: 'smooth',
    spacing: 0,
    shapeContinuity: 0.66,

    colors: { scheme: 'nivo' },
    fillOpacity: 1,

    borderWidth: 6,
    borderColor: { from: 'color' },
    borderOpacity: 0.66,

    enableBeforeSeparators: true,
    beforeSeparatorsLength: 0,
    beforeSeparatorsOffset: 0,
    enableAfterSeparators: true,
    afterSeparatorsLength: 0,
    afterSeparatorsOffset: 0,

    isInteractive: true,


    animate: true,
    motionDamping: 13,
    motionStiffness: 90,
}
