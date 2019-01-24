/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { renderGridLinesToCanvas, getRelativeCursor, isCursorInRect, Container } from '@nivo/core'
import { renderAxesToCanvas } from '@nivo/axes'
// import { renderLegendToCanvas } from '@nivo/legends'
// import { renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { BeeSwarmCanvasPropTypes } from './props'
import { enhanceCanvas } from './enhance'

class BeeSwarmCanvasImplementation extends Component {
    static propTypes = BeeSwarmCanvasPropTypes

    state = {}

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

    handleMouseEnter = () => {}

    getPointForMouseEvent = event => {
        const {
            points,
            margin,
            width,
            height,
            useMesh,
            delaunay,
            onMouseMove,
            onMouseLeave,
        } = this.props
        const [x, y] = getRelativeCursor(this.surface, event)

        let pointIndex
        let point
        if (useMesh === true) {
            if (isCursorInRect(margin.left, margin.top, width, height, x, y)) {
                pointIndex = delaunay.find(x - margin.left, y - margin.top)
                point = points[pointIndex]
            } else {
                pointIndex = null
                point = null
            }
        } else {
            // point = findNodeUnderCursor(points, margin, x, y)
        }

        if (point && onMouseMove !== undefined) {
            onMouseMove(point, event)
        } else if (!point && this.state.point && onMouseLeave !== undefined) {
            onMouseLeave(this.state.point, event)
        }

        this.setState({ pointIndex, point })

        return point
    }

    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const point = this.getPointForMouseEvent(event)
        if (point) {
            // const { theme, tooltipFormat, tooltip, getColor } = this.props
            showTooltip('crap', event)
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        hideTooltip()
    }

    handleClick = event => {
        const point = this.getPointForMouseEvent(event)
        if (point !== undefined) {
            this.props.onClick(point.data, event)
        }
    }

    draw(props) {
        const {
            nodes,
            renderNode,
            xScale,
            yScale,
            nodeSize,
            borderWidth,
            getBorderColor,
            width,
            height,
            outerWidth,
            outerHeight,
            pixelRatio,
            margin,
            axisTop,
            axisRight,
            axisBottom,
            axisLeft,
            enableGridX,
            enableGridY,
            // useMesh,
            // debugMesh,
            // voronoi,
            theme,
            getColor,
            // legends,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        enableGridX &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: xScale,
                axis: 'x',
                theme,
            })
        enableGridY &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: yScale,
                axis: 'y',
                theme,
            })

        this.ctx.strokeStyle = '#000000'
        renderAxesToCanvas(this.ctx, {
            xScale,
            yScale,
            width,
            height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        nodes.forEach(node => {
            renderNode(this.ctx, {
                node,
                x: node.x,
                y: node.y,
                size: nodeSize,
                color: node.color,
                borderWidth,
                borderColor: getBorderColor(node),
            })
        })

        /*
        if (useMesh === true && debugMesh === true) {
            const { pointIndex } = this.state
            renderVoronoiToCanvas(this.ctx, voronoi)
            if (pointIndex !== null) {
                renderVoronoiCellToCanvas(this.ctx, voronoi, pointIndex)
            }
        }

        const legendData = data.map(serie => ({
            id: serie.id,
            label: serie.id,
            color: getColor({ serie }),
        }))

        legends.forEach(legend => {
            renderLegendToCanvas(this.ctx, {
                ...legend,
                data: legendData,
                containerWidth: width,
                containerHeight: height,
            })
        })
        */
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {(/*{ showTooltip, hideTooltip }*/) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                            cursor: isInteractive ? 'crosshair' : 'normal',
                        }}
                        //onMouseEnter={this.handleMouseHover(showTooltip, hideTooltip)}
                        //onMouseMove={this.handleMouseHover(showTooltip, hideTooltip)}
                        //onMouseLeave={this.handleMouseLeave(hideTooltip)}
                        //onClick={this.handleClick}
                    />
                )}
            </Container>
        )
    }
}

BeeSwarmCanvasImplementation.displayName = 'BeeSwarmCanvas'

export const BeeSwarmCanvas = enhanceCanvas(BeeSwarmCanvasImplementation)
