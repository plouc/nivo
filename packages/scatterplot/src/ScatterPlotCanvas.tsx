import { createElement, useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Container, useDimensions, useTheme, getRelativeCursor, isCursorInRect } from '@nivo/core'
import { renderAnnotationsToCanvas } from '@nivo/annotations'
import { CanvasAxisProp, renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { canvasDefaultProps, svgDefaultProps } from './props'
import { useScatterPlot, useScatterPlotAnnotations } from './hooks'
import { ScatterPlotCanvasProps, ScatterPlotDatum, ScatterPlotNodeData } from './types'

type InnerScatterPlotCanvasProps<RawDatum extends ScatterPlotDatum> = Omit<
    ScatterPlotCanvasProps<RawDatum>,
    'renderWrapper' | 'theme'
>

const InnerScatterPlotCanvas = <RawDatum extends ScatterPlotDatum>({
    data,
    xScale: xScaleSpec = canvasDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = canvasDefaultProps.yScale,
    yFormat,
    width,
    height,
    margin: partialMargin,
    pixelRatio = canvasDefaultProps.pixelRatio,
    layers = canvasDefaultProps.layers,
    colors = canvasDefaultProps.colors,
    nodeId = svgDefaultProps.nodeId,
    nodeSize = canvasDefaultProps.nodeSize,
    renderNode = canvasDefaultProps.renderNode,
    enableGridX = canvasDefaultProps.enableGridX,
    gridXValues,
    enableGridY = canvasDefaultProps.enableGridY,
    gridYValues,
    axisTop,
    axisRight,
    axisBottom = canvasDefaultProps.axisBottom,
    axisLeft = canvasDefaultProps.axisLeft,
    annotations = canvasDefaultProps.annotations,
    isInteractive = canvasDefaultProps.isInteractive,
    debugMesh = canvasDefaultProps.debugMesh,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = canvasDefaultProps.tooltip,
    legends = canvasDefaultProps.legends,
}: InnerScatterPlotCanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()
    const [currentNode, setCurrentNode] = useState<ScatterPlotNodeData<RawDatum> | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { xScale, yScale, nodes, legendData } = useScatterPlot<RawDatum>({
        data,
        xScaleSpec,
        xFormat,
        yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        nodeId,
        nodeSize,
        colors,
    })

    const boundAnnotations = useScatterPlotAnnotations<RawDatum>(nodes, annotations)

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
    })

    const customLayerProps = useMemo(
        () => ({
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
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'grid') {
                ctx.lineWidth = theme.grid.line.strokeWidth as number
                ctx.strokeStyle = theme.grid.line.stroke as string

                enableGridX &&
                    renderGridLinesToCanvas<RawDatum['x']>(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: xScale as any,
                        axis: 'x',
                        values: gridXValues,
                    })

                enableGridY &&
                    renderGridLinesToCanvas<RawDatum['y']>(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: yScale as any,
                        axis: 'y',
                        values: gridYValues,
                    })
            } else if (layer === 'annotations') {
                renderAnnotationsToCanvas<ScatterPlotNodeData<RawDatum>>(ctx, {
                    annotations: boundAnnotations as any,
                    theme,
                })
            } else if (layer === 'axes') {
                renderAxesToCanvas<RawDatum['x'], RawDatum['y']>(ctx, {
                    xScale: xScale as any,
                    yScale: yScale as any,
                    width: innerWidth,
                    height: innerHeight,
                    top: axisTop as CanvasAxisProp<RawDatum['x']>,
                    right: axisRight as CanvasAxisProp<RawDatum['y']>,
                    bottom: axisBottom as CanvasAxisProp<RawDatum['x']>,
                    left: axisLeft as CanvasAxisProp<RawDatum['y']>,
                    theme,
                })
            } else if (layer === 'nodes') {
                nodes.forEach(node => {
                    renderNode(ctx, node)
                })
            } else if (layer === 'mesh') {
                if (debugMesh === true) {
                    renderVoronoiToCanvas(ctx, voronoi!)
                    if (currentNode) {
                        renderVoronoiCellToCanvas(ctx, voronoi!, currentNode.index)
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
            const [x, y] = getRelativeCursor(canvasEl.current!, event)
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
                showTooltipFromEvent(createElement(tooltip, { node }), event)
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

export const ScatterPlotCanvas = <RawDatum extends ScatterPlotDatum>({
    isInteractive,
    renderWrapper,
    theme,
    ...props
}: ScatterPlotCanvasProps<RawDatum>) => (
    <Container {...{ isInteractive, renderWrapper, theme }} animate={false}>
        <InnerScatterPlotCanvas<RawDatum> {...props} />
    </Container>
)
