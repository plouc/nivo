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
import { renderLegendToCanvas } from '@nivo/legends'
import { renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { ScatterPlotPropTypes } from './props'
import { enhanceCanvas } from './enhance'
import ScatterPlotTooltip from './ScatterPlotTooltip'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(
            node.x + margin.left - node.size / 2,
            node.y + margin.top - node.size / 2,
            node.size,
            node.size,
            x,
            y
        )
    )

class ScatterPlotCanvas extends Component {
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
            point = findNodeUnderCursor(points, margin, x, y)
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
            const { theme, tooltipFormat, tooltip, getColor } = this.props
            showTooltip(
                <ScatterPlotTooltip
                    point={point}
                    color={getColor(point.data)}
                    format={tooltipFormat}
                    tooltip={tooltip}
                    theme={theme}
                />,
                event
            )
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
            data,

            computedData,
            points,

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

            useMesh,
            debugMesh,
            voronoi,

            theme,
            getSymbolSize,
            getColor,

            legends,
        } = props

        const { xScale, yScale } = computedData

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.fillStyle = theme.background
        this.ctx.fillRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        this.ctx.strokeStyle = '#dddddd'
        enableGridX &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: xScale,
                axis: 'x',
            })
        enableGridY &&
            renderGridLinesToCanvas(this.ctx, {
                width,
                height,
                scale: yScale,
                axis: 'y',
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

        points.forEach(point => {
            this.ctx.beginPath()
            this.ctx.arc(point.x, point.y, getSymbolSize(point.data) / 2, 0, 2 * Math.PI)
            this.ctx.fillStyle = getColor(point.data)
            this.ctx.fill()
        })

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

ScatterPlotCanvas.propTypes = ScatterPlotPropTypes

export default enhanceCanvas(ScatterPlotCanvas)
