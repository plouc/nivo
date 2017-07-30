/*
 * This file is part of the nivo project.
 *
 * (c) Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import d3 from 'd3'
import _ from 'lodash'
import Nivo from '../../../Nivo'
import { midAngle, findNeighbor } from '../../../ArcUtils'
import { getColorStyleObject } from '../../../ColorUtils'

class PieColumnLegends extends Component {
    static decoratePie(element) {
        const { props } = element

        const lineColorStyle = getColorStyleObject(props.lineColor, 'stroke')
        const textColorStyle = getColorStyleObject(props.textColor, 'fill')
        const badgeColorStyle = getColorStyleObject(props.badgeColor, 'fill')

        // Receive context from Parent Pie component
        return ({
            element,
            previousData,
            newData,
            identity,
            arc,
            pie,
            radius,
            transitionDuration,
            transitionEasing,
        }) => {
            const labelFn = props.labelFn || identity

            const outerArc = d3.svg
                .arc()
                .innerRadius(radius + props.radiusOffset)
                .outerRadius(radius + props.radiusOffset)

            let lines = element.selectAll('.line').data(newData, identity)
            lines
                .enter()
                .append('polyline')
                .attr('fill', 'none')
                .attr('class', 'line')
                //.style('opacity', 0)
                .each(function(d, i) {
                    //console.log('LINES ENTER');
                    let startingArc =
                        findNeighbor(i, identity, previousData, newData) || d

                    this._current = startingArc
                })

            lines
                .each(function(d, i) {
                    //console.log('LINES UPDATE');
                })
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style(lineColorStyle)
                .style('opacity', 1)
                .attrTween('points', function(d) {
                    const interpolate = d3.interpolate(this._current, d)

                    return t => {
                        const angles = interpolate(t)

                        const p0 = arc.centroid(angles)
                        const p1 = outerArc.centroid(angles)
                        const p2 = [0, p1[1]]

                        p2[0] =
                            (radius + props.horizontalOffset) *
                            (midAngle(angles) < Math.PI ? 1 : -1)

                        return [p0, p1, p2]
                    }
                })

            lines
                .exit()
                .each(function(d) {
                    console.log('LINES EXIT', labelFn(d))
                })
                .remove()

            return
            let labels = element
                .selectAll('.column-label')
                .data(newData, identity)
            labels
                .enter()
                .append('g')
                .attr('class', 'column-label')
                .attr('transform', d => {
                    const centroid = outerArc.centroid(d)

                    return `translate(${centroid[0]},${centroid[1]})`
                })
                .each(function(d, i) {
                    const el = d3.select(this)

                    let labelBackground
                    if (props.badgeMode) {
                        labelBackground = el
                            .append('rect')
                            .style(badgeColorStyle)
                            .attr({
                                rx: props.badgeBorderRadius,
                                ry: props.badgeBorderRadius,
                            })
                    }

                    const labelText = el
                        .append('text')
                        .text(labelFn)
                        .style(textColorStyle)
                    const labelBBox = labelText[0][0].getBBox()

                    console.log(labelBBox)

                    if (props.badgeMode) {
                        const badgeWidth =
                            labelBBox.width + props.badgePaddingX * 2
                        const badgeHeight =
                            labelBBox.height + props.badgePaddingY * 2

                        labelBackground.attr({
                            transform: `translate(0,${badgeHeight / 2 * -1})`,
                            width: badgeWidth,
                            height: badgeHeight,
                        })

                        labelText.attr({
                            transform: `translate(${props.badgePaddingX},0)`,
                        })
                    }
                })
                //.style('opacity', 0)
                .each(function(d, i) {
                    this._current =
                        findNeighbor(i, identity, previousData, newData) ||
                        _.assign({}, d, { endAngle: d.startAngle })
                })

            labels
                .text(labelFn)
                .transition()
                .duration(transitionDuration)
                .ease(transitionEasing)
                .style(textColorStyle)
                .style('opacity', 1)
                .attrTween('transform', function(d) {
                    const interpolate = d3.interpolate(
                        {
                            startAngle: this._current.startAngle,
                            endAngle: this._current.endAngle,
                        },
                        d
                    )

                    const el = d3.select(this)

                    return t => {
                        const angles = interpolate(t)

                        el.attr(
                            'text-anchor',
                            midAngle(angles) < Math.PI ? 'start' : 'end'
                        )

                        const centroid = outerArc.centroid(angles)
                        const position = [0, centroid[1]]

                        position[0] =
                            (radius +
                                props.horizontalOffset +
                                props.textOffset) *
                            (midAngle(angles) < Math.PI ? 1 : -1)

                        return `translate(${position[0]},${position[1]})`
                    }
                })

            labels
                .exit()
                .each(function(d) {
                    //console.log('EXIT', labelFn(d));
                })
                .remove()
        }
    }

    render() {
        invariant(
            false,
            '<PieColumnLegends> element is for Pie configuration only and should not be rendered'
        )
    }
}

const { number, string, bool, func, any } = PropTypes

PieColumnLegends.propTypes = {
    labelFn: func,
    radiusOffset: number.isRequired,
    horizontalOffset: number.isRequired,
    textOffset: number.isRequired,
    lineColor: any.isRequired,
    textColor: any.isRequired,
    badgeMode: bool.isRequired,
    badgeColor: any.isRequired,
    badgePaddingX: number.isRequired,
    badgePaddingY: number.isRequired,
    badgeBorderRadius: number.isRequired,
}

PieColumnLegends.defaultProps = {
    radiusOffset: 16,
    horizontalOffset: 30,
    textOffset: 10,
    lineColor: 'none',
    textColor: 'none',
    badgeMode: true,
    badgeColor: 'none',
    badgePaddingX: 7,
    badgePaddingY: 3,
    badgeBorderRadius: 2,
}

export default PieColumnLegends
