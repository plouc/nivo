/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { degreesToRadians } from '@nivo/core'
import { getRelativeCursor, isCursorInRect } from '@nivo/core'
import { Container } from '@nivo/core'
import { TreeMapCanvasPropTypes } from './props'
import enhance from './enhance'
import TreeMapNodeTooltip from './TreeMapNodeTooltip'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

class TreeMapCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    draw(props) {
        const {
            nodes,

            pixelRatio,

            margin,
            outerWidth,
            outerHeight,

            borderWidth,
            getBorderColor,

            enableLabel,
            getLabelTextColor,
            orientLabel,

            theme,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        nodes.forEach(node => {
            this.ctx.fillStyle = node.color
            this.ctx.fillRect(node.x, node.y, node.width, node.height)

            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(node)
                this.ctx.lineWidth = borderWidth
                this.ctx.strokeRect(node.x, node.y, node.width, node.height)
            }
        })

        if (enableLabel) {
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            // draw labels on top
            nodes
                .filter(({ label }) => label !== undefined)
                .forEach(node => {
                    const labelTextColor = getLabelTextColor(node)

                    const rotate = orientLabel && node.height > node.width

                    this.ctx.save()
                    this.ctx.translate(node.x + node.width / 2, node.y + node.height / 2)
                    this.ctx.rotate(degreesToRadians(rotate ? -90 : 0))

                    this.ctx.fillStyle = labelTextColor
                    this.ctx.fillText(node.label, 0, 0)

                    this.ctx.restore()
                })
        }
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const { isInteractive, nodes, margin, theme } = this.props

        if (!isInteractive) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const node = findNodeUnderCursor(nodes, margin, x, y)

        if (node !== undefined) {
            showTooltip(<TreeMapNodeTooltip node={node} theme={theme} />, event)
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        const { isInteractive, nodes, margin, onClick } = this.props

        if (!isInteractive) return

        const [x, y] = getRelativeCursor(this.surface, event)

        const node = findNodeUnderCursor(nodes, margin, x, y)
        if (node !== undefined) onClick(node, event)
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
                        onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                        onMouseLeave={this.handleMouseLeave(hideTooltip)}
                        onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

TreeMapCanvas.propTypes = TreeMapCanvasPropTypes
TreeMapCanvas.displayName = 'TreeMapCanvas'

const enhancedTreeMapCanvas = enhance(TreeMapCanvas)
enhancedTreeMapCanvas.displayName = 'TreeMapCanvas'

export default enhancedTreeMapCanvas
