import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState, createElement } from 'react'
import { Container, getRelativeCursor, isCursorInRect, useDimensions, useTheme } from '@nivo/core'
import { setCanvasFont } from '@nivo/text'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { DefaultDatum, TreeCanvasProps, CustomCanvasLayerProps, ComputedNode } from './types'
import { canvasDefaultProps } from './defaults'
import { useTree } from './hooks'
import { useLabels } from './labelsHooks'

type InnerTreeCanvasProps<Datum> = Omit<
    TreeCanvasProps<Datum>,
    'animate' | 'motionConfig' | 'renderWrapper' | 'theme'
>

const InnerTreeCanvas = <Datum,>({
    width,
    height,
    pixelRatio = canvasDefaultProps.pixelRatio,
    margin: partialMargin,
    data,
    identity,
    mode = canvasDefaultProps.mode,
    layout = canvasDefaultProps.layout,
    nodeSize = canvasDefaultProps.nodeSize,
    activeNodeSize,
    inactiveNodeSize,
    nodeColor = canvasDefaultProps.nodeColor,
    fixNodeColorAtDepth = canvasDefaultProps.fixNodeColorAtDepth,
    renderNode = canvasDefaultProps.renderNode,
    linkCurve = canvasDefaultProps.linkCurve,
    linkThickness = canvasDefaultProps.linkThickness,
    activeLinkThickness,
    inactiveLinkThickness,
    linkColor = canvasDefaultProps.linkColor,
    renderLink = canvasDefaultProps.renderLink,
    enableLabel = canvasDefaultProps.enableLabel,
    label = canvasDefaultProps.label,
    labelsPosition = canvasDefaultProps.labelsPosition,
    orientLabel = canvasDefaultProps.orientLabel,
    labelOffset = canvasDefaultProps.labelOffset,
    renderLabel = canvasDefaultProps.renderLabel,
    layers = canvasDefaultProps.layers,
    isInteractive = canvasDefaultProps.isInteractive,
    // meshDetectionThreshold = canvasDefaultProps.meshDetectionThreshold,
    debugMesh = canvasDefaultProps.debugMesh,
    highlightAncestorNodes = canvasDefaultProps.highlightAncestorNodes,
    highlightDescendantNodes = canvasDefaultProps.highlightDescendantNodes,
    highlightAncestorLinks = canvasDefaultProps.highlightAncestorLinks,
    highlightDescendantLinks = canvasDefaultProps.highlightDescendantLinks,
    // onNodeMouseEnter,
    // onNodeMouseMove,
    // onNodeMouseLeave,
    onNodeClick,
    nodeTooltip,
    role = canvasDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerTreeCanvasProps<Datum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()

    const { nodes, nodeByUid, links, linkGenerator, setCurrentNode } = useTree<Datum>({
        data,
        identity,
        layout,
        mode,
        width: innerWidth,
        height: innerHeight,
        nodeSize,
        activeNodeSize,
        inactiveNodeSize,
        nodeColor,
        fixNodeColorAtDepth,
        highlightAncestorNodes,
        highlightDescendantNodes,
        linkCurve,
        linkThickness,
        activeLinkThickness,
        inactiveLinkThickness,
        linkColor,
        highlightAncestorLinks,
        highlightDescendantLinks,
    })

    const labels = useLabels<Datum>({
        nodes,
        label,
        layout,
        labelsPosition,
        orientLabel,
        labelOffset,
    })

    const { delaunay, voronoi } = useVoronoiMesh({
        points: nodes,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
    })

    const customLayerProps: CustomCanvasLayerProps<Datum> = useMemo(
        () => ({
            nodes,
            nodeByUid,
            links,
            innerWidth,
            innerHeight,
            linkGenerator,
        }),
        [nodes, nodeByUid, links, innerWidth, innerHeight, linkGenerator]
    )

    const [currentNodeIndex, setCurrentNodeIndex] = useState<number | null>(null)

    useEffect(() => {
        if (canvasEl.current === null) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'links') {
                linkGenerator.context(ctx)

                links.forEach(link => {
                    renderLink(ctx, { link, linkGenerator })
                })
            } else if (layer === 'nodes') {
                nodes.forEach(node => {
                    renderNode(ctx, { node })
                })
            } else if (layer === 'labels' && enableLabel) {
                setCanvasFont(ctx, theme.labels.text)

                labels.forEach(label => {
                    renderLabel(ctx, { label, theme })
                })
            } else if (layer === 'mesh' && debugMesh) {
                renderVoronoiToCanvas(ctx, voronoi!)
                if (currentNodeIndex !== null) {
                    renderVoronoiCellToCanvas(ctx, voronoi!, currentNodeIndex)
                }
            } else if (typeof layer === 'function') {
                layer(ctx, customLayerProps)
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        pixelRatio,
        margin.left,
        margin.top,
        theme,
        layers,
        nodes,
        nodeByUid,
        renderNode,
        links,
        renderLink,
        linkGenerator,
        labels,
        enableLabel,
        renderLabel,
        voronoi,
        debugMesh,
        currentNodeIndex,
        customLayerProps,
    ])

    const getNodeFromMouseEvent = useCallback(
        (
            event: MouseEvent<HTMLCanvasElement>
        ): [node: ComputedNode<Datum> | null, nodeIndex: number | null] => {
            const [x, y] = getRelativeCursor(canvasEl.current!, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y))
                return [null, null]

            const nodeIndex = delaunay.find(x - margin.left, y - margin.top)
            return [nodes[nodeIndex], nodeIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay, nodes]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            const [node, nodeIndex] = getNodeFromMouseEvent(event)
            setCurrentNode(node)
            setCurrentNodeIndex(nodeIndex)

            if (node) {
                nodeTooltip && showTooltipFromEvent(createElement(nodeTooltip, { node }), event)

                /*
                if (currentNode && currentNode.id !== node.id) {
                    onMouseLeave && onMouseLeave(currentNode, event)
                    onMouseEnter && onMouseEnter(node, event)
                }
                if (!currentNode) {
                    onMouseEnter && onMouseEnter(node, event)
                }
                onMouseMove && onMouseMove(node, event)
                */
            } else {
                hideTooltip()
                // currentNode && onMouseLeave && onMouseLeave(currentNode, event)
            }
        },
        [
            getNodeFromMouseEvent,
            // currentNode,
            setCurrentNode,
            setCurrentNodeIndex,
            showTooltipFromEvent,
            hideTooltip,
            nodeTooltip,
            // onMouseEnter,
            // onMouseMove,
            // onMouseLeave,
        ]
    )

    const handleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (onNodeClick) {
                const [node] = getNodeFromMouseEvent(event)
                node && onNodeClick?.(node, event)
            }
        },
        [getNodeFromMouseEvent, onNodeClick]
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
            // onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        />
    )
}

export const TreeCanvas = <Datum = DefaultDatum,>({
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    theme,
    renderWrapper,
    ...otherProps
}: TreeCanvasProps<Datum>) => (
    <Container
        {...{
            animate,
            isInteractive,
            motionConfig,
            renderWrapper,
            theme,
        }}
    >
        <InnerTreeCanvas<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
