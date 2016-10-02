/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import _                                           from 'lodash'
import React, { Component }                        from 'react'
import Nivo                                        from '../../../Nivo'
import CalendarLayout                              from '../../../lib/charts/calendar/CalendarLayout'
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps'
import StaticCalendar                              from './StaticCalendar'
import MotionCalendar                              from './MotionCalendar'


class Calendar extends Component {
    componentWillMount() {
        this.calendarLayout = CalendarLayout();
    }

    render() {
        const {
            from, to,
            data,
            onDayClick,
            direction,
            colorScale,
            emptyColor,
            yearSpacing, yearLegendOffset,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor, monthLegendOffset,
            motion, motionStiffness, motionDamping
        } = this.props;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);
        const width  = this.props.width  - margin.left - margin.right;
        const height = this.props.height - margin.top  - margin.bottom;

        const { years, months, days } = this.calendarLayout.compute({
            width, height,
            from, to,
            data,
            direction,
            colorScale,
            emptyColor,
            yearSpacing,
            daySpacing
        });

        let calendar;
        if (motion === true) {
            calendar = (
                <MotionCalendar
                    onDayClick={onDayClick}
                    direction={direction}
                    years={years} months={months} days={days}
                    yearLegendOffset={yearLegendOffset}
                    dayBorderWidth={dayBorderWidth} dayBorderColor={dayBorderColor}
                    monthBorderWidth={monthBorderWidth} monthBorderColor={monthBorderColor} monthLegendOffset={monthLegendOffset}
                    motionStiffness={motionStiffness} motionDamping={motionDamping}
                />
            );
        } else {
            calendar = (
                <StaticCalendar
                    onDayClick={onDayClick}
                    direction={direction}
                    years={years} months={months} days={days}
                    yearLegendOffset={yearLegendOffset}
                    dayBorderWidth={dayBorderWidth} dayBorderColor={dayBorderColor}
                    monthBorderWidth={monthBorderWidth} monthBorderColor={monthBorderColor} monthLegendOffset={monthLegendOffset}
                />
            );
        }

        return (
            <svg className="nivo_calendar" style={{ width: this.props.width, height: this.props.height }}>
                <g className="nivo_calendar_wrapper" transform={`translate(${margin.left},${margin.top})`}>
                    {calendar}
                </g>
            </svg>
        );
    }
}

Calendar.propTypes = _.omit(calendarPropTypes, [
    'transitionDuration',
    'transitionEasing',
    'transitionStaggering',
]);

Calendar.defaultProps = _.omit(calendarDefaultProps, [
    'transitionDuration',
    'transitionEasing',
    'transitionStaggering',
]);


export default Calendar;
