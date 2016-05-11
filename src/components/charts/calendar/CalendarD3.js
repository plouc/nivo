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
import { findDOMNode }                             from 'react-dom';
import d3                                          from 'd3';
import _                                           from 'lodash';
import Nivo                                        from '../../../Nivo';
import CalendarLayout                              from '../../../lib/charts/calendar/CalendarLayout';
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps';
import { DIRECTION_HORIZONTAL }                    from '../../../constants/directions';


const color = d3.scale.category20b();

class CalendarD3 extends Component {
    constructor(props) {
        super(props);
    }

    renderD3(props) {
        const {
            from, to,
            direction,
            yearSpacing,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor,
            transitionDuration, transitionEasing, transitionStaggering
        } = props;

        const element = d3.select(findDOMNode(this));
        const wrapper = element.select('.nivo_calendar_wrapper');

        const margin = _.assign({}, Nivo.defaults.margin, props.margin);
        const width  = props.width  - margin.left - margin.right;
        const height = props.height - margin.top  - margin.bottom;

        element.select('.debug')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr({ width, height })
        ;


        element.attr({
            width:  props.width,
            height: props.height
        });
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`);

        const { years, months, days, cellSize } = this.calendarLayout.compute({
            width, height,
            from, to,
            direction,
            yearSpacing,
            daySpacing
        });


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Years
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const yearLegends = wrapper.selectAll('.nivo_calendar_year_legend').data(years);

        const yearLabelRotation = direction === DIRECTION_HORIZONTAL ? -90 : 0;

        yearLegends.enter()
            .append('text')
            .text(d => d)
            .classed('nivo_calendar_year_legend', true)
            .attr('text-anchor', 'middle')
            .attr('transform', (d, i) => {
                let x = 0;
                let y = 0;

                if (direction === DIRECTION_HORIZONTAL) {
                    x = -8;
                    y = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
                } else {
                    x = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
                    y = -8;
                }

                return `translate(${x},${y}) rotate(${yearLabelRotation})`;
            })
        ;

        yearLegends
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', (d, i) => {
                let x = 0;
                let y = 0;

                if (direction === DIRECTION_HORIZONTAL) {
                    x = -8;
                    y = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
                } else {
                    x = (7 * (cellSize + daySpacing) + yearSpacing) * i + 3.5 * (cellSize + daySpacing);
                    y = -8;
                }

                return `translate(${x},${y}) rotate(${yearLabelRotation})`;
            })
        ;

        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Days
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const dayNodes = wrapper.selectAll('.nivo_calendar_day').data(days, d => d.date);

        dayNodes.enter()
            .append('rect')
            .attr('class', d => `nivo_calendar_day nivo_calendar_day-month-${d.date.getMonth()}`)
            .attr('width',  d => d.size)
            .attr('height', d => d.size)
            .attr('x', 0)
            .attr('y', 0)
            .style({
                opacity:        0,
                fill:           d => color(`${d.date.getFullYear()}.${d.date.getMonth()}`),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;

        dayNodes
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay(d => d3.time.dayOfYear(d.date) * transitionStaggering)
            .attr('width',  d => d.size)
            .attr('height', d => d.size)
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .style({
                opacity:        1,
                fill:           d => color(`${d.date.getFullYear()}.${d.date.getMonth()}`),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Months
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const monthNodes = wrapper.selectAll('.nivo_calendar_month').data(months, d => d.date);

        monthNodes.enter()
            .append('path')
            .attr('class', 'nivo_calendar_month')
            .style({
                opacity:        0,
                fill:           'none',
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
            .attr('d', d => d.path)
        ;

        monthNodes
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay(d => (d.date.getMonth() + 1) * 30 * transitionStaggering)
            .style({
                opacity:        1,
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
            .attr('d', d => d.path)
        ;
    }

    componentWillMount() {
        this.calendarLayout = CalendarLayout();
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.renderD3(nextProps, nextState);

        return false;
    }

    componentDidMount() {
        this.renderD3(this.props, this.state);
    }

    render() {
        return (
            <svg className="nivo_calendar">
                <rect className="debug" style={{ fill: '#fff' }} />
                <g className="nivo_calendar_wrapper">
                </g>
            </svg>
        );
    }
}

CalendarD3.propTypes = _.omit(calendarPropTypes, [
    'motionStiffness',
    'motionDamping',
]);

CalendarD3.defaultProps = _.omit(calendarDefaultProps, [
    'motionStiffness',
    'motionDamping',
]);


export default CalendarD3;
