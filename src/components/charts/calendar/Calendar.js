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
import { getColorRange, getColorGenerator } from '../../../ColorUtils';
import { margin as marginPropType }         from '../../../PropTypes';
import decoratorsFromReactChildren          from '../../../lib/decoratorsFromReactChildren';


const cellSize = 14;

const monthPath = (t0) => {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
        d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);

    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
};


class Calendar extends Component {
    constructor(props) {
        super(props);

        this.previousData = null;
    }

    renderD3(props, state) {
        const {
            data,
            dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor,
            transitionDuration, transitionEasing
        } = props;

        const element = d3.select(findDOMNode(this));
        const wrapper = element.select('.nivo_calendar_wrapper');

        const margin = _.assign({}, Nivo.defaults.margin, props.margin);
        const width  = props.width - margin.left - margin.right;
        const height = props.height - margin.top - margin.bottom;

        element.attr({
            width:  props.width,
            height: props.height
        });
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`);


        const days   = d3.time.days(new Date(2005, 0, 1),   new Date(2006, 0, 1));
        const months = d3.time.months(new Date(2005, 0, 1), new Date(2006, 0, 1));

        const rects = wrapper.selectAll('.nivo_calendar_day').data(days);

        rects
            .enter().append('rect')
            .attr('class', 'nivo_calendar_day')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('x', d => d3.time.weekOfYear(d) * cellSize)
            .attr('y', d => d.getDay() * cellSize)
            .style({
                fill:           'none',
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
            //.datum(format)
        ;

        rects
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style({
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
            .attr('d', monthPath)
        ;

        paths
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style({
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
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
    width:              number.isRequired,
    height:             number.isRequired,
    margin:             marginPropType,
    dayBorderWidth:     number.isRequired,
    dayBorderColor:     string.isRequired,
    monthBorderWidth:   number.isRequired,
    monthBorderColor:   string.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
};

Calendar.defaultProps = {
    margin:             Nivo.defaults.margin,
    dayBorderWidth:     1,
    dayBorderColor:     '#000',
    monthBorderWidth:   2,
    monthBorderColor:   '#000',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
};


export default Calendar;
