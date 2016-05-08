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
import { findDOMNode }                 from 'react-dom';
import d3                              from 'd3';
import _                               from 'lodash';
import Nivo                            from '../../../Nivo';
import { lineInterpolation }           from '../../../PropTypes';
import { getColorRange }               from '../../../ColorUtils';
import { margin as marginPropType }    from '../../../PropTypes';
import decoratorsFromReactChildren     from '../../../lib/decoratorsFromReactChildren';


class Stack extends Component {
    renderD3(nextProps) {
        const {
            layers,
            offset,
            interpolation,
            colors,
            transitionDuration, transitionEasing
        } = nextProps;

        const element = d3.select(findDOMNode(this));
        const wrapper = element.select('.nivo_stack_wrapper');

        const margin = _.assign({}, Nivo.defaults.margin, nextProps.margin);
        const width  = nextProps.width - margin.left - margin.right;
        const height = nextProps.height - margin.top - margin.bottom;

        element.attr({
            width:  nextProps.width,
            height: nextProps.height
        });
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`);

        const stack   = d3.layout.stack().offset(offset);
        const stacked = stack(layers);

        const xScale = d3.scale.linear()
            .range([0, width])
            .domain([0, stacked[0].length - 1])
        ;

        const yScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(stacked, layer => d3.max(layer, d => (d.y0 + d.y)))])
        ;

        const color = getColorRange(colors);

        const area = d3.svg.area()
            .interpolate(interpolation)
            .x(d => xScale(d.x))
            .y0(d => yScale(d.y0))
            .y1(d => yScale(d.y0 + d.y))
        ;

        let paths = wrapper.selectAll('.nivo_stack_area').data(stacked);

        paths.enter().append('path')
            .attr('class', 'nivo_stack_area')
            .attr('d', area)
            .style('fill', (d, i) => color(i))
        ;

        paths
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', area)
            .style('fill', (d, i) => color(i))
        ;

        const stackContext = {
            element: wrapper,
            width, height,
            stacked,
            xScale, yScale,
            color,
            transitionDuration, transitionEasing
        };

        this.decorators.forEach(decorator => {
            decorator(stackContext);
        });
    }

    shouldComponentUpdate(nextProps) {
        this.decorators = decoratorsFromReactChildren(nextProps.children, 'decorateStack');

        this.renderD3(nextProps);

        return false;
    }

    componentDidMount() {
        this.decorators = decoratorsFromReactChildren(this.props.children, 'decorateStack');

        this.renderD3(this.props);
    }

    render() {
        return (
            <svg ref="svg" className="nivo_stack">
                <g className="nivo_stack_wrapper" />
            </svg>
        );
    }
}

const { array, number, string, func, any, oneOf } = PropTypes;

Stack.propTypes = {
    width:              number.isRequired,
    height:             number.isRequired,
    margin:             marginPropType,
    sort:               func,
    layers:             array.isRequired,
    offset:             oneOf(['silhouette', 'wiggle', 'expand', 'zero']).isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    interpolation:      lineInterpolation,
    colors:             any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired
};

Stack.defaultProps = {
    margin:             Nivo.defaults.margin,
    sort:               null,
    offset:             'zero',
    keyProp:            'label',
    valueProp:          'value',
    interpolation:      'monotone',
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing:   Nivo.defaults.transitionEasing,
    colors:             Nivo.defaults.colorRange
};


export default Stack;
