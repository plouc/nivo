/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import setDisplayName from 'recompose/setDisplayName'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { degreesToRadians, radiansToDegrees, computeArcBoundingBox } from '@nivo/core'
import { getOrdinalColorScale } from '@nivo/colors'

class PieLayout extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
            })
        ).isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        fit: PropTypes.bool.isRequired,
        sortByValue: PropTypes.bool.isRequired,
        startAngle: PropTypes.number.isRequired,
        endAngle: PropTypes.number.isRequired,
        padAngle: PropTypes.number.isRequired,
        arcs: PropTypes.array.isRequired, // computed
        arcGenerator: PropTypes.func.isRequired, // computed
        centerX: PropTypes.number.isRequired, // computed
        centerY: PropTypes.number.isRequired, // computed
        radius: PropTypes.number.isRequired, // computed
        innerRadius: PropTypes.number.isRequired, // re-computed
        cornerRadius: PropTypes.number.isRequired,
        debug: PropTypes.shape({
            points: PropTypes.array.isRequired,
            box: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
            }).isRequired,
            ratio: PropTypes.number.isRequired,
        }), // computed
        children: PropTypes.func.isRequired,
    }

    render() {
        const {
            arcs,
            arcGenerator,
            startAngle,
            endAngle,
            width,
            height,
            centerX,
            centerY,
            radius,
            innerRadius,
            debug,
            children: render,
        } = this.props

        return render({
            arcs,
            arcGenerator,
            startAngle,
            endAngle,
            width,
            height,
            centerX,
            centerY,
            radius,
            innerRadius,
            debug,
        })
    }
}

export const PieLayoutDefaultProps = {
    fit: true,
    sortByValue: false,
    innerRadius: 0,
    startAngle: 0,
    endAngle: 360,
    padAngle: 0,
    cornerRadius: 0,
}

export const enhance = Component =>
    compose(
        defaultProps(PieLayoutDefaultProps),
        withPropsOnChange(['colors'], ({ colors }) => ({
            getColor: getOrdinalColorScale(colors, 'id'),
        })),
        withPropsOnChange(
            ['width', 'height', 'innerRadius', 'startAngle', 'endAngle', 'fit', 'cornerRadius'],
            ({
                width,
                height,
                innerRadius: _innerRadius,
                startAngle,
                endAngle,
                fit,
                cornerRadius,
            }) => {
                let radius = Math.min(width, height) / 2
                let innerRadius = radius * Math.min(_innerRadius, 1)

                let centerX = width / 2
                let centerY = height / 2

                let boundingBox
                if (fit === true) {
                    const { points, ...box } = computeArcBoundingBox(
                        centerX,
                        centerY,
                        radius,
                        startAngle - 90,
                        endAngle - 90
                    )
                    const ratio = Math.min(width / box.width, height / box.height)

                    const adjustedBox = {
                        width: box.width * ratio,
                        height: box.height * ratio,
                    }
                    adjustedBox.x = (width - adjustedBox.width) / 2
                    adjustedBox.y = (height - adjustedBox.height) / 2

                    centerX = ((centerX - box.x) / box.width) * box.width * ratio + adjustedBox.x
                    centerY = ((centerY - box.y) / box.height) * box.height * ratio + adjustedBox.y

                    boundingBox = { box, ratio, points }

                    radius = radius * ratio
                    innerRadius = innerRadius * ratio
                }

                const arcGenerator = d3Arc()
                    .outerRadius(radius)
                    .innerRadius(innerRadius)
                    .cornerRadius(cornerRadius)

                return {
                    centerX,
                    centerY,
                    radius,
                    innerRadius,
                    arcGenerator,
                    debug: boundingBox,
                }
            }
        ),
        withPropsOnChange(
            ['sortByValue', 'padAngle', 'startAngle', 'endAngle'],
            ({ sortByValue, padAngle, startAngle, endAngle }) => {
                const pie = d3Pie()
                    .value(d => d.value)
                    .padAngle(degreesToRadians(padAngle))
                    .startAngle(degreesToRadians(startAngle))
                    .endAngle(degreesToRadians(endAngle))

                if (sortByValue !== true) pie.sortValues(null)

                return { pie }
            }
        ),
        withPropsOnChange(['pie', 'data'], ({ pie, data }) => ({
            arcs: pie(data).map(arc => {
                const angle = Math.abs(arc.endAngle - arc.startAngle)

                return {
                    ...arc,
                    angle,
                    angleDeg: radiansToDegrees(angle),
                }
            }),
        })),
        withPropsOnChange(['arcs', 'getColor'], ({ arcs, getColor }) => ({
            arcs: arcs.map(arc => ({
                ...arc,
                color: getColor(arc.data),
            })),
        })),
        pure
    )(Component)

export default setDisplayName('PieLayout')(enhance(PieLayout))
