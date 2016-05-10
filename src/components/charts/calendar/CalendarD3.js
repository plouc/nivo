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
import decoratorsFromReactChildren                 from '../../../lib/decoratorsFromReactChildren';
import CalendarLayout                              from '../../../lib/charts/calendar/CalendarLayout';
import { calendarPropTypes, calendarDefaultProps } from './CalendarProps';


const color = d3.scale.category20();

class CalendarD3 extends Component {
    constructor(props) {
        super(props);
    }

    renderD3(props) {
        const {
            direction,
            daySpacing, dayBorderWidth, dayBorderColor,
            monthBorderWidth, monthBorderColor,
            transitionDuration, transitionEasing, transitionStaggering
        } = props;

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

        const { days, months } = this.calendarLayout.compute({
            width, height,
            direction,
            daySpacing
        });


        const rects = wrapper.selectAll('.nivo_calendar_day').data(days, d => d.date);

        rects
            .enter().append('rect')
            .attr('class', 'nivo_calendar_day')
            .attr('width',  d => d.size)
            .attr('height', d => d.size)
            .attr('x', 0)
            .attr('y', 0)
            .style({
                opacity:        0,
                fill:           d => color(d.date.getMonth()),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;

        rects
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
                fill:           d => color(d.date.getMonth()),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
        ;


        const paths = wrapper.selectAll('.nivo_calendar_month').data(months, d => d.date);

        paths.enter().append('path')
            .attr('class', 'nivo_calendar_month')
            .style({
                fill:   'none',
                stroke:         monthBorderColor,
                'stroke-width': monthBorderWidth,
            })
            .attr('d', d => d.path)
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
            .attr('d', d => d.path)
        ;

        this.decorators.forEach(decorator => {
        });
    }

    componentWillMount() {
        this.calendarLayout = CalendarLayout();
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
            <svg className="nivo_calendar">
                <g className="nivo_calendar_wrapper" />
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
