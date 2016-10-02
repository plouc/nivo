/*
 * This file is part of the nivo project.
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


class CalendarD3 extends Component {
    constructor(props) {
        super(props);
    }

    renderD3(props) {
        const {
            from, to,
            data,
            onDayClick,
            direction,
            colorScale, emptyColor,
            yearSpacing, yearLegendOffset,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor, monthLegendOffset,
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
                fill:           d => d.color,
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
            .on('click', d => onDayClick(d))
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
                fill:           d => d.color,
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Months
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const monthPaths = wrapper.selectAll('.nivo_calendar_month').data(months, d => d.date);

        monthPaths.enter()
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

        monthPaths
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


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Month legends
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const monthLegends = wrapper.selectAll('.nivo_calendar_month_legend').data(months, d => d.date);
        const monthLegendFormat = d3.time.format('%b');

        monthLegends.enter()
            .append('text')
            .classed('nivo_calendar_month_legend', true)
            .text(d => monthLegendFormat(d.date))
            .attr('text-anchor', 'middle')
            .attr('transform', d => {
                if (direction === DIRECTION_HORIZONTAL) {
                    return `translate(${d.bbox.x + d.bbox.width / 2},${d.bbox.y - monthLegendOffset})`;
                }

                return `translate(${d.bbox.x - monthLegendOffset},${d.bbox.y + d.bbox.height / 2}) rotate(-90)`;
            })
            .style('opacity', 0)
        ;

        monthLegends
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay(d => (d.date.getMonth() + 1) * 30 * transitionStaggering)
            .attr('transform', d => {
                if (direction === DIRECTION_HORIZONTAL) {
                    return `translate(${d.bbox.x + d.bbox.width / 2},${d.bbox.y - monthLegendOffset})`;
                }

                return `translate(${d.bbox.x - monthLegendOffset},${d.bbox.y + d.bbox.height / 2}) rotate(-90)`;
            })
            .style('opacity', 1)
        ;


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Year legends
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const yearLegends = wrapper.selectAll('.nivo_calendar_year_legend').data(years);

        const yearLabelRotation = direction === DIRECTION_HORIZONTAL ? -90 : 0;

        yearLegends.enter()
            .append('text')
            .text(d => d.year)
            .classed('nivo_calendar_year_legend', true)
            .attr('text-anchor', 'middle')
            .attr('transform', d => {
                if (direction === DIRECTION_HORIZONTAL) {
                    return `translate(${d.bbox.x - yearLegendOffset},${d.bbox.y + d.bbox.height / 2}) rotate(-90)`;
                }

                return `translate(${d.bbox.x + d.bbox.width / 2},${d.bbox.y - yearLegendOffset})`;
            })
        ;

        yearLegends
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', d => {
                if (direction === DIRECTION_HORIZONTAL) {
                    return `translate(${d.bbox.x - yearLegendOffset},${d.bbox.y + d.bbox.height / 2}) rotate(-90)`;
                }

                return `translate(${d.bbox.x + d.bbox.width / 2},${d.bbox.y - yearLegendOffset})`;
            })
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
                <g className="nivo_calendar_wrapper" />
            </svg>
        );
    }
}

CalendarD3.propTypes = _.omit(calendarPropTypes, [
    'enableMotion',
    'motionStiffness',
    'motionDamping',
]);

CalendarD3.defaultProps = _.omit(calendarDefaultProps, [
    'enableMotion',
    'motionStiffness',
    'motionDamping',
]);


export default CalendarD3;
