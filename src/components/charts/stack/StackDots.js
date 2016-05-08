/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import invariant                       from 'invariant';
import d3                              from 'd3';
import { getColorGenerator }           from '../../../ColorUtils';


class StackDots extends Component {
    static decorateStack(element) {
        const { props } = element;

        const colorFn        = getColorGenerator(props.color);
        const borderColorFn  = getColorGenerator(props.borderColor);
        const { showOnOver } = props;

        // Receive context from Parent Stack component
        return ({
            element,
            stacked,
            width, height,
            xScale, yScale,
            color,
            transitionDuration, transitionEasing
        }) => {
            const slices = [];
            stacked.forEach(layer => {
                layer.forEach((datum, i) => {
                    if (!slices[i]) {
                        slices[i] = [];
                    }

                    slices[i].push(datum);
                });
            });

            const elements = element.selectAll('.nivo_stack_slices').data(slices);

            const newSlices = elements.enter().append('g')
                .attr('class', 'nivo_stack_slices')
                .attr('transform', (d, i) => `translate(${xScale(i)},0)`)
                .style('opacity', showOnOver ? 0 : 1)
                .style('cursor', 'pointer')
                .style('pointer-events', 'all')
            ;

            newSlices.append('rect')
                .attr('width', props.radius * 2 + 20)
                .attr('height', height)
                .attr('transform', `translate(-${props.radius + 10},0)`)
                .style('fill', 'none')
                .style('pointer-events', 'all')
            ;

            newSlices.selectAll('circle').data(d => d).enter().append('circle')
                .attr('r', props.radius)
                .attr('transform', d => {
                    return `translate(0,${yScale(d.y0 + d.y)})`;
                })
                .style('fill', (d, i) => colorFn({ color: color(i) }))
                .style('stroke-width', props.borderWidth)
                .style('stroke', (d, i) => borderColorFn({ color: color(i) }))
            ;

            elements
                .style('opacity', showOnOver ? 0 : 1)
                .on('mouseover', function () {
                    if (!showOnOver) {
                        return;
                    }

                    d3.select(this)
                        .transition()
                        .duration(100)
                        .style('opacity', 1)
                    ;
                })
                .on('mouseout', function () {
                    if (!showOnOver) {
                        return;
                    }

                    d3.select(this)
                        .transition()
                        .duration(100)
                        .style('opacity', 0)
                    ;
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('transform', (d, i) => `translate(${xScale(i)},0)`)
            ;

            elements
                .selectAll('circle').data(d => d)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('r', props.radius)
                .attr('transform', d => {
                    return `translate(0,${yScale(d.y0 + d.y)})`;
                })
                .style('fill', (d, i) => colorFn({ color: color(i) }))
                .style('stroke-width', props.borderWidth)
                .style('stroke', (d, i) => borderColorFn({ color: color(i) }))
            ;
        };
    }

    render() {
        invariant(
            false,
            '<StackDots> element is for Stack configuration only and should not be rendered'
        );
    }
}

const { number, bool, any } = PropTypes;

StackDots.propTypes = {
    showOnOver:  bool.isRequired,
    radius:      number.isRequired,
    color:       any.isRequired,
    borderWidth: number.isRequired,
    borderColor: any.isRequired,
};

StackDots.defaultProps = {
    showOnOver:  false,
    radius:      4,
    color:       'inherit',
    borderWidth: 1,
    borderColor: 'inherit:darker(.4)',
};


export default StackDots;
