import {
    MouseEvent,
    MutableRefObject,
    TouchEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { scaleLinear } from 'd3-scale'
import { Delaunay } from 'd3-delaunay'
import { getDistance, getRelativeCursor, Margin } from '@nivo/core'
import { TooltipAnchor, TooltipPosition, useTooltip } from '@nivo/tooltip'
import { computeMeshPoints, computeMesh } from './computeMesh'
import {
    VoronoiCommonProps,
    VoronoiDatum,
    VoronoiCustomLayerProps,
    NodeMouseHandler,
    // DatumTouchHandler,
    NodePositionAccessor,
    NodeTouchHandler,
} from './types'
import {
    defaultMargin,
    defaultNodePositionAccessor,
    defaultTooltipPosition,
    defaultTooltipAnchor,
} from './defaults'

export const useVoronoiMesh = <Node>({
    points,
    getNodePosition = defaultNodePositionAccessor as NodePositionAccessor<Node>,
    width,
    height,
    margin = defaultMargin,
    debug,
}: {
    points: readonly Node[]
    getNodePosition?: NodePositionAccessor<Node>
    // Margins are added to the chart's dimensions, so that mouse detection
    // also works inside the margins, omit if that's not what you want.
    // When including the margins, we recommend to set a `detectionRadius` as well.
    margin?: Margin
    width: number
    height: number
    debug?: boolean
}) =>
    useMemo(
        () =>
            computeMesh({
                points: computeMeshPoints<Node>({ points, margin, getNodePosition }),
                width,
                height,
                margin,
                debug,
            }),
        [points, width, height, margin, debug]
    )

export const useVoronoi = ({
    data,
    width,
    height,
    xDomain,
    yDomain,
}: {
    data: VoronoiDatum[]
    width: number
    height: number
    xDomain: VoronoiCommonProps['xDomain']
    yDomain: VoronoiCommonProps['yDomain']
}) => {
    const xScale = useMemo(() => scaleLinear().domain(xDomain).range([0, width]), [xDomain, width])
    const yScale = useMemo(
        () => scaleLinear().domain(yDomain).range([0, height]),
        [yDomain, height]
    )

    const points = useMemo(
        () =>
            data.map(d => ({
                x: xScale(d.x),
                y: yScale(d.y),
                data: d,
            })),
        [data, xScale, yScale]
    )

    return useMemo(() => {
        const delaunay = Delaunay.from(points.map(p => [p.x, p.y]))
        const voronoi = delaunay.voronoi([0, 0, width, height])

        return {
            points,
            delaunay,
            voronoi,
        }
    }, [points, width, height])
}

/**
 * Memoize the context to pass to custom layers.
 */
export const useVoronoiLayerContext = ({
    points,
    delaunay,
    voronoi,
}: VoronoiCustomLayerProps): VoronoiCustomLayerProps =>
    useMemo(
        () => ({
            points,
            delaunay,
            voronoi,
        }),
        [points, delaunay, voronoi]
    )

export const useMeshEvents = <Node, ElementType extends Element>({
    elementRef,
    nodes,
    getNodePosition = defaultNodePositionAccessor as NodePositionAccessor<Node>,
    delaunay,
    setCurrent: setCurrentNode,
    margin = defaultMargin,
    detectionRadius = Infinity,
    isInteractive = true,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    enableTouchCrosshair = false,
    tooltip,
    tooltipPosition = defaultTooltipPosition,
    tooltipAnchor = defaultTooltipAnchor,
}: {
    elementRef: MutableRefObject<ElementType | null>
    nodes: readonly Node[]
    getNodePosition?: NodePositionAccessor<Node>
    delaunay: Delaunay<Node>
    setCurrent?: (node: Node | null) => void
    margin?: Margin
    detectionRadius?: number
    isInteractive?: boolean
    onMouseEnter?: NodeMouseHandler<Node>
    onMouseMove?: NodeMouseHandler<Node>
    onMouseLeave?: NodeMouseHandler<Node>
    onMouseDown?: NodeMouseHandler<Node>
    onMouseUp?: NodeMouseHandler<Node>
    onClick?: NodeMouseHandler<Node>
    onDoubleClick?: NodeMouseHandler<Node>
    onTouchStart?: NodeTouchHandler<Node>
    onTouchMove?: NodeTouchHandler<Node>
    onTouchEnd?: NodeTouchHandler<Node>
    enableTouchCrosshair?: boolean
    tooltip?: (node: Node) => JSX.Element
    tooltipPosition?: TooltipPosition
    tooltipAnchor?: TooltipAnchor
}) => {
    // Store the index of the current point and the current node.
    const [current, setCurrent] = useState<[number, Node] | null>(null)

    // Keep track of the previous index and node, this is needed as we don't have enter/leave events
    // for each node because we use a single rect element to capture events.
    const previous = useRef<[number, Node] | null>(null)

    useEffect(() => {
        previous.current = current
    }, [previous, current])

    const findNode = useCallback(
        (event: MouseEvent<ElementType> | TouchEvent<ElementType>): null | [number, Node] => {
            if (!elementRef.current || nodes.length === 0) return null

            const [x, y] = getRelativeCursor(elementRef.current, event)

            let index: number | null = delaunay.find(x, y)
            let node = index !== undefined ? nodes[index] : null

            if (node && detectionRadius !== Infinity) {
                const [nodeX, nodeY] = getNodePosition(node)
                if (getDistance(x, y, nodeX + margin.left, nodeY + margin.top) > detectionRadius) {
                    index = null
                    node = null
                }
            }

            if (index === null || node === null) return null

            return [index, node]
        },
        [elementRef, delaunay, nodes, getNodePosition, margin, detectionRadius]
    )

    const { showTooltipAt, showTooltipFromEvent, hideTooltip } = useTooltip()
    const showTooltip = useMemo(() => {
        if (!tooltip) return undefined

        if (tooltipPosition === 'cursor') {
            // Following the cursor.
            return (node: Node, event: MouseEvent<ElementType>) => {
                showTooltipFromEvent(tooltip(node), event, tooltipAnchor)
            }
        }

        // Fixed at the node's position.
        return (node: Node) => {
            const [x, y] = getNodePosition(node)
            showTooltipAt(tooltip(node), [x + margin.left, y + margin.top], tooltipAnchor)
        }
    }, [
        showTooltipAt,
        showTooltipFromEvent,
        tooltip,
        tooltipPosition,
        tooltipAnchor,
        getNodePosition,
        margin,
    ])

    // Mouse enter only occurs when entering the main element,
    // not for each node.
    const handleMouseEnter = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)
            setCurrentNode?.(match ? match[1] : null)

            if (match) {
                const node = match[1]

                showTooltip?.(node, event)
                onMouseEnter?.(match[1], event)
            }
        },
        [findNode, setCurrent, setCurrentNode, showTooltip, onMouseEnter]
    )

    // Handle mouse enter/move/leave, relying on `previous` to simulate events.
    const handleMouseMove = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)

            if (match) {
                const [index, node] = match

                setCurrentNode?.(node)
                showTooltip?.(node, event)

                if (previous.current) {
                    const [previousIndex, previousNode] = previous.current
                    if (index !== previousIndex) {
                        // Simulate an enter event if the previous index is different.
                        onMouseLeave?.(previousNode, event)
                    } else {
                        // If it's the same, trigger a regular move event.
                        onMouseMove?.(node, event)
                    }
                } else {
                    onMouseEnter?.(node, event)
                }
            } else {
                setCurrentNode?.(null)
                hideTooltip?.()

                if (previous.current) {
                    // Simulate a leave event if there's a previous node.
                    onMouseLeave?.(previous.current[1], event)
                }
            }
        },
        [
            findNode,
            setCurrent,
            previous,
            onMouseEnter,
            onMouseMove,
            onMouseLeave,
            showTooltip,
            hideTooltip,
        ]
    )

    // Mouse leave only occurs when leaving the main element,
    // not for each node.
    const handleMouseLeave = useCallback(
        (event: MouseEvent<ElementType>) => {
            setCurrent(null)
            setCurrentNode?.(null)

            hideTooltip()

            if (onMouseLeave && previous.current) {
                onMouseLeave(previous.current[1], event)
            }
        },
        [setCurrent, setCurrentNode, previous, hideTooltip, onMouseLeave]
    )

    const handleMouseDown = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)

            match && onMouseDown?.(match[1], event)
        },
        [findNode, setCurrent, onMouseDown]
    )

    const handleMouseUp = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)

            match && onMouseUp?.(match[1], event)
        },
        [findNode, setCurrent, onMouseUp]
    )

    const handleClick = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)

            match && onClick?.(match[1], event)
        },
        [findNode, setCurrent, onClick]
    )

    const handleDoubleClick = useCallback(
        (event: MouseEvent<ElementType>) => {
            const match = findNode(event)

            setCurrent(match)

            match && onDoubleClick?.(match[1], event)
        },
        [findNode, setCurrent, onDoubleClick]
    )

    const handleTouchStart = useCallback(
        (event: TouchEvent<ElementType>) => {
            const match = findNode(event)

            if (enableTouchCrosshair) {
                setCurrent(match)
                setCurrentNode?.(match ? match[1] : null)
            }

            match && onTouchStart?.(match[1], event)
        },
        [findNode, setCurrent, setCurrentNode, enableTouchCrosshair, onTouchStart]
    )

    const handleTouchMove = useCallback(
        (event: TouchEvent<ElementType>) => {
            const match = findNode(event)

            if (enableTouchCrosshair) {
                setCurrent(match)
                setCurrentNode?.(match ? match[1] : null)
            }

            match && onTouchMove?.(match[1], event)
        },
        [findNode, setCurrent, setCurrentNode, enableTouchCrosshair, onTouchMove]
    )

    const handleTouchEnd = useCallback(
        (event: TouchEvent<SVGRectElement>) => {
            if (enableTouchCrosshair) {
                setCurrent(null)
                setCurrentNode?.(null)
            }

            if (onTouchEnd && previous.current) {
                onTouchEnd(previous.current[1], event)
            }
        },
        [enableTouchCrosshair, setCurrent, setCurrentNode, onTouchEnd, previous]
    )

    return {
        current,
        handleMouseEnter: isInteractive ? handleMouseEnter : undefined,
        handleMouseMove: isInteractive ? handleMouseMove : undefined,
        handleMouseLeave: isInteractive ? handleMouseLeave : undefined,
        handleMouseDown: isInteractive ? handleMouseDown : undefined,
        handleMouseUp: isInteractive ? handleMouseUp : undefined,
        handleClick: isInteractive ? handleClick : undefined,
        handleDoubleClick: isInteractive ? handleDoubleClick : undefined,
        handleTouchStart: isInteractive ? handleTouchStart : undefined,
        handleTouchMove: isInteractive ? handleTouchMove : undefined,
        handleTouchEnd: isInteractive ? handleTouchEnd : undefined,
    }
}

