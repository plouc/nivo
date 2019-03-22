/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { timeFormat } from 'd3-time-format'
import { noop } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './constants'

const monthLabelFormat = timeFormat('%b')

export const CalendarPropTypes = {
    from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorScale: PropTypes.func.isRequired,

    direction: PropTypes.oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
    emptyColor: PropTypes.string.isRequired,

    yearLegend: PropTypes.func.isRequired,
    yearSpacing: PropTypes.number.isRequired,
    yearLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    yearLegendOffset: PropTypes.number.isRequired,

    monthLegend: PropTypes.func.isRequired,
    monthBorderWidth: PropTypes.number.isRequired,
    monthBorderColor: PropTypes.string.isRequired,
    monthLegendOffset: PropTypes.number.isRequired,

    daySpacing: PropTypes.number.isRequired,
    dayBorderWidth: PropTypes.number.isRequired,
    dayBorderColor: PropTypes.string.isRequired,

    isInteractive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    tooltip: PropTypes.func,

    legends: PropTypes.arrayOf(
        PropTypes.shape({
            ...LegendPropShape,
            itemCount: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export const CalendarDefaultProps = {
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],

    direction: DIRECTION_HORIZONTAL,
    emptyColor: '#fff',

    minValue: 0,
    maxValue: 'auto',

    yearLegend: year => year,
    yearSpacing: 30,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthLegend: (year, month, date) => monthLabelFormat(date),
    monthBorderWidth: 2,
    monthBorderColor: '#000',
    monthLegendOffset: 6,

    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#000',

    isInteractive: true,
    onClick: noop,

    legends: [],
}
