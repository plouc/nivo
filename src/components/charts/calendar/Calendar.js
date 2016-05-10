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
import Nivo                                        from '../../../Nivo';
import CalendarLayout                              from '../../../lib/charts/calendar/CalendarLayout';
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps';


class Calendar extends Component {
    componentWillMount() {
        this.calendarLayout = CalendarLayout();
    }

    render() {
        const {
            direction,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor,
            motionStiffness, motionDamping
        } = this.props;

        const margin = _.assign({}, Nivo.defaults.margin, this.props.margin);
        const width  = this.props.width  - margin.left - margin.right;
        const height = this.props.height - margin.top  - margin.bottom;

        const { days, months } = this.calendarLayout.compute({
            width, height,
            direction,
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
