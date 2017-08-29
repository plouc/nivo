/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { partial } from 'lodash'
import { renderAxes } from '../../../lib/canvas/axes'
import { HeatMapPropTypes } from './props'
import enhance from './enhance'

const renderRect = (ctx, { x, y, width, height, color, labelTextColor, value }) => {
    ctx.fillStyle = color
    ctx.fillRect(x - width / 2, y - height / 2, width, height)

    ctx.fillStyle = labelTextColor
    ctx.fillText(value, x, y)
}

const renderCircle = (ctx, { x, y, width, height, color, labelTextColor, value }) => {
    const radius = Math.min(width, height) / 2

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = labelTextColor
    ctx.fillText(value, x, y)
}

const computeNodes = ({
    data,
    keys,
    getIndex,
    xScale,
    yScale,
    sizeScale,
    cellWidth,
    cellHeight,
    colorScale,
    getLabelTextColor,
}) =>
    data.reduce((acc, d) => {
        keys.forEach(key => {
            const width = sizeScale ? Math.min(sizeScale(d[key]) * cellWidth, cellWidth) : cellWidth
            const height = sizeScale
                ? Math.min(sizeScale(d[key]) * cellHeight, cellHeight)
                : cellHeight

            const node = {
                xKey: key,
                yKey: getIndex(d),
                x: xScale(key),
                y: yScale(getIndex(d)),
                width,
                height,
                value: d[key],
                color: colorScale(d[key]),
            }

            acc.push(
                Object.assign(node, {
                    labelTextColor: getLabelTextColor(node),
                })
            )
        })

        return acc
    }, [])

class HeatMapCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        this.draw(props)
        return false
    }

    draw(props) {
        const {
            width,
            height,
            outerWidth,
            outerHeight,
            margin,
            offsetX,
            offsetY,

            xScale,
            yScale,

            cellShape,
        } = props

        this.surface.width = outerWidth
        this.surface.height = outerHeight

        let renderNode
        if (cellShape === 'rect') {
            renderNode = partial(renderRect, this.ctx)
        } else {
            renderNode = partial(renderCircle, this.ctx)
        }

        const nodes = computeNodes(props)

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left + offsetX, margin.top + offsetY)

        renderAxes(this.ctx, {
            xScale,
            yScale,
            width: width - offsetX * 2,
            height: height - offsetY * 2,
            top: props.axisTop,
            right: props.axisRight,
            bottom: props.axisBottom,
            left: props.axisLeft,
        })

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'

        nodes.forEach(renderNode)
    }

    render() {
        const { outerWidth, outerHeight } = this.props

        return (
            <canvas
                ref={surface => {
                    this.surface = surface
                }}
                width={outerWidth}
                height={outerHeight}
            />
        )
    }
}

HeatMapCanvas.propTypes = HeatMapPropTypes

export default enhance(HeatMapCanvas)
