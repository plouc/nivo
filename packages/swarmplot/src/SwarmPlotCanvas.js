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
    getRelativeCursor,
    isCursorInRect,
    withContainer,
    useDimensions,
    useTheme,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { useComputedAnnotations, renderAnnotationsToCanvas } from '@nivo/annotations'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { SwarmPlotCanvasDefaultProps, SwarmPlotCanvasPropTypes } from './props'
import { useSwarmPlot, useBorderWidth, useSwarmPlotAnnotations } from './hooks'
import SwarmPlotTooltip from './SwarmPlotTooltip'

export const renderCanvasNode = (ctx, { node, getBorderWidth, getBorderColor }) => {
    const nodeBorderWidth = getBorderWidth(node)
    if (nodeBorderWidth > 0) {
        ctx.strokeStyle = getBorderColor(node)
        ctx.lineWidth = nodeBorderWidth
    }

    ctx.beginPath()
    ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
    ctx.fillStyle = node.color
    ctx.fill()

    if (nodeBorderWidth > 0) {
        ctx.stroke()
    }
}

const SwarmPlotCanvas = memo(
    ({
        pixelRatio,
        width,
        height,
        margin: partialMargin,
        data,
        groups,
        groupBy,
        identity,
        label,
        value,
        valueFormat,
        valueScale,
        size,
        spacing,
        layout,
        gap,
        forceStrength,
        simulationIterations,
        layers,
        renderNode,
        colors,
        colorBy,
        borderWidth,
        borderColor,
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
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
        debugMesh,
    }) => {
        const canvasEl = useRef(null)
        const [currentNode, setCurrentNode] = useState(null)
        const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
            width,
            height,
            partialMargin
        )
        const theme = useTheme()

        const { nodes, xScale, yScale } = useSwarmPlot({
            width: innerWidth,
            height: innerHeight,
            data,
            groups,
            groupBy,
            identity,
            label,
            value,
            valueFormat,
            valueScale,
            size,
            spacing,
            layout,
            gap,
            colors,
            colorBy,
            forceStrength,
            simulationIterations,
        })

        const boundAnnotations = useSwarmPlotAnnotations(nodes, annotations)
        const computedAnnotations = useComputedAnnotations({
            annotations: boundAnnotations,
            innerWidth,
            innerHeight,
        })

        const getBorderWidth = useBorderWidth(borderWidth)
        const getBorderColor = useInheritedColor(borderColor, theme)

        const { delaunay, voronoi } = useVoronoiMesh({
            points: nodes,
            width: innerWidth,
            height: innerHeight,
            debug: debugMesh,
        })

        useEffect(() => {
            canvasEl.current.width = outerWidth * pixelRatio
            canvasEl.current.height = outerHeight * pixelRatio

            const ctx = canvasEl.current.getContext('2d')

            ctx.scale(pixelRatio, pixelRatio)

            ctx.fillStyle = theme.background
            ctx.fillRect(0, 0, outerWidth, outerHeight)
            ctx.translate(margin.left, margin.top)

            layers.forEach(layer => {
                if (layer === 'grid' && theme.grid.line.strokeWidth > 0) {
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
                }

                if (layer === 'axes') {
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
                }

                if (layer === 'nodes') {
                    nodes.forEach(node => {
                        renderNode(ctx, {
                            node,
                            getBorderWidth,
                            getBorderColor,
                        })
                    })
                }

                if (layer === 'mesh' && debugMesh === true) {
                    renderVoronoiToCanvas(ctx, voronoi)
                    if (currentNode) {
                        renderVoronoiCellToCanvas(ctx, voronoi, currentNode.index)
                    }
                }

                if (layer === 'annotations') {
                    renderAnnotationsToCanvas(ctx, {
                        annotations: computedAnnotations,
                        theme,
                    })
                }

                if (typeof layer === 'function') {
                    layer(ctx, {
                        nodes,
                        innerWidth,
                        innerHeight,
                        outerWidth,
                        outerHeight,
                        margin,
                        xScale,
                        yScale,
                    })
                }
            })
        }, [
            canvasEl,
            innerWidth,
            innerHeight,
            outerWidth,
            outerHeight,
            margin,
            pixelRatio,
            theme,
            layers,
            nodes,
            xScale,
            yScale,
            getBorderWidth,
            getBorderColor,
            voronoi,
            currentNode,
            computedAnnotations,
        ])

        const { showTooltipFromEvent, hideTooltip } = useTooltip()
        const showNodeTooltip = useMemo(() => {
            if (tooltip) return (node, event) => showTooltipFromEvent(tooltip({ node }), event)
            return (node, event) => showTooltipFromEvent(<SwarmPlotTooltip node={node} />, event)
        }, [showTooltipFromEvent, tooltip])

        const getNodeFromMouseEvent = useCallback(
            event => {
                const [x, y] = getRelativeCursor(canvasEl.current, event)
                if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y))
                    return null

                const nodeIndex = delaunay.find(x - margin.left, y - margin.top)
                return nodes[nodeIndex]
            },
            [canvasEl, margin, innerWidth, innerHeight, delaunay]
        )

        const handleMouseHover = useCallback(
            event => {
                const node = getNodeFromMouseEvent(event)
                setCurrentNode(node)
                onMouseMove && onMouseMove(node, event)
                if (node) {
                    showNodeTooltip(node, event)
                    if ((!currentNode || currentNode.id !== node.id) && onMouseEnter) {
                        onMouseEnter(node, event)
                    }
                    if (currentNode && currentNode.id !== node.id && onMouseLeave) {
                        onMouseLeave(currentNode, event)
                    }
                } else {
                    currentNode && onMouseLeave && onMouseLeave(currentNode, event)
                    hideTooltip()
                }
            },
            [
                getNodeFromMouseEvent,
                currentNode,
                onMouseEnter,
                onMouseLeave,
                showNodeTooltip,
                hideTooltip,
            ]
        )

        const handleMouseLeave = useCallback(
            event => {
                hideTooltip()
                setCurrentNode(null)
                onMouseLeave && onMouseLeave(currentNode, event)
            },
            [hideTooltip, setCurrentNode, currentNode, onMouseLeave]
        )

        const handleClick = useCallback(
            event => {
                const node = getNodeFromMouseEvent(event)
                node && onClick && onClick(node, event)
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
)

SwarmPlotCanvas.displayName = 'SwarmPlotCanvas'
SwarmPlotCanvas.propTypes = SwarmPlotCanvasPropTypes
SwarmPlotCanvas.defaultProps = {
    ...SwarmPlotCanvasDefaultProps,
    renderNode: renderCanvasNode,
}

export default withContainer(SwarmPlotCanvas)
