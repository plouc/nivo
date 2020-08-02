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
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { axisPropType } from '@nivo/axes'
import AreaTooltip from './AreaTooltip'

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
        PropTypes.oneOfType([PropTypes.oneOf(['grid', 'axes', 'labels', 'areas']), PropTypes.func])
    ).isRequired,

    interpolation: PropTypes.oneOf(['linear', 'smooth']).isRequired,
    spacing: PropTypes.number.isRequired,
    xPadding: PropTypes.number.isRequired,

    colors: ordinalColorsPropType.isRequired,
    blendMode: blendModePropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,
    activeFillOpacity: PropTypes.number.isRequired,
    inactiveFillOpacity: PropTypes.number.isRequired,
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
    borderWidth: PropTypes.number.isRequired,
    activeBorderWidth: PropTypes.number.isRequired,
    inactiveBorderWidth: PropTypes.number.isRequired,
    borderColor: inheritedColorPropType.isRequired,
    borderOpacity: PropTypes.number.isRequired,
    activeBorderOpacity: PropTypes.number.isRequired,
    inactiveBorderOpacity: PropTypes.number.isRequired,

    startLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    startLabelPadding: PropTypes.number.isRequired,
    startLabelTextColor: inheritedColorPropType.isRequired,
    endLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    endLabelPadding: PropTypes.number.isRequired,
    endLabelTextColor: inheritedColorPropType.isRequired,

    enableGridX: PropTypes.bool.isRequired,
    axisTop: axisPropType,
    axisBottom: axisPropType,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
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
    xPadding: 0.6,

    colors: { scheme: 'nivo' },
    blendMode: 'normal',
    fillOpacity: 0.8,
    activeFillOpacity: 1,
    inactiveFillOpacity: 0.15,
    defs: [],
    fill: [],
    borderWidth: 1,
    activeBorderWidth: 1,
    inactiveBorderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 0.4]] },
    borderOpacity: 1,
    activeBorderOpacity: 1,
    inactiveBorderOpacity: 0,

    startLabel: false,
    startLabelPadding: 12,
    startLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },
    endLabel: 'id',
    endLabelPadding: 12,
    endLabelTextColor: { from: 'color', modifiers: [['darker', 1]] },

    enableGridX: true,
    axisTop: {},
    axisBottom: {},

    isInteractive: true,
    tooltip: AreaTooltip,
}

export const AreaBumpDefaultProps = {
    ...commonDefaultProps,
    animate: true,
    motionConfig: 'gentle',
}
