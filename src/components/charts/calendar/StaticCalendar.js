/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }     from 'react';
import d3                       from 'd3';
import { DIRECTION_HORIZONTAL } from '../../../constants/directions';
import CalendarDay              from './CalendarDay';
import CalendarMonthPath        from './CalendarMonthPath';


class StaticCalendar extends Component {
    render() {
        const {
            onDayClick,
            years, months, days,
            direction,
            yearLegendOffset,
            dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor, monthLegendOffset
        } = this.props;

        const monthLegendFormat = d3.time.format('%b');

        return (
            <g>
                {days.map(d => (
                    <CalendarDay
                        key={d.date.toString()}
                        onClick={onDayClick}
                        data={d}
                        x={d.x} y={d.y}
                        size={d.size}
                        color={d.color}
                        borderWidth={dayBorderWidth} borderColor={dayBorderColor}
                    />
                ))}
                {months.map(m => (
                    <CalendarMonthPath
                        key={m.date.toString()}
                        path={m.path}
                        borderWidth={monthBorderWidth} borderColor={monthBorderColor}
                    />
                ))}
                {months.map(month => {
                    let transform;
                    if (direction === DIRECTION_HORIZONTAL) {
                        transform = `translate(${month.bbox.x + month.bbox.width / 2},${month.bbox.y - monthLegendOffset})`;
                    } else {
                        transform =`translate(${month.bbox.x - monthLegendOffset},${month.bbox.y + month.bbox.height / 2}) rotate(-90)`;
                    }

                    return (
                        <text
                            key={`${month.date.toString()}.legend`}
                            className="nivo_calendar_month_legend"
                            transform={transform}
                            textAnchor="middle"
                        >
                            {monthLegendFormat(month.date)}
                        </text>
                    );
                })}
                {years.map(year => {
                    let transform;
                    if (direction === DIRECTION_HORIZONTAL) {
                        transform = `translate(${year.bbox.x - yearLegendOffset},${year.bbox.y + year.bbox.height / 2}) rotate(-90)`;
                    } else {
                        transform = `translate(${year.bbox.x + year.bbox.width / 2},${year.bbox.y - yearLegendOffset})`;
                    }

                    return (
                        <text
                            key={year.year}
                            className="nivo_calendar_year_legend"
                            transform={transform}
                            textAnchor="middle"
                        >
                            {year.year}
                        </text>
                    );
                })}
            </g>
        );
    }
}

StaticCalendar.propTypes = {};


export default StaticCalendar;
