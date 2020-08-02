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
import { boxAlignments } from '@nivo/core'
import { LegendPropShape } from '@nivo/legends'
import CalendarTooltip from './CalendarTooltip'

const monthLabelFormat = timeFormat('%b')

const commonPropTypes = {
    from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    align: PropTypes.oneOf(boxAlignments).isRequired,

    minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
    maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,

    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorScale: PropTypes.func,

    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    emptyColor: PropTypes.string.isRequired,

    yearLegend: PropTypes.func.isRequired,
    yearSpacing: PropTypes.number.isRequired,
    yearLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    yearLegendOffset: PropTypes.number.isRequired,

    monthBorderWidth: PropTypes.number.isRequired,
    monthBorderColor: PropTypes.string.isRequired,
    monthLegend: PropTypes.func.isRequired,
    monthSpacing: PropTypes.number.isRequired,
    monthLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
    monthLegendOffset: PropTypes.number.isRequired,

    daySpacing: PropTypes.number.isRequired,
    dayBorderWidth: PropTypes.number.isRequired,
    dayBorderColor: PropTypes.string.isRequired,

    isInteractive: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    valueFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legendFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    legends: PropTypes.arrayOf(
        PropTypes.shape({
            ...LegendPropShape,
            itemCount: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export const CalendarPropTypes = commonPropTypes

export const CalendarCanvasPropTypes = {
    ...commonPropTypes,
    pixelRatio: PropTypes.number.isRequired,
}

const commonDefaultProps = {
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],

    align: 'center',
    direction: 'horizontal',
    emptyColor: '#fff',

    minValue: 0,
    maxValue: 'auto',

    yearSpacing: 30,
    yearLegend: year => year,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,

    monthBorderWidth: 2,
    monthBorderColor: '#000',
    monthSpacing: 0,
    monthLegend: (year, month, date) => monthLabelFormat(date),
    monthLegendPosition: 'before',
    monthLegendOffset: 10,

    weekdayLegend: d => d,
    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#000',

    isInteractive: true,

    legends: [],
    tooltip: CalendarTooltip,
}

export const CalendarDefaultProps = commonDefaultProps

export const CalendarCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio:
        global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1,
}
