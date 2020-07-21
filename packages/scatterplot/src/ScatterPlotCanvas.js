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
} from '@nivo/core'
import { renderAnnotationsToCanvas } from '@nivo/annotations'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { ScatterPlotCanvasPropTypes, ScatterPlotCanvasDefaultProps } from './props'
import { useScatterPlot, useScatterPlotAnnotations } from './hooks'

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

        annotations,

        isInteractive,
        debugMesh,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,

        legends,
    } = props

    const canvasEl = useRef(null)
    const theme = useTheme()
    const [currentNode, setCurrentNode] = useState(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

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

    const boundAnnotations = useScatterPlotAnnotations(nodes, annotations)

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
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
            } else if (layer === 'annotations') {
                renderAnnotationsToCanvas(ctx, { annotations: boundAnnotations, theme })
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
                    renderNode(ctx, node)
                })
            } else if (layer === 'mesh') {
                if (debugMesh === true) {
                    renderVoronoiToCanvas(ctx, voronoi)
                    if (currentNode) {
                        renderVoronoiCellToCanvas(ctx, voronoi, currentNode.index)
                    }
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
        renderNode,
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
        debugMesh,
        voronoi,
        currentNode,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const getNodeFromMouseEvent = useCallback(
        event => {
            const [x, y] = getRelativeCursor(canvasEl.current, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) return null

            const nodeIndex = delaunay.find(x - margin.left, y - margin.top)
            return nodes[nodeIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay]
    )

    const handleMouseHover = useCallback(
        event => {
            const node = getNodeFromMouseEvent(event)
            setCurrentNode(node)

            if (node) {
                showTooltipFromEvent(React.createElement(tooltip, { node }), event)
                if (currentNode && currentNode.id !== node.id) {
                    onMouseLeave && onMouseLeave(currentNode, event)
                    onMouseEnter && onMouseEnter(node, event)
                }
                if (!currentNode) {
                    onMouseEnter && onMouseEnter(node, event)
                }
                onMouseMove && onMouseMove(node, event)
            } else {
                hideTooltip()
                currentNode && onMouseLeave && onMouseLeave(currentNode, event)
            }
        },
        [
            getNodeFromMouseEvent,
            currentNode,
            setCurrentNode,
            showTooltipFromEvent,
            hideTooltip,
            tooltip,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
        ]
    )

    const handleMouseLeave = useCallback(
        event => {
            hideTooltip()
            setCurrentNode(null)
            currentNode && onMouseLeave && onMouseLeave(currentNode, event)
        },
        [hideTooltip, currentNode, setCurrentNode, onMouseLeave]
    )

    const handleClick = useCallback(
        event => {
            if (onClick) {
                const node = getNodeFromMouseEvent(event)
                node && onClick(node, event)
            }
        },
        [getNodeFromMouseEvent, onClick]
    )

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
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

ScatterPlotCanvas.propTypes = ScatterPlotCanvasPropTypes
ScatterPlotCanvas.defaultProps = {
    ...ScatterPlotCanvasDefaultProps,
    renderNode: (ctx, node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
        ctx.fillStyle = node.style.color
        ctx.fill()
    },
}

export default memo(withContainer(ScatterPlotCanvas))
