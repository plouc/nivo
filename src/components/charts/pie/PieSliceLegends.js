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
import Nivo from '../../../Nivo'
import { findNeighbor, midAngle, radiansToDegrees } from '../../../ArcUtils'
import { getColorStyleObject } from '../../../ColorUtils'

class PieSliceLegends extends Component {
    static decoratePie(element) {
        const { props } = element

        const badgeColorStyle = getColorStyleObject(props.badgeColor, 'fill')
        const textColorStyle = getColorStyleObject(props.textColor, 'fill')

        return ({ element, identity, arc, previousData, newData }) => {
            let legends = element.selectAll('.slice-legend').data(newData, identity)

            const labelFn = props.labelFn || identity

            legends
                .enter()
                .append('g')
                .attr('class', 'slice-legend')
                .attr('transform', d => {
                    const centroid = arc.centroid(d)

                    return `translate(${centroid[0]}, ${centroid[1]})`
                })
                .style('opacity', 0)
                .each(function(d, i) {
                    this._current =
                        findNeighbor(i, identity, previousData, newData) ||
                        _.assign({}, d, { endAngle: d.startAngle })
                    const el = d3.select(this)

                    el.append('circle').attr('r', props.radius)

                    el.append('text').attr('text-anchor', 'middle')
                })

            legends
                .each(function(d) {
                    d3.select(this).select('circle').style(badgeColorStyle)

                    d3.select(this).select('text').style(textColorStyle).text(labelFn(d))
                })
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .style('opacity', 1)
                .attrTween('transform', function(d) {
                    const interpolate = d3.interpolate(
                        {
                            startAngle: this._current.startAngle,
                            endAngle: this._current.endAngle,
                        },
                        d
                    )

                    return t => {
                        const angles = interpolate(t)
                        const centroid = arc.centroid(angles)

                        let transform = `translate(${centroid[0]}, ${centroid[1]})`
                        if (props.orient) {
                            const angle = midAngle(angles)
                            transform = `${transform} rotate(${radiansToDegrees(angle)}, 0, 0)`
                        }

                        return transform
                    }
                })

            legends
                .exit()
                .transition()
                .duration(props.transitionDuration)
                .ease(props.transitionEasing)
                .style('opacity', 0)
                .remove()
        }
    }

    render() {
        invariant(
            false,
            '<PieSliceLegends> element is for Pie configuration only and should not be rendered'
        )
    }
}

const { number, string, bool, func, any } = PropTypes

PieSliceLegends.propTypes = {
    labelFn: func,
    radius: number.isRequired,
    orient: bool.isRequired,
    transitionDuration: number.isRequired,
    transitionEasing: string.isRequired,
    badgeColor: any.isRequired,
    textColor: any.isRequired,
}

PieSliceLegends.defaultProps = {
    radius: 12,
    orient: true,
    transitionDuration: Nivo.defaults.transitionDuration,
    transitionEasing: Nivo.defaults.transitionEasing,
    badgeColor: 'none',
    textColor: 'none',
}

export default PieSliceLegends
