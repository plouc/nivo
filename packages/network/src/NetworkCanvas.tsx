import { useCallback, useRef, useEffect, createElement, MouseEvent } from 'react'
import { getDistance, getRelativeCursor, Container, useDimensions, useTheme } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { useComputedAnnotations, renderAnnotationsToCanvas } from '@nivo/annotations'
import { canvasDefaultProps } from './defaults'
import { useNetwork, useNodeAnnotations } from './hooks'
import {
    NetworkCanvasProps,
    InputNode,
    ComputedNode,
    NodeTooltip,
    InputLink,
    NetworkSvgProps,
} from './types'

type InnerNetworkCanvasProps<Node extends InputNode, Link extends InputLink> = Omit<
    NetworkCanvasProps<Node, Link>,
    'renderWrapper' | 'theme'
>

const InnerNetworkCanvas = <Node extends InputNode, Link extends InputLink>({
    width,
    height,
    margin: partialMargin,
    pixelRatio = canvasDefaultProps.pixelRatio,

    data: { nodes: rawNodes, links: rawLinks },

    linkDistance = canvasDefaultProps.linkDistance,
    centeringStrength = canvasDefaultProps.centeringStrength,
    repulsivity = canvasDefaultProps.repulsivity,
    distanceMin = canvasDefaultProps.distanceMin,
    distanceMax = canvasDefaultProps.distanceMax,
    iterations = canvasDefaultProps.iterations,

    layers = canvasDefaultProps.layers,

    renderNode = canvasDefaultProps.renderNode,
    nodeSize = canvasDefaultProps.nodeSize,
    activeNodeSize = canvasDefaultProps.activeNodeSize,
    inactiveNodeSize = canvasDefaultProps.inactiveNodeSize,
    nodeColor = canvasDefaultProps.nodeColor,
    nodeBorderWidth = canvasDefaultProps.nodeBorderWidth,
    nodeBorderColor = canvasDefaultProps.nodeBorderColor,

    renderLink = canvasDefaultProps.renderLink,
    linkThickness = canvasDefaultProps.linkThickness,
    linkColor = canvasDefaultProps.linkColor,

    annotations = canvasDefaultProps.annotations as NonNullable<
        NetworkSvgProps<Node, Link>['annotations']
    >,

    isInteractive = canvasDefaultProps.isInteractive,
    nodeTooltip = canvasDefaultProps.nodeTooltip as NodeTooltip<Node>,
    onClick,
}: InnerNetworkCanvasProps<Node, Link>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes, links, setActiveNodeIds } = useNetwork<Node, Link>({
        center: [innerWidth / 2, innerHeight / 2],
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        centeringStrength,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        nodeSize,
        activeNodeSize,
        inactiveNodeSize,
        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,
        linkThickness,
        linkColor,
    })

    const boundAnnotations = useNodeAnnotations<Node>(nodes!, annotations)
    const computedAnnotations = useComputedAnnotations<ComputedNode<Node>>({
        annotations: boundAnnotations,
    })

    const theme = useTheme()

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
            if (layer === 'links' && links !== null) {
                links.forEach(link => renderLink(ctx, link))
            } else if (layer === 'nodes' && nodes !== null) {
                nodes.forEach(node => renderNode(ctx, node))
            } else if (layer === 'annotations') {
                renderAnnotationsToCanvas<ComputedNode<Node>>(ctx, {
                    annotations: computedAnnotations as any,
                    theme,
                })
            } else if (typeof layer === 'function' && nodes !== null && links !== null) {
                layer(ctx, {
                    // ...props,
                    nodes,
                    links,
                })
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        margin.left,
        margin.top,
        pixelRatio,
        layers,
        theme,
        nodes,
        links,
        renderNode,
        renderLink,
        computedAnnotations,
    ])

    const getNodeFromMouseEvent = useCallback(
        (event: MouseEvent) => {
            if (!canvasEl.current || nodes === null) return undefined

            const [x, y] = getRelativeCursor(canvasEl.current, event)

            return nodes.find(node => {
                const distanceFromNode = getDistance(
                    node.x,
                    node.y,
                    x - margin.left,
                    y - margin.top
                )
                return distanceFromNode <= node.size / 2
            })
        },
        [canvasEl, margin, nodes]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent) => {
            const node = getNodeFromMouseEvent(event)
            if (node) {
                showTooltipFromEvent(createElement(nodeTooltip, { node }), event)
                setActiveNodeIds([node.id])
            } else {
                hideTooltip()
                setActiveNodeIds([])
            }
        },
        [getNodeFromMouseEvent, showTooltipFromEvent, nodeTooltip, hideTooltip, setActiveNodeIds]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
        setActiveNodeIds([])
    }, [hideTooltip, setActiveNodeIds])

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!onClick) return

            const node = getNodeFromMouseEvent(event)
            if (node) {
                onClick(node, event)
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
            onClick={isInteractive ? handleClick : undefined}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
        />
    )
}

export const NetworkCanvas = <
    Node extends InputNode = InputNode,
    Link extends InputLink = InputLink
>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: NetworkCanvasProps<Node, Link>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerNetworkCanvas<Node, Link> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
