/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import _ from 'lodash'
import React, { Component } from 'react'
import Nivo from '../../../Nivo'
import SvgWrapper from '../SvgWrapper'
import CalendarLayout from '../../../lib/charts/calendar/CalendarLayout'
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps'
import StaticCalendar from './StaticCalendar'
import MotionCalendar from './MotionCalendar'

export default class Calendar extends Component {
    static propTypes = _.omit(calendarPropTypes, [
        'transitionDuration',
        'transitionEasing',
        'transitionStaggering',
    ])

    static defaultProps = _.omit(calendarDefaultProps, [
        'transitionDuration',
        'transitionEasing',
        'transitionStaggering',
    ])

    componentWillMount() {
        this.calendarLayout = CalendarLayout()
    }

    render() {
        const {
            from,
            to,
            data,
            onDayClick,
            direction,
            colorScale,
            emptyColor,
            yearSpacing,
            yearLegendOffset,
            daySpacing,
            dayBorderWidth,
            dayBorderColor,
            monthBorderWidth,
            monthBorderColor,
            monthLegendOffset,
            animate,
            motionStiffness,
            motionDamping,
        } = this.props

        const margin = Object.assign({}, Nivo.defaults.margin, this.props.margin)
        const width = this.props.width - margin.left - margin.right
        const height = this.props.height - margin.top - margin.bottom

        const { years, months, days } = this.calendarLayout.compute({
            width,
            height,
            from,
            to,
            data,
            direction,
            colorScale,
            emptyColor,
            yearSpacing,
            daySpacing,
        })

        let calendar
        if (animate === true) {
            calendar = (
                <MotionCalendar
                    onDayClick={onDayClick}
                    direction={direction}
                    years={years}
                    months={months}
                    days={days}
                    yearLegendOffset={yearLegendOffset}
                    dayBorderWidth={dayBorderWidth}
                    dayBorderColor={dayBorderColor}
                    monthBorderWidth={monthBorderWidth}
                    monthBorderColor={monthBorderColor}
                    monthLegendOffset={monthLegendOffset}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            )
        } else {
            calendar = (
                <StaticCalendar
                    onDayClick={onDayClick}
                    direction={direction}
                    years={years}
                    months={months}
                    days={days}
                    yearLegendOffset={yearLegendOffset}
                    dayBorderWidth={dayBorderWidth}
                    dayBorderColor={dayBorderColor}
                    monthBorderWidth={monthBorderWidth}
                    monthBorderColor={monthBorderColor}
                    monthLegendOffset={monthLegendOffset}
                />
            )
        }

        return (
            <SvgWrapper width={this.props.width} height={this.props.height} margin={margin}>
                {calendar}
            </SvgWrapper>
        )
    }
}
