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
import { lineInterpolation }                from '../../../PropTypes';
import { getColorRange, getColorGenerator } from '../../../ColorUtils';
import { margin as marginPropType }         from '../../../PropTypes';
import decoratorsFromReactChildren          from '../../../lib/decoratorsFromReactChildren';


class Stack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            excludeLayers: []
        };
    }

    renderD3(props, state) {
        const {
            data,
            offset,
            interpolation,
            colors, overColor,
            transitionDuration, transitionEasing
        } = props;

        const {
            excludeLayers
        } = state;

        const overColorFn = getColorGenerator(overColor);

        const element = d3.select(findDOMNode(this));
        const wrapper = element.select('.nivo_stack_wrapper');

        const margin = _.assign({}, Nivo.defaults.margin, props.margin);
        const width  = props.width - margin.left - margin.right;
        const height = props.height - margin.top - margin.bottom;

        element.attr({
            width:  props.width,
            height: props.height
        });
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`);

        const color = getColorRange(colors);

        const normData = _.cloneDeep(data).map((values, i) => ({
            index: i,
            color: color(i),
            values,
        }));

        let filteredData = [];
        let hiddenData   = [];
        if (excludeLayers.length > 0) {
            normData.forEach(layer => {
                if (excludeLayers.indexOf(layer.index) === -1) {
                    filteredData.push(layer);
                } else {
                    hiddenData.push(layer);
                }
            });
        } else {
            filteredData = normData;
        }

        const stack = d3.layout.stack()
            .offset(offset)
            .values(d => d.values)
        ;

        const stacked = stack(filteredData);

        const xScale = d3.scale.linear()
            .range([0, width])
            .domain([0, stacked[0].values.length - 1])
        ;

        const yScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(stacked, layer => d3.max(layer.values, d => (d.y0 + d.y)))])
        ;

        const area = d3.svg.area()
            .interpolate(interpolation)
            .x(d => xScale(d.x))
            .y0(d => yScale(d.y0))
            .y1(d => yScale(d.y0 + d.y))
        ;


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Areas
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        let paths = wrapper.selectAll('.nivo_stack_area').data(stacked, d => d.index);

        // ENTER
        paths.enter().append('path')
            .attr('class', 'nivo_stack_area')
            .attr('d', d => area(d.values))
            .style('fill', d => d.color)
        ;

        // UPDATE
        paths
            .on('click', d => {
                this.setState({ excludeLayers: excludeLayers.concat([d.index]) });
            })
            .on('mouseover', function (d) {
                d3.select(this).style('fill', overColorFn);
            })
            .on('mousemove', function (d, i) {
                d3.select(this).style('fill', overColorFn);
            })
            .on('mouseout', function (d) {
                d3.select(this).style('fill', d.color);
            })
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', d => area(d.values))
            .style('fill', d => d.color)
        ;

        // EXIT
        paths.exit()
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('d', d => {
                return area(d.values.map(p => ({
                    x:  p.x,
                    y0: p.y0,
                    y:  0,
                })));
            })
            .style('opacity', 0)
            .remove()
        ;


        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        // Hidden layers
        // —————————————————————————————————————————————————————————————————————————————————————————————————————————————
        const hiddenControls = wrapper.selectAll('.nivo_stack_hidden_control').data(hiddenData, d => d.index);

        // ENTER
        hiddenControls.enter().append('circle')
            .attr('class', 'nivo_stack_hidden_control')
            .attr('r', 8)
            .attr('transform', (d, i) => `translate(${i * 40},0)`)
            .style('fill', d => d.color)
            .style('opacity', 0)
            .style('cursor', 'pointer')
        ;

        hiddenControls
            .on('click', d => {
                this.setState({ excludeLayers: excludeLayers.filter(index => index !== d.index) });
            })
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .attr('transform', (d, i) => `translate(${i * 40},0)`)
            .style('fill', d => d.color)
            .style('opacity', 1)
        ;

        hiddenControls.exit()
            .transition()
            .duration(transitionDuration)
            .ease(transitionEasing)
            .style('opacity', 0)
            .remove()
        ;

        const stackContext = {
            element, wrapper,
            width, height,
            stacked,
            xScale, yScale,
            transitionDuration, transitionEasing
        };

        this.decorators.forEach(decorator => {
            decorator(stackContext);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.decorators = decoratorsFromReactChildren(nextProps.children, 'decorateStack');

        this.renderD3(nextProps, nextState);

        return false;
    }

    componentDidMount() {
        this.decorators = decoratorsFromReactChildren(this.props.children, 'decorateStack');

        this.renderD3(this.props, this.state);
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
    data:               array.isRequired,
    offset:             oneOf(['silhouette', 'wiggle', 'expand', 'zero']).isRequired,
    keyProp:            string.isRequired,
    valueProp:          string.isRequired,
    interpolation:      lineInterpolation,
    colors:             any.isRequired,
    overColor:          any.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing:   string.isRequired,
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
    colors:             Nivo.defaults.colorRange,
    overColor:          'inherit:brighter(.5)',
};


export default Stack;
