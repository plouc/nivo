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
import { getRelativeCursor, cursorInRect } from '../../../lib/interactivity'
import { renderRect, renderCircle } from '../../../lib/canvas/charts/heatmap'
import { computeNodes } from '../../../lib/charts/heatmap'
import BasicTooltip from '../../tooltip/BasicTooltip'
import Container from '../Container'
import { HeatMapPropTypes } from './props'
import enhance from './enhance'

class HeatMapCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    draw(props) {
        const {
            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,
            offsetX,
            offsetY,

            xScale,
            yScale,

            cellShape,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

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

        this.nodes = nodes
    }

    handleMouseHover = (showTooltip, hideTooltip, event) => {
        if (!this.nodes) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const { margin, offsetX, offsetY, theme, setCurrentNode } = this.props
        const node = this.nodes.find(node =>
            cursorInRect(
                node.x + margin.left + offsetX - node.width / 2,
                node.y + margin.top + offsetY - node.height / 2,
                node.width,
                node.height,
                x,
                y
            )
        )

        if (node !== undefined) {
            setCurrentNode(node)
            showTooltip(
                <BasicTooltip
                    id={`${node.yKey} - ${node.xKey}`}
                    value={node.value}
                    enableChip={true}
                    color={node.color}
                    theme={theme}
                />,
                event
            )
        } else {
            setCurrentNode(null)
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => {
        this.props.setCurrentNode(null)
        hideTooltip()
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) =>
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                        }}
                        onMouseEnter={partial(this.handleMouseHover, showTooltip, hideTooltip)}
                        onMouseMove={partial(this.handleMouseHover, showTooltip, hideTooltip)}
                        onMouseLeave={partial(this.handleMouseLeave, hideTooltip)}
                    />}
            </Container>
        )
    }
}

HeatMapCanvas.propTypes = HeatMapPropTypes

export default enhance(HeatMapCanvas)
