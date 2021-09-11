import { createElement, useCallback, useEffect, useRef, useState } from 'react'
import * as React from 'react'
import isNumber from 'lodash/isNumber'
import { Container, getRelativeCursor, isCursorInRect, useDimensions, useTheme } from '@nivo/core'
import { InheritedColorConfig, OrdinalColorScaleConfig, useInheritedColor } from '@nivo/colors'
import { AnyScale } from '@nivo/scales'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { ComputedDatum, SwarmPlotCanvasProps } from './types'
import { defaultProps } from './props'
import { useSwarmPlot } from './hooks'

export const renderCircleDefault = <RawDatum,>(
    ctx: CanvasRenderingContext2D,
    {
        node,
        getBorderWidth,
        getBorderColor,
    }: {
        node: ComputedDatum<RawDatum>
        getBorderWidth: (node: ComputedDatum<RawDatum>) => number
        getBorderColor: (node: ComputedDatum<RawDatum>) => string
    }
) => {
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

type InnerSwarmCanvasPlotProps<RawDatum> = Partial<
    Omit<
        SwarmPlotCanvasProps<RawDatum>,
        'data' | 'groups' | 'width' | 'height' | 'isInteractive' | 'animate' | 'motionConfig'
    >
> &
    Pick<SwarmPlotCanvasProps<RawDatum>, 'data' | 'groups' | 'width' | 'height' | 'isInteractive'>

export const InnerSwarmPlotCanvas = <RawDatum,>({
    data,
    width,
    height,
    margin: partialMargin,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    valueScale = defaultProps.valueScale,
    groups,
    groupBy = defaultProps.groupBy,
    size = defaultProps.size,
    forceStrength = defaultProps.forceStrength,
    simulationIterations = defaultProps.simulationIterations,
    colors = defaultProps.colors as OrdinalColorScaleConfig<Omit<ComputedDatum<RawDatum>, 'color'>>,
    colorBy = defaultProps.colorBy,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    layout = defaultProps.layout,
    spacing = defaultProps.spacing,
    gap = defaultProps.gap,
    layers = defaultProps.layers,
    renderCircle = renderCircleDefault,
    debugMesh = defaultProps.debugMesh,
    enableGridX,
    gridXValues,
    enableGridY,
    gridYValues,
    axisTop = defaultProps.axisTop,
    axisRight = defaultProps.axisRight,
    axisBottom = defaultProps.axisBottom,
    axisLeft = defaultProps.axisLeft,
    isInteractive,
    onMouseMove,
    onClick,
    tooltip = defaultProps.tooltip,
    role = defaultProps.role,
    pixelRatio = defaultProps.pixelRatio,
}: InnerSwarmCanvasPlotProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()
    const [currentNode, setCurrentNode] = useState<ComputedDatum<RawDatum> | null>(null)

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, ...scales } = useSwarmPlot<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        id,
        value,
        valueFormat,
        valueScale,
        groups,
        groupBy,
        size,
        spacing,
        layout,
        gap,
        colors,
        colorBy,
        forceStrength,
        simulationIterations,
    })

    const { xScale, yScale } = scales as Record<'xScale' | 'yScale', AnyScale>

    const { delaunay, voronoi } = useVoronoiMesh<ComputedDatum<RawDatum>>({
        points: nodes,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
    })

    const getBorderColor = useInheritedColor(borderColor, theme)
    const getBorderWidth = () => 1

    useEffect(() => {
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        if (!ctx) return

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.save()
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (
                layer === 'grid' &&
                isNumber(theme.grid.line.strokeWidth) &&
                theme.grid.line.strokeWidth > 0
            ) {
                ctx.lineWidth = theme.grid.line.strokeWidth
                ctx.strokeStyle = theme.grid.line.stroke as string

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

            if (layer === 'circles') {
                nodes.forEach(node => {
                    renderCircle(ctx, {
                        node,
                        getBorderWidth,
                        getBorderColor,
                    })
                })
            }

            if (layer === 'mesh' && debugMesh && voronoi) {
                renderVoronoiToCanvas(ctx, voronoi)
                if (currentNode) {
                    renderVoronoiCellToCanvas(ctx, voronoi, currentNode.index)
                }
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        pixelRatio,
        margin,
        theme,
        layers,
        xScale,
        yScale,
        enableGridX,
        gridXValues,
        enableGridY,
        gridYValues,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        voronoi,
        debugMesh,
        currentNode,
        nodes,
        renderCircle,
        getBorderWidth,
        getBorderColor,
    ])

    const getNodeFromMouseEvent = useCallback(
        (event: React.MouseEvent) => {
            if (!canvasEl.current) {
                return null
            }

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) {
                return null
            }

            const nodeIndex = delaunay.find(x - margin.left, y - margin.top)
            return nodes[nodeIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay, nodes]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const showNodeTooltip = useCallback(
        (node: ComputedDatum<RawDatum>, event: React.MouseEvent) => {
            showTooltipFromEvent(createElement(tooltip, node), event)
        },
        [showTooltipFromEvent, tooltip]
    )

    const handleMouseHover = useCallback(
        (event: React.MouseEvent) => {
            const node = getNodeFromMouseEvent(event)
            setCurrentNode(node)

            if (node) {
                onMouseMove?.(node, event)
                showNodeTooltip(node, event)
            } else {
                hideTooltip()
            }
        },
        [getNodeFromMouseEvent, setCurrentNode, onMouseMove, showNodeTooltip, hideTooltip]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setCurrentNode(null)
    }, [hideTooltip, setCurrentNode])

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            const node = getNodeFromMouseEvent(event)
            if (node) {
                onClick?.(node, event)
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
            role={role}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

export const SwarmPlotCanvas = <RawDatum,>({
    theme,
    isInteractive = defaultProps.isInteractive,
    animate = defaultProps.animate,
    motionConfig = defaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: Partial<Omit<SwarmPlotCanvasProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>> &
    Pick<SwarmPlotCanvasProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerSwarmPlotCanvas<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
