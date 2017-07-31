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
import d3 from 'd3'
import Nivo from '../../../Nivo'
import { midAngle, radiansToDegrees } from '../../../ArcUtils'
import { getColorGenerator } from '../../../ColorUtils'

class PieRadialLegends extends Component {
    static decoratePie(element) {
        const { props } = element

        const color = getColorGenerator(props.textColor)

        return ({ element, arc, identity, pie, newData, radius }) => {
            const labelFn = props.labelFn || identity

            const outerArc = d3.svg
                .arc()
                .innerRadius(radius + props.radiusOffset)
                .outerRadius(radius + props.radiusOffset)

            let labels = element
                .selectAll('.radial-label')
                .data(newData, identity)
            labels
                .enter()
                .append('g')
                .attr('class', 'radial-label')
                .append('text')
                .style('opacity', 0)

            labels
                .each(function(d) {
                    const el = d3.select(this)

                    const angle = midAngle(d)
                    const angleOffset = angle < Math.PI ? -90 : 90

                    const styles = { opacity: 1 }
                    if (color !== 'none') {
                        styles.fill = color(d)
                    }

                    el
                        .select('text')
                        .text(labelFn)
                        .attr(
                            'text-anchor',
                            d => (midAngle(d) < Math.PI ? 'start' : 'end')
                        )
                        .transition()
                        .duration(props.transitionDuration)
                        .ease(props.transitionEasing)
                        .style(styles)
                        .attr(
                            'transform',
                            `translate(${radius + props.radiusOffset}, 0)`
                        )
                })
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .attr('transform', d => {
                    const angle = midAngle(d)

                    return `rotate(${radiansToDegrees(angle)}, 0, 0)`
                })
            labels
                .exit()
                .each(function(d) {
                    const el = d3.select(this)

                    el
                        .select('text')
                        .transition()
                        .duration(props.transitionDuration)
                        .ease(props.transitionEasing)
                        .style('opacity', 0)
                        .attr(
                            'transform',
                            `translate(${radius + props.radiusOffset + 50}, 0)`
                        )
                })
                .transition()
                .duration(0)
                .delay(props.transitionDuration)
                .remove()

            /*
            labels.enter()
                .append('text')
                .attr('class', 'radial-label')
            ;
            labels
                .text(labelFn)
                .attr('text-anchor', d => {
                    return midAngle(d) < Math.PI ? 'start' : 'end';
                })
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .attr('transform', d => {
                    const centroid = outerArc.centroid(d);
                    const angle    = midAngle(d);

                    const angleOffset = angle < Math.PI ? -90 : 90;

                    return `translate(${centroid[0]}, ${centroid[1]}) rotate(${radiansToDegrees(angle) + angleOffset}, 0, 0)`;
                })
            ;
            labels.exit()
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .style('opacity', 0)
                .remove()
            ;
            */
        }
    }

    render() {
        invariant(
            false,
            '<PieRadialLegends> element is for Pie configuration only and should not be rendered'
        )
    }
}

const { number, string, func, any } = PropTypes

PieRadialLegends.propTypes = {
    labelFn: func,
    radiusOffset: number.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing: string.isRequired,
    textColor: any.isRequired,
}

PieRadialLegends.defaultProps = {
    radiusOffset: 16,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
    textColor: 'none',
}

export default PieRadialLegends
