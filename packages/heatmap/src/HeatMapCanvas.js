/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import partial from 'lodash/partial'
import { Container, getRelativeCursor, isCursorInRect } from '@nivo/core'
import { renderAxesToCanvas } from '@nivo/axes'
import { renderRect, renderCircle } from './canvas'
import computeNodes from './computeNodes'
import HeatMapCellTooltip from './HeatMapCellTooltip'
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

            axisTop,
            axisRight,
            axisBottom,
            axisLeft,

            cellShape,

            enableLabels,

            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        let renderNode
        if (cellShape === 'rect') {
            renderNode = partial(renderRect, this.ctx, { enableLabels, theme })
        } else {
            renderNode = partial(renderCircle, this.ctx, { enableLabels, theme })
        }

        const nodes = computeNodes(props)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left + offsetX, margin.top + offsetY)

        renderAxesToCanvas(this.ctx, {
            xScale,
            yScale,
            width: width - offsetX * 2,
            height: height - offsetY * 2,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'

        nodes.forEach(renderNode)

        this.nodes = nodes
    }

    handleMouseHover = (showTooltip, hideTooltip, event) => {
        if (!this.nodes) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const { margin, offsetX, offsetY, theme, setCurrentNode, tooltip } = this.props
        const node = this.nodes.find(node =>
            isCursorInRect(
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
            showTooltip(<HeatMapCellTooltip node={node} theme={theme} tooltip={tooltip} />, event)
        } else {
            setCurrentNode(null)
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => {
        this.props.setCurrentNode(null)
        hideTooltip()
    }

    handleClick = event => {
        if (!this.props.currentNode) return

        this.props.onClick(this.props.currentNode, event)
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
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
                        onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

HeatMapCanvas.propTypes = HeatMapPropTypes

export default enhance(HeatMapCanvas)
