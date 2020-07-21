/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { areaCurvePropType, stackOrderPropType, stackOffsetPropType } from '@nivo/core'
import { ordinalColorsPropType, inheritedColorPropType } from '@nivo/colors'
import { LegendPropShape } from '@nivo/legends'
import StreamDotsItem from './StreamDotsItem'

export const StreamPropTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.array.isRequired,
    order: stackOrderPropType.isRequired,
    offsetType: stackOffsetPropType.isRequired,
    curve: areaCurvePropType.isRequired,

    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    colors: ordinalColorsPropType.isRequired,
    fillOpacity: PropTypes.number.isRequired,
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
    borderColor: inheritedColorPropType.isRequired,

    enableDots: PropTypes.bool.isRequired,
    dotComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    dotPosition: PropTypes.oneOf(['start', 'center', 'end']).isRequired,
    dotSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    dotColor: inheritedColorPropType.isRequired,
    dotBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    dotBorderColor: inheritedColorPropType.isRequired,

    isInteractive: PropTypes.bool,
    tooltipLabel: PropTypes.func,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    enableStackTooltip: PropTypes.bool.isRequired,

    legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired,
}

export const StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    borderWidth: 0,
    borderColor: { from: 'color', modifiers: [['darker', 1]] },

    colors: { scheme: 'nivo' },
    fillOpacity: 1,
    defs: [],
    fill: [],

    enableDots: false,
    dotPosition: 'center',
    dotComponent: StreamDotsItem,
    dotSize: 6,
    dotColor: { from: 'color' },
    dotBorderWidth: 0,
    dotBorderColor: { from: 'color' },

    isInteractive: true,

    enableStackTooltip: true,

    legends: [],

    animate: true,
    motionConfig: 'gentle',
}
