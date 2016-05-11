/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component }                        from 'react';
import { TransitionMotion, spring }                from 'react-motion';
import d3                                          from 'd3';
import Nivo                                        from '../../../Nivo';
import { DIRECTION_HORIZONTAL }                    from '../../../constants/directions';
import CalendarLayout                              from '../../../lib/charts/calendar/CalendarLayout';
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps';
import CalendarDay                                 from './CalendarDay';
import CalendarMonthPath                           from './CalendarMonthPath';


class Calendar extends Component {
    componentWillMount() {
        this.calendarLayout = CalendarLayout();
    }

    render() {
        const {
            from, to,
            direction,
            yearSpacing, yearLegendOffset,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor, monthLegendOffset,
            motionStiffness, motionDamping
        } = this.props;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);
        const width  = this.props.width  - margin.left - margin.right;
        const height = this.props.height - margin.top  - margin.bottom;

        const { years, months, days } = this.calendarLayout.compute({
            width, height,
            from, to,
            direction,
            yearSpacing,
            daySpacing
        });

        const defaultStyles = days.map(d => {
            return {
                key:   d.date.toString(),
                data:  d,
                style: {
                    size: d.size,
                    x:    0,
                    y:    0,
                }
            };
        });

        const stiffness = motionStiffness;
        const damping   = motionDamping;


        /*
         yearLegends.enter()
         .append('text')
         .text(d => d)
         .classed('nivo_calendar_year_legend', true)
         .attr('text-anchor', 'middle')
         .attr('transform', (d, i) => {
         let x = 0;
         let y = 0;

         if (direction === DIRECTION_HORIZONTAL) {
         x = -yearLegendOffset;
         y = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
         } else {
         x = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
         y = -yearLegendOffset;
         }

         return `translate(${x},${y}) rotate(${yearLabelRotation})`;
         })
         ;
         */

        const monthLegendFormat = d3.time.format('%b');


        return (
            <svg className="nivo_calendar" style={{ width: this.props.width, height: this.props.height }}>
                <g className="nivo_calendar_wrapper" transform={`translate(${margin.left},${margin.top})`}>
                    {days.map(d => (
                        <CalendarDay
                            key={d.date.toString()}
                            x={d.x} y={d.y}
                            size={d.size}
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
            </svg>
        );

        /*
        return (
            <svg className="nivo_calendar" style={{ width: this.props.width, height: this.props.height }}>
                <g className="nivo_calendar_wrapper" transform={`translate(${margin.left},${margin.top})`}>
                    <TransitionMotion
                        defaultStyles={defaultStyles}
                        styles={days.map(d => {
                            return {
                                key:   d.date.toString(),
                                data:  d,
                                style: {
                                    size: spring(d.size, { stiffness, damping }),
                                    x:    spring(d.x, { stiffness, damping }),
                                    y:    spring(d.y, { stiffness, damping }),
                                }
                            };
                        })}
                    >
                        {interpolatedStyles => (
                            <g>
                                {interpolatedStyles.map(d => (
                                    <rect
                                        key={d.key}
                                        x={d.style.x}
                                        y={d.style.y}
                                        width={d.style.size}
                                        height={d.style.size}
                                        style={{
                                            fill:        'rgba(0, 0, 0, .15)',
                                            stroke:      dayBorderColor,
                                            strokeWidth: dayBorderWidth,
                                        }}
                                    />
                                ))}
                            </g>
                        )}
                    </TransitionMotion>
                </g>
            </svg>
        );
        */
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
