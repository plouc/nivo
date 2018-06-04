/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { noop } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './constants'

/**
 * Calendar components propTypes.
 *
 * @type {object}
 */
export const CalendarPropTypes = {
    from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    domain: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.arrayOf(PropTypes.number)])
        .isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorScale: PropTypes.func.isRequired,

    direction: PropTypes.oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
    emptyColor: PropTypes.string.isRequired,

    // years
    yearSpacing: PropTypes.number.isRequired,
    yearLegendOffset: PropTypes.number.isRequired,

    // months
    monthBorderWidth: PropTypes.number.isRequired,
    monthBorderColor: PropTypes.string.isRequired,
    monthLegendOffset: PropTypes.number.isRequired,

    // days
    daySpacing: PropTypes.number.isRequired,
    dayBorderWidth: PropTypes.number.isRequired,
    dayBorderColor: PropTypes.string.isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    legends: PropTypes.arrayOf(
        PropTypes.shape({
            ...LegendPropShape,
            itemCount: PropTypes.number.isRequired,
        })
    ).isRequired,
}

/**
 * Calendar components defaultProps.
 *
 * @type {object}
 */
export const CalendarDefaultProps = {
    domain: 'auto',
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],

    direction: DIRECTION_HORIZONTAL,
    emptyColor: '#fff',

    // years
    yearSpacing: 30,
    yearLegendOffset: 10,

    // months
    monthBorderWidth: 2,
    monthBorderColor: '#000',
    monthLegendOffset: 6,

    // days
    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#000',

    // interactivity
    isInteractive: true,
    onClick: noop,

    legends: [],
}
