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

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['separators', 'parts', 'labels']), PropTypes.func])
    ).isRequired,

    direction: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    spacing: PropTypes.number.isRequired,
    shapeBlending: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    borderOpacity: PropTypes.number.isRequired,

    enableLabel: PropTypes.bool.isRequired,
    labelColor: inheritedColorPropType.isRequired,

    enableBeforeSeparators: PropTypes.bool.isRequired,
    beforeSeparatorLength: PropTypes.number.isRequired,
    beforeSeparatorOffset: PropTypes.number.isRequired,
    enableAfterSeparators: PropTypes.bool.isRequired,
    afterSeparatorLength: PropTypes.number.isRequired,
    afterSeparatorOffset: PropTypes.number.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    currentPartSizeExtension: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,

    ...motionPropTypes,
}

export const FunnelDefaultProps = {
    layers: ['separators', 'parts', 'labels'],

    direction: 'vertical',
    interpolation: 'smooth',
    spacing: 0,
    shapeBlending: 0.66,

    colors: { scheme: 'nivo' },
    fillOpacity: 1,

    borderWidth: 6,
    borderColor: { from: 'color' },
    borderOpacity: 0.66,

    enableLabel: true,
    labelColor: { from: 'color', modifiers: [['darker', 2]] },

    enableBeforeSeparators: true,
    beforeSeparatorLength: 0,
    beforeSeparatorOffset: 0,
    enableAfterSeparators: true,
    afterSeparatorLength: 0,
    afterSeparatorOffset: 0,

    isInteractive: true,
    currentPartSizeExtension: 0,

    animate: true,
    motionDamping: 13,
    motionStiffness: 90,
}
