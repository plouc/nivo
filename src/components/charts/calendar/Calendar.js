/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes }      from 'react';
import { findDOMNode }                      from 'react-dom';
import d3                                   from 'd3';
import _                                    from 'lodash';
import Nivo                                 from '../../../Nivo';
import { margin as marginPropType }         from '../../../PropTypes';
import decoratorsFromReactChildren          from '../../../lib/decoratorsFromReactChildren';
import {
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL
} from '../../../constants/directions'


const monthPath = (t0, cellSize, direction) => {
    const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0); // first day of next month
    const d0 = t0.getDay();            // first day of month
    const w0 = d3.time.weekOfYear(t0); // first week of month
    const d1 = t1.getDay();            // last day of month
    const w1 = d3.time.weekOfYear(t1); // last week of month

    if (direction === DIRECTION_HORIZONTAL) {
        return [
            `M${(w0 + 1) * cellSize},${d0 * cellSize}`,
            `H${w0 * cellSize}V${7 * cellSize}`,
            `H${w1 * cellSize}V${(d1 + 1) * cellSize}`,
            `H${(w1 + 1) * cellSize}V0`,
            `H${(w0 + 1) * cellSize}Z`
        ].join('');
    }

    return [
        `M${d0 * cellSize},${(w0 + 1) * cellSize}`,
        `H0V${(w1 + 1) * cellSize}`,
        `H${(d1 + 1) * cellSize}V${w1 * cellSize}`,
        `H${7 * cellSize}V${w0 * cellSize}`,
        `H${d0 * cellSize}Z`
    ].join('');
};


const color = d3.scale.category20();

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.previousData = null;
    }

    renderD3(props, state) {
        const {
            data,
            direction,
            dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor,
            transitionDuration, transitionEasing, transitionStaggering
        } = props;


        let rectPosition;
        if (direction === DIRECTION_HORIZONTAL) {
            rectPosition = {
                x: d => d3.time.weekOfYear(d) * cellSize,
                y: d => d.getDay() * cellSize,
            };
        } else {
            rectPosition = {
                x: d => d.getDay() * cellSize,
                y: d => d3.time.weekOfYear(d) * cellSize,
            };
        }

        const element = d3.select(findDOMNode(this));
        const wrapper = element.select('.nivo_calendar_wrapper');

        const margin = _.assign({}, Nivo.defaults.margin, props.margin);
        const width  = props.width  - margin.left - margin.right;
        const height = props.height - margin.top  - margin.bottom;

        element.attr({
            width:  props.width,
            height: props.height
        });
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`);

        const startDate = new Date(2005, 0, 1);
        const endDate   = new Date(2006, 0, 1);

        const days   = d3.time.days(startDate, endDate);
        const months = d3.time.months(startDate, endDate);

        const weekCount = d3.time.weekOfYear(days[days.length - 1]);

        let cellSize;
        if (direction === DIRECTION_HORIZONTAL) {
            cellSize = width / (weekCount + 1);
        } else {
            cellSize = height / (weekCount + 1);
        }


        const rects = wrapper.selectAll('.nivo_calendar_day').data(days);

        rects
            .enter().append('rect')
            .attr('class', 'nivo_calendar_day')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr({ x: 0, y: 0 })
            .style({
                opacity:        0,
                fill:           '#fff',//d => color(d.getMonth()),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;

        rects
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay(d => d3.time.dayOfYear(d) * transitionStaggering)
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr(rectPosition)
            .style({
                opacity:        1,
                fill:           '#fff',//d => color(d.getMonth()),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;


        const paths = wrapper.selectAll('.nivo_calendar_month').data(months);

        paths.enter().append('path')
            .attr('class', 'nivo_calendar_month')
            .style({
                fill:   'none',
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
            .attr('d', d => monthPath(d, cellSize, direction))
        ;

        paths
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay((d, i) => i * 30 * transitionStaggering)
            .style({
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
            .attr('d', d => monthPath(d, cellSize, direction))
        ;

        this.decorators.forEach(decorator => {
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.decorators = decoratorsFromReactChildren(nextProps.children, 'decorateCalendar');

        this.renderD3(nextProps, nextState);

        return false;
    }

    componentDidMount() {
        this.decorators = decoratorsFromReactChildren(this.props.children, 'decorateCalendar');

        this.renderD3(this.props, this.state);
    }

    render() {
        return (
            <svg ref="svg" className="nivo_calendar">
                <g className="nivo_calendar_wrapper" />
            </svg>
        );
    }
}

const { array, number, string, func, any, oneOf } = PropTypes;

Calendar.propTypes = {
    width:                number.isRequired,
    height:               number.isRequired,
    margin:               marginPropType,
    direction:            oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
    dayBorderWidth:       number.isRequired,
    dayBorderColor:       string.isRequired,
    monthBorderWidth:     number.isRequired,
    monthBorderColor:     string.isRequired,
    transitionDuration:   number.isRequired,
    transitionEasing:     string.isRequired,
    transitionStaggering: number.isRequired,
};

Calendar.defaultProps = {
    margin:               Nivo.defaults.margin,
    direction:            DIRECTION_HORIZONTAL,
    dayBorderWidth:       1,
    dayBorderColor:       '#000',
    monthBorderWidth:     2,
    monthBorderColor:     '#000',
    transitionDuration:   Nivo.defaults.transitionDuration,
    transitionEasing:     Nivo.defaults.transitionEasing,
    transitionStaggering: 5,
};


export default Calendar;
