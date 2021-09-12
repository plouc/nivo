import { useCallback, useRef, useEffect, createElement, MouseEvent } from 'react'
import { getDistance, getRelativeCursor, Container, useDimensions, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { canvasDefaultProps } from './defaults'
import { useNetwork, useLinkThickness } from './hooks'
import { NetworkCanvasProps, NetworkInputNode } from './types'

type InnerNetworkCanvasProps<N extends NetworkInputNode> = Omit<
    NetworkCanvasProps<N>,
    'renderWrapper' | 'theme'
>

const InnerNetworkCanvas = <N extends NetworkInputNode>({
    width,
    height,
    margin: partialMargin,
    pixelRatio = canvasDefaultProps.pixelRatio,

    data: { nodes: rawNodes, links: rawLinks },

    linkDistance = canvasDefaultProps.linkDistance,
    repulsivity = canvasDefaultProps.repulsivity,
    distanceMin = canvasDefaultProps.distanceMin,
    distanceMax = canvasDefaultProps.distanceMax,
    iterations = canvasDefaultProps.iterations,

    layers = canvasDefaultProps.layers,

    renderNode = canvasDefaultProps.renderNode,
    nodeColor = canvasDefaultProps.nodeColor,
    nodeBorderWidth = canvasDefaultProps.nodeBorderWidth,
    nodeBorderColor = canvasDefaultProps.nodeBorderColor,

    linkThickness = canvasDefaultProps.linkThickness,
    linkColor = canvasDefaultProps.linkColor,

    isInteractive = canvasDefaultProps.isInteractive,
    nodeTooltip = canvasDefaultProps.nodeTooltip,
    onClick,
}: InnerNetworkCanvasProps<N>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const [nodes, links] = useNetwork<N>({
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        center: [innerWidth / 2, innerHeight / 2],
        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,
    })

    const theme = useTheme()
    const getLinkThickness = useLinkThickness(linkThickness)
    const getLinkColor = useInheritedColor(linkColor, theme)

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
                links.forEach(link => {
                    ctx.strokeStyle = getLinkColor(link)
                    ctx.lineWidth = getLinkThickness(link)
                    ctx.beginPath()
                    ctx.moveTo(link.source.x, link.source.y)
                    ctx.lineTo(link.target.x, link.target.y)
                    ctx.stroke()
                })
            } else if (layer === 'nodes' && nodes !== null) {
                nodes.forEach(node => {
                    renderNode(ctx, node)
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
        getLinkThickness,
        getLinkColor,
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
                return distanceFromNode <= node.radius
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
            } else {
                hideTooltip()
            }
        },
        [getNodeFromMouseEvent, showTooltipFromEvent, nodeTooltip, hideTooltip]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

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

export const NetworkCanvas = <N extends NetworkInputNode = NetworkInputNode>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: NetworkCanvasProps<N>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerNetworkCanvas<N> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
