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
import d3 from 'd3'
import invariant from 'invariant'
import { radiansToDegrees } from '../../../ArcUtils'
import makeLabel, { LABEL_POSITION_TOP } from '../../../lib/charts/labels'

class RadialStackAngleAxis extends Component {
    static decorateRadialStack({
        props: { labelPosition, labelRotation, labelOffset, labelPaddingX, labelPaddingY },
    }) {
        const radialLine = d3.svg.line.radial().interpolate('cardinal-closed')
        /*
            .radius(radius)
            .angle(function(d, i) { return angle(i); });
        */
        return ({
            element,
            layers,
            stacked,
            angle,
            radius,
            innerRadius,
            outerRadius,
            transitionDuration,
            transitionEasing,
        }) => {
            let wrapper = element.select('.nivo_radial-axis')
            if (wrapper.node() === null) {
                //wrapper = element.append('g')
                wrapper = element.insert('g', ':first-child').attr('class', 'nivo_radial-axis')
            }

            /*
            radialLine.angle(d => angle(d.x));

            const radialTicks = wrapper.selectAll('.nivo_radial-axis_circle').data([
                { radius: innerRadius, serie: stacked[0] },
                { radius: innerRadius + (outerRadius - innerRadius) / 2, serie: stacked[0] },
                { radius: outerRadius, serie: stacked[0] }
            ]);

            radialTicks.enter().append('path')
                .attr('class', 'nivo_radial-axis_circle')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('d', d => radialLine.radius(d.radius)(d.serie))
            ;
            */

            const lines = wrapper.selectAll('.nivo_radial-axis_tick').data(stacked[0], d => d.x)

            const newLine = lines
                .enter()
                .append('g')
                .attr('class', 'nivo_radial-axis_tick')
                .attr('transform', 'rotate(-90)')

            newLine
                .append('line')
                .attr('class', 'nivo_radial-axis_tick_grid-line')
                .attr('x1', innerRadius)
                .attr('x2', outerRadius)

            newLine.append('g').attr('transform', `translate(${outerRadius},0)`).each(function(d) {
                const el = d3.select(this)

                el.append('g').attr('transform', d => `rotate(${labelRotation})`).call(
                    makeLabel({
                        text: d.x,
                        position: labelPosition,
                        labelOffset,
                        labelPaddingX,
                        labelPaddingY,
                    })
                )
            })

            lines
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .attr('transform', d => `rotate(${radiansToDegrees(angle(d.x)) - 90})`)
                .each(function(d) {
                    const el = d3.select(this)

                    d3.transition(el.select('line')).attr('x1', innerRadius).attr('x2', outerRadius)

                    el
                        .select('g')
                        .select('g')
                        .attr('transform', d => `rotate(${labelRotation})`)
                        .call(
                            makeLabel({
                                text: d.x,
                                position: labelPosition,
                                labelOffset,
                                labelPaddingX,
                                labelPaddingY,
                            })
                        )
                })
        }
    }

    render() {
        invariant(
            false,
            '<RadialStackAngleAxis> element is for RadialStack components configuration only and should not be rendered'
        )
    }
}

const { number, string } = PropTypes

RadialStackAngleAxis.propTypes = {
    labelPosition: string.isRequired,
    labelRotation: number.isRequired,
    labelOffset: number.isRequired,
    labelPaddingX: number.isRequired,
    labelPaddingY: number.isRequired,
}

RadialStackAngleAxis.defaultProps = {
    labelPosition: LABEL_POSITION_TOP,
    labelRotation: 90,
    labelOffset: 10,
    labelPaddingX: 6,
    labelPaddingY: 2,
}

export default RadialStackAngleAxis