/**
 * Compute a voronoi mesh and corresponding events.
 */
export const useMesh = <Node, ElementType extends Element>({
    elementRef,
    nodes,
    getNodePosition,
    width,
    height,
    margin = defaultMargin,
    isInteractive = true,
    detectionRadius = Infinity,
    setCurrent,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    tooltip,
    tooltipPosition = defaultTooltipPosition,
    tooltipAnchor = defaultTooltipAnchor,
    debug = false,
}: {
    elementRef: MutableRefObject<ElementType | null>
    nodes: readonly Node[]
    getNodePosition?: NodePositionAccessor<Node>
    width: number
    height: number
    margin?: Margin
    isInteractive?: boolean
    detectionRadius?: number
    setCurrent?: (node: Node | null) => void
    onMouseEnter?: NodeMouseHandler<Node>
    onMouseMove?: NodeMouseHandler<Node>
    onMouseLeave?: NodeMouseHandler<Node>
    onMouseDown?: NodeMouseHandler<Node>
    onMouseUp?: NodeMouseHandler<Node>
    onClick?: NodeMouseHandler<Node>
    onDoubleClick?: NodeMouseHandler<Node>
    tooltip?: (node: Node) => JSX.Element
    tooltipPosition?: TooltipPosition
    tooltipAnchor?: TooltipAnchor
    debug?: boolean
}) => {
    const { delaunay, voronoi } = useVoronoiMesh<Node>({
        points: nodes,
        getNodePosition,
        width,
        height,
        margin,
        debug,
    })

    const {
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleMouseDown,
        handleMouseUp,
        handleClick,
        handleDoubleClick,
        current,
    } = useMeshEvents<Node, ElementType>({
        elementRef,
        nodes,
        margin,
        setCurrent,
        delaunay,
        detectionRadius,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        onClick,
        onDoubleClick,
        tooltip,
        tooltipPosition,
        tooltipAnchor,
    })

    return {
        delaunay,
        voronoi,
        current,
        handleMouseEnter,
        handleMouseMove,
        handleMouseLeave,
        handleMouseDown,
        handleMouseUp,
        handleClick,
        handleDoubleClick,
    }
}
