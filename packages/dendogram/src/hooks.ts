import { createElement, MouseEvent, useCallback, useMemo } from 'react'
import { hierarchy as d3Hierarchy, cluster as d3Cluster } from 'd3-hierarchy'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import { usePropertyAccessor } from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import {
    DefaultDatum,
    HierarchyDendogramNode,
    HierarchyDendogramLink,
    DendogramDataProps,
    CommonProps,
    Layout,
    ComputedNode,
    ComputedLink,
    NodeMouseEventHandler,
    NodeTooltip,
    IntermediateComputedLink,
    LinkThicknessFunction,
} from './types'
import { commonDefaultProps } from './defaults'

export const useHierarchy = <Datum extends object>({ root }: { root: Datum }) =>
    useMemo(() => d3Hierarchy<Datum>(root) as HierarchyDendogramNode<Datum>, [root])

export const useCluster = <Datum extends object>({
    width,
    height,
    layout,
}: {
    width: number
    height: number
    layout: Layout
}) =>
    useMemo(() => {
        const cluster = d3Cluster<Datum>().size([1, 1])

        if (layout === 'bottom-to-top') {
            // cluster.size([width, -height])
        } else {
            // cluster.size([width, height])
        }

        return cluster
    }, [width, height, layout])

const computeNodePath = <Datum extends object>(
    node: HierarchyDendogramNode<Datum>,
    getIdentity: (node: Datum) => string
) => {
    const path = node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .reverse()

    return { path: path.join('.'), pathComponents: path }
}

/**
 * By default, the x/y positions are computed for a 0~1 range,
 * so that we can easily change the layout without having to
 * recompute the nodes.
 */
const useCartesianScales = ({
    width,
    height,
    layout,
}: {
    width: number
    height: number
    layout: Layout
}) =>
    useMemo(() => {
        const xScale = scaleLinear().domain([0, 1])
        const yScale = scaleLinear().domain([0, 1])

        if (layout === 'top-to-bottom') {
            xScale.range([0, width])
            yScale.range([0, height])
        } else if (layout === 'right-to-left') {
            xScale.range([width, 0])
            yScale.range([0, height])
        } else if (layout === 'bottom-to-top') {
            xScale.range([width, 0])
            yScale.range([height, 0])
        } else if (layout === 'left-to-right') {
            xScale.range([0, width])
            yScale.range([height, 0])
        }

        return {
            xScale,
            yScale,
        }
    }, [width, height, layout])

const useNodes = <Datum extends object>({
    root,
    xScale,
    yScale,
    layout,
    getIdentity,
}: {
    root: HierarchyDendogramNode<Datum>
    xScale: ScaleLinear<number, number>
    yScale: ScaleLinear<number, number>
    layout: Layout
    getIdentity: (node: Datum) => string
}) =>
    useMemo(() => {
        const nodeByUid: Record<string, ComputedNode<Datum>> = {}

        const nodes: ComputedNode<Datum>[] = root.descendants().map(node => {
            const { pathComponents } = computeNodePath<Datum>(node, getIdentity)

            let x: number
            let y: number
            if (layout === 'top-to-bottom' || layout === 'bottom-to-top') {
                x = xScale(node.x!)
                y = yScale(node.y!)
            } else {
                x = xScale(node.y!)
                y = yScale(node.x!)
            }

            const computedNode: ComputedNode<Datum> = {
                uid: node.uid!,
                id: getIdentity(node.data),
                data: node.data,
                pathComponents,
                depth: node.depth,
                height: node.height,
                x,
                y,
            }
            nodeByUid[computedNode.uid] = computedNode

            return computedNode
        })

        return {
            nodes,
            nodeByUid,
        }
    }, [root, xScale, yScale])

const useLinks = <Datum extends object>({
    root,
    nodeByUid,
    linkThickness,
}: {
    root: HierarchyDendogramNode<Datum>
    nodeByUid: Record<string, ComputedNode<Datum>>
    linkThickness: Exclude<CommonProps<Datum>['linkThickness'], undefined>
}): ComputedLink<Datum>[] => {
    const intermediateLinks = useMemo<IntermediateComputedLink<Datum>[]>(() => {
        return (root.links() as HierarchyDendogramLink<Datum>[]).map(link => {
            return {
                id: `${link.source.uid}:${link.target.uid}`,
                // Replace with computed nodes.
                source: nodeByUid[link.source.uid!],
                target: nodeByUid[link.target.uid!],
            }
        })
    }, [root, nodeByUid])

    const getLinkThickness: LinkThicknessFunction<Datum> = useMemo(() => {
        if (typeof linkThickness === 'function') return linkThickness
        return () => linkThickness
    }, [linkThickness])

    return useMemo(() => {
        return intermediateLinks.map(intermediateLink => {
            return {
                ...intermediateLink,
                thickness: getLinkThickness(intermediateLink),
            }
        })
    }, [intermediateLinks, getLinkThickness])
}

export const useDendogram = <Datum extends object = DefaultDatum>({
    data,
    identity = commonDefaultProps.identity,
    layout = commonDefaultProps.layout,
    width,
    height,
    linkThickness = commonDefaultProps.linkThickness,
}: {
    data: DendogramDataProps<Datum>['data']
    identity?: CommonProps<Datum>['identity']
    layout?: Layout
    width: number
    height: number
    linkThickness?: CommonProps<Datum>['linkThickness']
}) => {
    const getIdentity = usePropertyAccessor(identity)

    const root = useHierarchy<Datum>({ root: data })
    root.each(node => {
        // We add an uid first, because we're going to use it to be able
        // to replace the links' source and target nodes with computed nodes.
        const { path } = computeNodePath(node, getIdentity)
        node.uid = path
    })
    const cluster = useCluster<Datum>({ width, height, layout })
    cluster(root)

    const { xScale, yScale } = useCartesianScales({ width, height, layout })

    const { nodes, nodeByUid } = useNodes<Datum>({
        root,
        xScale,
        yScale,
        layout,
        getIdentity,
    })

    const links = useLinks<Datum>({ root, nodeByUid, linkThickness })

    return {
        nodes,
        links,
        root,
    }
}

/**
 * This hook may generates mouse event handlers for a node according to the main chart props.
 * It's used for the default `Node` component and may be used for custom nodes
 * to simplify their implementation.
 */
export const useNodeMouseEventHandlers = <Datum extends object>(
    node: ComputedNode<Datum>,
    {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
    }: {
        isInteractive: boolean
        onMouseEnter?: NodeMouseEventHandler<Datum>
        onMouseMove?: NodeMouseEventHandler<Datum>
        onMouseLeave?: NodeMouseEventHandler<Datum>
        onClick?: NodeMouseEventHandler<Datum>
        tooltip?: NodeTooltip<Datum>
    }
) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const showTooltip = useCallback(
        (event: MouseEvent) => {
            tooltip !== undefined &&
                showTooltipFromEvent(
                    createElement(tooltip, {
                        node,
                    }),
                    event,
                    'left'
                )
        },
        [node, tooltip, showTooltipFromEvent]
    )

    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            showTooltip(event)
            onMouseEnter?.(node, event)
        },
        [node, showTooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            showTooltip(event)
            onMouseMove?.(node, event)
        },
        [node, showTooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [node, hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
            onClick?.(node, event)
        },
        [node, onClick]
    )

    return {
        onMouseEnter: isInteractive ? handleMouseEnter : undefined,
        onMouseMove: isInteractive ? handleMouseMove : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onClick: isInteractive ? handleClick : undefined,
    }
}
