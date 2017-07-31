/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import d3 from 'd3'
import { TransitionMotion, spring } from 'react-motion'
import { DIRECTION_HORIZONTAL } from '../../../constants/directions'
import CalendarDay from './CalendarDay'
import CalendarMonthPath from './CalendarMonthPath'

const yearLegendStyles = ({
    years,
    direction,
    yearLegendOffset,
    stiffness,
    damping,
}) => {
    return years.map(year => {
        let rotation
        let x, y
        if (direction === DIRECTION_HORIZONTAL) {
            rotation = -90
            x = year.bbox.x - yearLegendOffset
            y = year.bbox.y + year.bbox.height / 2
        } else {
            rotation = 0
            x = year.bbox.x + year.bbox.width / 2
            y = year.bbox.y - yearLegendOffset
        }

        return {
            key: `${year.year}`,
            data: year,
            style: {
                rotation: spring(rotation, { stiffness, damping }),
                x: spring(x, { stiffness, damping }),
                y: spring(y, { stiffness, damping }),
            },
        }
    })
}

const monthLegendStyles = ({
    months,
    direction,
    monthLegendOffset,
    stiffness,
    damping,
}) => {
    return months.map(month => {
        let rotation
        let x, y
        if (direction === DIRECTION_HORIZONTAL) {
            rotation = 0
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y - monthLegendOffset
        } else {
            rotation = -90
            x = month.bbox.x - monthLegendOffset
            y = month.bbox.y + month.bbox.height / 2
        }

        return {
            key: month.date.toString(),
            data: month,
            style: {
                rotation: spring(rotation, { stiffness, damping }),
                x: spring(x, { stiffness, damping }),
                y: spring(y, { stiffness, damping }),
            },
        }
    })
}

const dayStyles = ({ days, stiffness, damping }) => {
    return days.map(day => {
        return {
            key: day.date.toString(),
            data: day,
            style: {
                x: spring(day.x, { stiffness, damping }),
                y: spring(day.y, { stiffness, damping }),
                size: spring(day.size, { stiffness, damping }),
            },
        }
    })
}

class MotionCalendar extends Component {
    render() {
        const {
            onDayClick,
            years,
            months,
            days,
            direction,
            yearLegendOffset,
            dayBorderWidth,
            dayBorderColor,
            monthBorderWidth,
            monthBorderColor,
            monthLegendOffset,
            motionStiffness,
            motionDamping,
        } = this.props

        const monthLegendFormat = d3.time.format('%b')

        const stiffness = motionStiffness
        const damping = motionDamping

        return (
            <g>
                <TransitionMotion
                    styles={dayStyles({ days, stiffness, damping })}
                >
                    {interpolatedStyles =>
                        <g>
                            {interpolatedStyles.map(d =>
                                <CalendarDay
                                    key={d.key}
                                    onClick={onDayClick}
                                    data={d.data}
                                    x={d.style.x}
                                    y={d.style.y}
                                    size={d.style.size}
                                    color={d.data.color}
                                    borderWidth={dayBorderWidth}
                                    borderColor={dayBorderColor}
                                />
                            )}
                        </g>}
                </TransitionMotion>
                <TransitionMotion
                    styles={monthLegendStyles({
                        months,
                        direction,
                        monthLegendOffset,
                        stiffness,
                        damping,
                    })}
                >
                    {interpolatedStyles =>
                        <g>
                            {interpolatedStyles.map(d =>
                                <text
                                    key={d.key}
                                    className="nivo_calendar_month_legend"
                                    transform={`translate(${d.style.x},${d.style
                                        .y}) rotate(${d.style.rotation})`}
                                    textAnchor="middle"
                                >
                                    {monthLegendFormat(d.data.date)}
                                </text>
                            )}
                        </g>}
                </TransitionMotion>
                <TransitionMotion
                    styles={yearLegendStyles({
                        years,
                        direction,
                        yearLegendOffset,
                        stiffness,
                        damping,
                    })}
                >
                    {interpolatedStyles =>
                        <g>
                            {interpolatedStyles.map(d =>
                                <text
                                    key={d.key}
                                    className="nivo_calendar_year_legend"
                                    transform={`translate(${d.style.x},${d.style
                                        .y}) rotate(${d.style.rotation})`}
                                    textAnchor="middle"
                                >
                                    {d.data.year}
                                </text>
                            )}
                        </g>}
                </TransitionMotion>
            </g>
        )
    }
}

MotionCalendar.propTypes = {}

export default MotionCalendar
