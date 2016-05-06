/*
 * This file is part of the nivo library.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict';

import d3                from 'd3';
import BubbleD3          from './BubbleD3';
import { getColorRange } from '../../../ColorUtils';


const BubbleD3Svg = domRoot => {

    // DOM elements
    const element  = d3.select(domRoot);
    const wrapper  = element.append('g').attr('class', 'nivo_bubble_wrapper');

    const bubble   = BubbleD3();

    // an array to store decorator functions
    let decorators = [];

    return {
        draw(props) {
            const {
                root,
                identityProperty, value,
                width, height, margin,
                padding,
                colors,
                transitionDuration, transitionEasing
            } = props;

            const identity      = d => d[identityProperty];
            const valueAccessor = d => d[value];

            element.attr({ width, height });

            const useWidth  = width  - margin.left - margin.right;
            const useHeight = height - margin.top  - margin.bottom;

            wrapper.attr({
                width:     useWidth,
                height:    useHeight,
                transform: `translate(${margin.left},${margin.top})`
            });

            const color = getColorRange(colors);

            const bubbled   = bubble.compute({
                width:  useWidth,
                height: useHeight,
                root,
                identityProperty, valueAccessor,
                padding,
                color
            });

            const nodes = wrapper.selectAll('.nivo_bubble_node').data(bubbled, identity);

            nodes
                .enter().append('circle')
                .attr('class', 'nivo_bubble_node')
                .attr('r', 2)
                .style('fill', d => d.color)
                .attr('transform', d => `translate(${d.x},${d.y})`)
            ;

            nodes
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('fill', d => d.color)
                .attr('r', d => d.r)
                .attr('transform', d => `translate(${d.x},${d.y})`)
            ;

            nodes.exit()
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('transform', `translate(${width / 2},${height / 2})`)
                .remove()
            ;

            const bubbleContext = {
                element:  wrapper,
                width:  useWidth,
                height: useHeight,
                rawData:  root,
                identity,
                valueAccessor,
                data:     bubbled,
                transitionDuration,
                transitionEasing
            };

            decorators.forEach(decorator => {
                decorator(bubbleContext);
            });
        },

        decorate(newDecorators = []) {
            decorators = newDecorators;
        }
    };
};


export default BubbleD3Svg;
