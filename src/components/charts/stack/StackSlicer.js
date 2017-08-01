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
import invariant from 'invariant'
import _ from 'lodash'
import d3 from 'd3'
import { getColorGenerator } from '../../../ColorUtils'

const overTransitionDuration = 200
const overTransitionEasing = 'linear'

class StackSlicer extends Component {
    static decorateStack(element) {
        const { props } = element

        const colorFn = getColorGenerator(props.color)
        const dotBorderColorFn = getColorGenerator(props.dotBorderColor)
        const lineColorFn = getColorGenerator(props.lineColor)
        const { showOnOver } = props

        // Receive context from Parent Stack component
        return ({ wrapper, stacked, width, height, transitionDuration, transitionEasing }) => {
            const slices = []
            stacked.forEach(layer => {
                layer.values.forEach((datum, i) => {
                    if (!slices[i]) {
                        slices[i] = {
                            x: datum.interpolated.x,
                            values: [],
                        }
                    }

                    slices[i].values.push(
                        _.assign({}, datum, {
                            index: layer.index,
                            color: layer.color,
                        })
                    )
                })
            })

            const elements = wrapper.selectAll('.nivo_stack_slices').data(slices)

            const newSlices = elements
                .enter()
                .append('g')
                .attr('class', 'nivo_stack_slices')
                .attr('transform', d => `translate(${d.x},0)`)
                .style('opacity', showOnOver ? 0 : 1)
                .style('pointer-events', 'all')

            newSlices
                .append('rect')
                .attr('width', props.radius * 2 + 10)
                .attr('height', height)
                .attr('transform', `translate(-${props.radius + 5},0)`)
                .style('fill', 'none')
                .style('pointer-events', 'all')

            elements
                .style('opacity', showOnOver ? 0 : 1)
                .on('mouseover', function() {
                    if (!showOnOver) {
                        return
                    }

                    d3
                        .select(this)
                        .transition()
                        .duration(overTransitionDuration)
                        .ease(overTransitionEasing)
                        .style('opacity', 1)
                })
                .on('mouseout', function() {
                    if (!showOnOver) {
                        return
                    }

                    d3
                        .select(this)
                        .transition()
                        .duration(overTransitionDuration)
                        .ease(overTransitionEasing)
                        .style('opacity', 0)
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('transform', d => `translate(${d.x},0)`)

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // Lines
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            const lines = elements.selectAll('line').data(d => d.values, d => d.index)

            // ENTER
            lines
                .enter()
                .append('line')
                .attr('y1', d => d.interpolated.y)
                .attr('y2', d => d.interpolated.y0)
                .style('stroke-width', props.lineWidth)
                .style('stroke', lineColorFn)

            // UPDATE
            lines
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('y1', d => d.interpolated.y)
                .attr('y2', d => d.interpolated.y0)
                .style('stroke-width', props.lineWidth)
                .style('stroke', lineColorFn)

            // EXIT
            lines
                .exit()
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('y1', d => d.interpolated.y0)
                .attr('y2', d => d.interpolated.y0)
                .style('opacity', 0)
                .remove()

            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            // Circles
            // —————————————————————————————————————————————————————————————————————————————————————————————————————————
            const circles = elements.selectAll('circle').data(d => d.values, d => d.index)

            // ENTER
            circles
                .enter()
                .append('circle')
                .attr('r', 0.1)
                .style('cursor', 'pointer')
                .attr('transform', d => `translate(0,${d.interpolated.y})`)
                .style('fill', colorFn)
                .style('stroke-width', props.dotBorderWidth)
                .style('stroke', dotBorderColorFn)

            // UPDATE
            circles
                .on('mouseover', function() {
                    d3
                        .select(this)
                        .transition()
                        .duration(overTransitionDuration)
                        .ease(overTransitionEasing)
                        .attr('r', props.radius * 2)
                })
                .on('mouseout', function() {
                    d3
                        .select(this)
                        .transition()
                        .duration(overTransitionDuration)
                        .ease(overTransitionEasing)
                        .attr('r', props.radius)
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('r', props.radius)
                .attr('transform', d => `translate(0,${d.interpolated.y})`)
                .style('fill', colorFn)
                .style('stroke-width', props.dotBorderWidth)
                .style('stroke', dotBorderColorFn)

            // EXIT
            circles
                .exit()
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('r', 0.1)
                .style('opacity', 0)
                .remove()
        }
    }

    render() {
        invariant(
            false,
            '<StackSlicer> element is for Stack configuration only and should not be rendered'
        )
    }
}

const { number, bool, any } = PropTypes

StackSlicer.propTypes = {
    showOnOver: bool.isRequired,
    radius: number.isRequired,
    color: any.isRequired,
    dotBorderWidth: number.isRequired,
    dotBorderColor: any.isRequired,
    lineWidth: number.isRequired,
}

StackSlicer.defaultProps = {
    showOnOver: false,
    radius: 4,
    color: 'inherit',
    dotBorderWidth: 1,
    dotBorderColor: 'inherit:darker(.5)',
    lineWidth: 1,
    lineColor: 'inherit:darker(.3)',
}

export default StackSlicer
