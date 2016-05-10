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

const color = d3.scale.category20b();

class CalendarCanvas extends Component {
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

        const canvas = d3.select(findDOMNode(this));
        canvas.attr({
            width:  props.width,
            height: props.height
        });

        const margin = _.assign({}, Nivo.defaults.margin, props.margin);
        const width  = props.width  - margin.left - margin.right;
        const height = props.height - margin.top  - margin.bottom;

        const { days, months } = this.calendarLayout.compute({
            width, height,
            from, to,
            direction,
            yearSpacing,
            daySpacing
        });

        const dayNodes = this.container .selectAll('custom.rect').data(days, d => d.date);

        dayNodes.enter()
            .append('custom')
            .classed('rect', true)
            .attr('x', 0)
            .attr('y', 0)
            .attr('size',  d => d.size)
            .attr('fillStyle', d => color(`${d.date.getFullYear()}.${d.date.getMonth()}`))

            /*
            .style({
                opacity:        0,
                fill:           ),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
            */
        ;

        dayNodes
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .delay(d => d3.time.dayOfYear(d.date) * transitionStaggering)
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('size',  d => d.size)
            .attr('fillStyle', d => color(`${d.date.getFullYear()}.${d.date.getMonth()}`))

            /*
            .style({
                opacity:        1,
                fill:           d => color(`${d.date.getFullYear()}.${d.date.getMonth()}`),
                stroke:         dayBorderColor,
                'stroke-width': dayBorderWidth,
            })
            */
        ;
    }

    drawCanvas() {
        const ctx = this.context;

        const canvas = d3.select(findDOMNode(this));

        ctx.fillStyle = '#fff';
        ctx.rect(0, 0, canvas.attr('width'), canvas.attr('height'));
        ctx.fill();


        const days = this.container.selectAll('custom.rect');

        days.each(function (d) {
            const node = d3.select(this);

            ctx.beginPath();
            ctx.fillStyle = node.attr('fillStyle');
            ctx.rect(node.attr('x'), node.attr('y'), node.attr('size'), node.attr('size'));
            ctx.fill();
            ctx.closePath();

        });

        //console.log(days);
    }

    componentWillMount() {
        this.calendarLayout   = CalendarLayout();
        this.virtualContainer = document.createElement('custom');
        this.container        = d3.select(this.virtualContainer);

        d3.timer(this.drawCanvas.bind(this));
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.renderD3(nextProps, nextState);

        return false;
    }

    componentDidMount() {
        this.canvas  = findDOMNode(this);
        this.context = this.canvas.getContext('2d');

        this.renderD3(this.props, this.state);
    }

    render() {
        return <canvas className="nivo_calendar_canvas" />;
    }
}

CalendarCanvas.propTypes = _.omit(calendarPropTypes, [
    'motionStiffness',
    'motionDamping',
]);

CalendarCanvas.defaultProps = _.omit(calendarDefaultProps, [
    'motionStiffness',
    'motionDamping',
]);


export default CalendarCanvas;
