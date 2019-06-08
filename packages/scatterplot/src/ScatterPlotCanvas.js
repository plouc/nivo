/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import {
    withContainer,
    useDimensions,
    useTheme,
    getRelativeCursor,
    isCursorInRect,
    Container,
} from '@nivo/core'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { ScatterPlotCanvasPropTypes, ScatterPlotCanvasDefaultProps } from './props'
import { useScatterPlot } from './hooks'
import ScatterPlotTooltip from './ScatterPlotTooltip'

const ScatterPlotCanvas = props => {
    const {
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,

        width,
        height,
        margin: partialMargin,
        pixelRatio,

        layers,

        colors,
        blendMode,

        nodeSize,
        renderNode,

        enableGridX,
        gridXValues,
        enableGridY,
        gridYValues,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,

        isInteractive,
        useMesh,
        debugMesh,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,

        legends,
    } = props

    const canvasEl = useRef(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()

    const { xScale, yScale, nodes, legendData } = useScatterPlot({
        data,
        xScaleSpec,
        xFormat,
        yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        nodeSize,
        colors,
    })

    const customLayerProps = useMemo(
        () => ({
            ...props,
            xScale,
            yScale,
            nodes,
            margin,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
        }),
        [xScale, yScale, nodes, margin, innerWidth, innerHeight, outerWidth, outerHeight]
    )

    useEffect(() => {
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'grid') {
                ctx.lineWidth = theme.grid.line.strokeWidth
                ctx.strokeStyle = theme.grid.line.stroke

                enableGridX &&
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: xScale,
                        axis: 'x',
                        values: gridXValues,
                    })

                enableGridY &&
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: yScale,
                        axis: 'y',
                        values: gridYValues,
                    })
            } else if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale,
                    yScale,
                    width: innerWidth,
                    height: innerHeight,
                    top: axisTop,
                    right: axisRight,
                    bottom: axisBottom,
                    left: axisLeft,
                    theme,
                })
            } else if (layer === 'nodes') {
                nodes.forEach(node => {
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
                    ctx.fillStyle = node.style.color
                    ctx.fill()
                })
            } else if (layer === 'mesh') {
                if (useMesh === true && debugMesh === true) {
                }
            } else if (layer === 'legends') {
                legends.forEach(legend => {
                    renderLegendToCanvas(ctx, {
                        ...legend,
                        data: legendData,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        theme,
                    })
                })
            } else if (typeof layer === 'function') {
                layer(ctx, customLayerProps)
            } else {
                throw new Error(`Invalid layer: ${layer}`)
            }
        })
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin.top,
        margin.left,
        pixelRatio,
        layers,
        customLayerProps,
        theme,
        xScale,
        yScale,
        nodes,
        enableGridX,
        enableGridY,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        legends,
        legendData,
    ])

    return (
        <canvas
            ref={canvasEl}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
            // onMouseEnter={isInteractive ? handleMouseHover : undefined}
            // onMouseMove={isInteractive ? handleMouseHover : undefined}
            // onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            // onClick={isInteractive ? handleClick : undefined}
        />
    )
}

ScatterPlotCanvas.propTypes = ScatterPlotCanvasPropTypes
ScatterPlotCanvas.defaultProps = ScatterPlotCanvasDefaultProps

export default memo(withContainer(ScatterPlotCanvas))

/*
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
        if (point !== undefined && point !== null) {
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
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme} animate={false}>
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
*/
