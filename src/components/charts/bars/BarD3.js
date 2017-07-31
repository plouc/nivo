/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import d3 from 'd3'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import { getColorRange, getColorGenerator } from '../../../ColorUtils'
import { margin as marginPropType } from '../../../PropTypes'
import decoratorsFromReactChildren from '../../../lib/decoratorsFromReactChildren'

class BarD3 extends Component {
    renderD3(props) {
        const {
            groupMode,
            onBarClick,
            colors,
            classify,
            transitionDuration,
            transitionEasing,
            transitionStaggering,
        } = props

        const element = d3.select(findDOMNode(this))
        const wrapper = element.select('.nivo_bars_wrapper')

        const margin = _.assign({}, Nivo.defaults.margin, props.margin)
        const width = props.width - margin.left - margin.right
        const height = props.height - margin.top - margin.bottom

        let data = []

        props.data.forEach(d => {
            d.values.forEach((value, i) => {
                const datum = _.assign({}, value, {
                    stackIndex: i,
                    x: d.x,
                    xId: d.id,
                })

                if (i === 0) {
                    datum.y0 = 0
                    datum.y1 = value.y
                } else {
                    datum.y0 = data[data.length - 1].y1
                    datum.y1 = datum.y0 + value.y
                }

                data.push(datum)
            })
        })

        element.attr({
            width: props.width,
            height: props.height,
        })
        wrapper.attr('transform', `translate(${margin.left},${margin.top})`)

        const xScale = d3.scale
            .ordinal()
            .rangeRoundBands([0, width], 0.2)
            .domain(data.map((d, i) => d.x))

        let maxYValue
        if (groupMode === 'stacked') {
            maxYValue = d3.max(data, d => d.y1)
        } else {
            maxYValue = d3.max(data, d => d.y)
        }

        const maxGroupLength = d3.max(props.data, d => d.values.length)

        const yScale = d3.scale
            .linear()
            .rangeRound([height, 0])
            .domain([0, maxYValue])

        const color = getColorRange(colors)

        data = data.map(d => {
            let rendered
            if (groupMode === 'stacked') {
                rendered = {
                    x: xScale(d.x),
                    y: yScale(d.y1),
                    width: xScale.rangeBand(),
                    height: yScale(d.y0) - yScale(d.y1),
                }
            } else {
                rendered = {
                    x:
                        xScale(d.x) +
                        d.stackIndex * xScale.rangeBand() / maxGroupLength,
                    y: yScale(d.y),
                    width: xScale.rangeBand() / maxGroupLength,
                    height: height - yScale(d.y),
                }
            }

            d.render = {
                color: color(d.id),
                ...rendered,
            }

            return d
        })

        //console.log(data);

        const rects = wrapper
            .selectAll('.nivo_bars_bar')
            .data(data, d => `${d.xId}${d.id}`)

        rects
            .enter()
            .append('rect')
            .classed('nivo_bars_bar', true)
            .attr('width', d => d.render.width)
            .attr('x', d => d.render.x)
            .attr('y', height)
            .attr('height', 0)
            .style('fill', d => d.render.color)
            .on('click', onBarClick)

        if (groupMode === 'stacked') {
            rects
                .transition()
                .delay((d, i) => i * transitionStaggering)
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('fill', d => d.render.color)
                .attr('y', d => d.render.y)
                .attr('height', d => d.render.height)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('x', d => d.render.x)
                .attr('width', d => d.render.width)
        } else {
            rects
                .transition()
                .delay((d, i) => i * transitionStaggering)
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style('fill', d => d.render.color)
                .attr('x', d => d.render.x)
                .attr('width', d => d.render.width)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('y', d => d.render.y)
                .attr('height', d => d.render.height)
        }

        this.decorators.forEach(decorator => {})
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.decorators = decoratorsFromReactChildren(
            nextProps.children,
            'decorateBars'
        )

        this.renderD3(nextProps, nextState)

        return false
    }

    componentDidMount() {
        this.decorators = decoratorsFromReactChildren(
            this.props.children,
            'decorateBars'
        )

        this.renderD3(this.props, this.state)
    }

    render() {
        return (
            <svg className="nivo_bars">
                <g className="nivo_bars_wrapper" />
            </svg>
        )
    }
}

const {
    number,
    string,
    func,
    any,
    oneOf,
    oneOfType,
    arrayOf,
    shape,
} = PropTypes

BarsD3.propTypes = {
    width: number.isRequired,
    height: number.isRequired,
    margin: marginPropType,
    data: arrayOf(
        shape({
            x: number.isRequired,
            id: oneOfType([number, string]).isRequired,
            values: arrayOf(
                shape({
                    id: oneOfType([number, string]).isRequired,
                    y: number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    groupMode: oneOf(['stacked', 'grouped']),
    onBarClick: func.isRequired,
    colors: any.isRequired,
    classify: func,
    transitionDuration: number.isRequired,
    transitionEasing: string.isRequired,
    transitionStaggering: number.isRequired,
}

BarsD3.defaultProps = {
    margin: Nivo.defaults.margin,
    groupMode: 'stacked',
    onBarClick: () => {},
    colors: Nivo.defaults.colorRange,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
    transitionStaggering: 10,
}

export default BarsD3
