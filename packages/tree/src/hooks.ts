import { createElement, MouseEvent, useCallback, useMemo, useState } from 'react'
import { hierarchy as d3Hierarchy, cluster as d3Cluster, tree as d3Tree } from 'd3-hierarchy'
import { scaleLinear, ScaleLinear } from 'd3-scale'
import {
    link as d3Link,
    CurveFactory,
    curveLinear,
    curveBumpX,
    curveBumpY,
    curveStep,
    curveStepBefore,
    curveStepAfter,
} from 'd3-shape'
import { Margin, usePropertyAccessor, useTheme } from '@nivo/core'
import { TooltipAnchor, TooltipPosition, useTooltip } from '@nivo/tooltip'
import { useOrdinalColorScale, useInheritedColor } from '@nivo/colors'
import {
    DefaultDatum,
    HierarchyTreeNode,
    HierarchyTreeLink,
    TreeDataProps,
    CommonProps,
    Layout,
    ComputedNode,
    ComputedLink,
    NodeMouseEventHandler,
    NodeTooltip,
    IntermediateComputedLink,
    LinkThicknessFunction,
    LinkMouseEventHandler,
    LinkTooltip,
    IntermediateComputedNode,
    CurrentNodeSetter,
    NodeSizeModifierFunction,
    LinkThicknessModifierFunction,
    TreeMode,
    LinkCurve,
    NodesMap,
} from './types'
import { commonDefaultProps } from './defaults'

/**
 * Find the closest ancestor of a node in a map,
 * this is typically used for transitions.
 */
export const getFirstRemainingAncestorOrSelf = <Datum>(
    node: ComputedNode<Datum>,
    nodeByUid: NodesMap<Datum>
) => {
    const reversed = [...node.ancestorUids].reverse()

    for (const ancestorUid of reversed) {
        const ancestor = nodeByUid[ancestorUid]
        if (ancestor !== undefined) return ancestor
    }

    return node
}

export const getPreviousCollapsedAncestorOrSelf = <Datum>(
    node: ComputedNode<Datum>,
    previousCollapsedNodes: NodesMap<Datum>
) => {
    for (const ancestorUid of node.ancestorUids) {
        const ancestor = previousCollapsedNodes[ancestorUid]
        if (ancestor !== undefined) return ancestor
    }

    return node
}

export const useRoot = <Datum>({
    data,
    mode,
    getIdentity,
    collapsedNodeUids,
}: {
    data: TreeDataProps<Datum>['data']
    mode: TreeMode
    getIdentity: (node: Datum) => string
    collapsedNodeUids: string[]
}) => {
    return useMemo(() => {
        const root = d3Hierarchy<Datum>(data) as HierarchyTreeNode<Datum>
        const cluster = mode === 'tree' ? d3Tree<Datum>() : d3Cluster<Datum>()

        root.eachBefore(node => {
            const ancestors = node
                .ancestors()
                .filter(ancestor => ancestor !== node)
                .reverse()
            const ancestorIds = ancestors.map(ancestor => getIdentity(ancestor.data))

            node.ancestorIds = ancestorIds
            node.uid = [...ancestorIds, getIdentity(node.data)].join('.')
            node.ancestorUids = ancestors.map(ancestor => ancestor.uid!)
        })

        root.each(node => {
            node.descendantUids = node
                .descendants()
                .filter(descendant => descendant !== node)
                .map(descendant => descendant.uid!)

            if (collapsedNodeUids.includes(node.uid!)) {
                node.children = undefined
            }
        })

        cluster(root)

        return root
    }, [data, mode, getIdentity, collapsedNodeUids])
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

const useNodeSize = <Datum>(size: Exclude<CommonProps<Datum>['nodeSize'], undefined>) =>
    useMemo(() => {
        if (typeof size === 'function') return size
        return () => size
    }, [size])

const useNodeSizeModifier = <Datum>(size?: NodeSizeModifierFunction<Datum> | number) =>
    useMemo(() => {
        if (size === undefined) return (node: ComputedNode<Datum>) => node.size
        if (typeof size === 'function') return size
        return () => size
    }, [size])

const useNodes = <Datum>({
    root,
    xScale,
    yScale,
    layout,
    getIdentity,
    nodeSize,
    activeNodeSize,
    inactiveNodeSize,
    nodeColor,
    fixNodeColorAtDepth,
}: {
    root: HierarchyTreeNode<Datum>
    xScale: ScaleLinear<number, number>
    yScale: ScaleLinear<number, number>
    layout: Layout
    getIdentity: (node: Datum) => string
    nodeSize: Exclude<CommonProps<Datum>['nodeSize'], undefined>
    activeNodeSize?: CommonProps<Datum>['activeNodeSize']
    inactiveNodeSize?: CommonProps<Datum>['inactiveNodeSize']
    nodeColor: Exclude<CommonProps<Datum>['nodeColor'], undefined>
    fixNodeColorAtDepth: number
}) => {
    const [activeNodeUids, setActiveNodeUids] = useState<string[]>([])

    const intermediateNodes = useMemo<IntermediateComputedNode<Datum>[]>(() => {
        return root.descendants().map(node => {
            let x: number
            let y: number
            if (layout === 'top-to-bottom' || layout === 'bottom-to-top') {
                x = xScale(node.x!)
                y = yScale(node.y!)
            } else {
                x = xScale(node.y!)
                y = yScale(node.x!)
            }

            const id = getIdentity(node.data)

            return {
                path: [...node.ancestorIds!, id],
                uid: node.uid!,
                isRoot: node.depth === 0,
                isLeaf: node.height === 0,
                ancestorIds: node.ancestorIds!,
                ancestorUids: node.ancestorUids!,
                descendantUids: node.descendantUids!,
                id,
                data: node.data,
                depth: node.depth,
                height: node.height,
                x,
                y,
            }
        })
    }, [root, getIdentity, layout, xScale, yScale])

    const getNodeSize = useNodeSize<Datum>(nodeSize)
    const getActiveNodeSize = useNodeSizeModifier<Datum>(activeNodeSize)
    const getInactiveNodeSize = useNodeSizeModifier<Datum>(inactiveNodeSize)

    const getNodeColorBase = useOrdinalColorScale(nodeColor, 'uid')
    // Wrap the default color function to support `getNodeColorAtDepth`.
    const getNodeColor = useMemo(() => {
        if (fixNodeColorAtDepth === Infinity) return getNodeColorBase

        return (node: IntermediateComputedNode<Datum>, nodeByUid: NodesMap<Datum>) => {
            if (
                node.depth <= 0 ||
                node.depth <= fixNodeColorAtDepth ||
                node.ancestorUids.length === 0
            )
                return getNodeColorBase(node)

            const parentUid = node.ancestorUids[node.ancestorUids.length - 1]
            const parent = nodeByUid[parentUid]
            if (parent === undefined) return getNodeColorBase(node)

            return parent.color
        }
    }, [getNodeColorBase, fixNodeColorAtDepth])

    const computed = useMemo(() => {
        const nodeByUid: NodesMap<Datum> = {}

        const nodes: ComputedNode<Datum>[] = intermediateNodes.map(intermediateNode => {
            const computedNode: ComputedNode<Datum> = {
                ...intermediateNode,
                size: getNodeSize(intermediateNode),
                color: getNodeColor(intermediateNode, nodeByUid),
                isActive: null,
            }

            if (activeNodeUids.length > 0) {
                computedNode.isActive = activeNodeUids.includes(computedNode.uid)
                if (computedNode.isActive) {
                    computedNode.size = getActiveNodeSize(computedNode)
                } else {
                    computedNode.size = getInactiveNodeSize(computedNode)
                }
            }

            nodeByUid[computedNode.uid] = computedNode

            return computedNode
        })

        return { nodes, nodeByUid }
    }, [
        intermediateNodes,
        getNodeSize,
        getActiveNodeSize,
        getInactiveNodeSize,
        getNodeColor,
        activeNodeUids,
    ])

    return {
        ...computed,
        activeNodeUids,
        setActiveNodeUids,
    }
}

const useLinkThicknessModifier = <Datum>(
    thickness?: LinkThicknessModifierFunction<Datum> | number
) =>
    useMemo(() => {
        if (thickness === undefined) return (link: ComputedLink<Datum>) => link.thickness
        if (typeof thickness === 'function') return thickness
        return () => thickness
    }, [thickness])

const useLinks = <Datum>({
    root,
    nodeByUid,
    activeNodeUids,
    linkThickness,
    activeLinkThickness,
    inactiveLinkThickness,
    linkColor,
}: {
    root: HierarchyTreeNode<Datum>
    nodeByUid: NodesMap<Datum>
    activeNodeUids: readonly string[]
    linkThickness: Exclude<CommonProps<Datum>['linkThickness'], undefined>
    activeLinkThickness?: CommonProps<Datum>['activeLinkThickness']
    inactiveLinkThickness?: CommonProps<Datum>['inactiveLinkThickness']
    linkColor: Exclude<CommonProps<Datum>['linkColor'], undefined>
}) => {
    const intermediateLinks = useMemo<IntermediateComputedLink<Datum>[]>(() => {
        return (root.links() as HierarchyTreeLink<Datum>[]).map(link => {
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
    const getActiveLinkThickness = useLinkThicknessModifier(activeLinkThickness)
    const getInactiveLinkThickness = useLinkThicknessModifier(inactiveLinkThickness)

    const theme = useTheme()
    const getLinkColor = useInheritedColor(linkColor, theme)

    const [activeLinkIds, setActiveLinkIds] = useState<string[]>([])

    const links = useMemo(() => {
        return intermediateLinks.map(intermediateLink => {
            const computedLink: ComputedLink<Datum> = {
                ...intermediateLink,
                thickness: getLinkThickness(intermediateLink),
                color: getLinkColor(intermediateLink),
                isActive: null,
            }

            if (activeNodeUids.length > 0) {
                computedLink.isActive = activeLinkIds.includes(computedLink.id)
                if (computedLink.isActive) {
                    computedLink.thickness = getActiveLinkThickness(computedLink)
                } else {
                    computedLink.thickness = getInactiveLinkThickness(computedLink)
                }
            }

            return computedLink
        })
    }, [
        intermediateLinks,
        getLinkThickness,
        getActiveLinkThickness,
        getInactiveLinkThickness,
        getLinkColor,
        activeNodeUids.length,
        activeLinkIds,
    ])

    return {
        links,
        setActiveLinkIds,
    }
}

const useLinkGenerator = ({ layout, curve }: { layout: Layout; curve: LinkCurve }) =>
    useMemo(() => {
        let curveFactory: CurveFactory = curveLinear

        if (curve === 'bump') {
            if (layout === 'top-to-bottom' || layout === 'bottom-to-top') {
                curveFactory = curveBumpY
            } else {
                curveFactory = curveBumpX
            }
        } else if (curve === 'step') {
            curveFactory = curveStep
        } else if (curve === 'step-before') {
            curveFactory = curveStepBefore
        } else if (curve === 'step-after') {
            curveFactory = curveStepAfter
        }

        return d3Link(curveFactory)
    }, [layout, curve])

const useSetCurrentNode = <Datum>({
    setActiveNodeUids,
    highlightAncestorNodes,
    highlightDescendantNodes,
    links,
    setActiveLinkIds,
    highlightAncestorLinks,
    highlightDescendantLinks,
}: {
    setActiveNodeUids: (uids: string[]) => void
    highlightAncestorNodes: boolean
    highlightDescendantNodes: boolean
    links: readonly ComputedLink<Datum>[]
    setActiveLinkIds: (ids: string[]) => void
    highlightAncestorLinks: boolean
    highlightDescendantLinks: boolean
}) =>
    useCallback(
        (node: ComputedNode<Datum> | null) => {
            if (node === null) {
                setActiveNodeUids([])
                setActiveLinkIds([])
            } else {
                let nodeUids: string[] = [node.uid]
                if (highlightAncestorNodes) {
                    nodeUids = [...nodeUids, ...node.ancestorUids]
                }
                if (highlightDescendantNodes) {
                    nodeUids = [...nodeUids, ...node.descendantUids]
                }
                setActiveNodeUids(nodeUids)

                const linkIds: string[] = []
                if (highlightAncestorLinks) {
                    links
                        .filter(link => {
                            return (
                                link.target.uid === node.uid ||
                                node.ancestorUids.includes(link.target.uid)
                            )
                        })
                        .forEach(link => {
                            linkIds.push(link.id)
                        })
                }
                if (highlightDescendantLinks) {
                    links
                        .filter(link => {
                            return (
                                link.source.uid === node.uid ||
                                node.descendantUids.includes(link.source.uid)
                            )
                        })
                        .forEach(link => {
                            linkIds.push(link.id)
                        })
                }
                setActiveLinkIds(linkIds)
            }
        },
        [
            setActiveNodeUids,
            highlightAncestorNodes,
            highlightDescendantNodes,
            links,
            setActiveLinkIds,
            highlightAncestorLinks,
            highlightDescendantLinks,
        ]
    )

const useCollapsibleNodes = <Datum>(isCollapsible: boolean) => {
    // Track which nodes are collapsed, doesn't include descendant nodes.
    const [collapsedNodeUids, setCollapsedNodeUids] = useState<string[]>([])

    const toggleNode = useCallback(
        (node: ComputedNode<Datum>) => {
            if (!isCollapsible) return

            setCollapsedNodeUids(prevState => {
                if (prevState.includes(node.uid)) {
                    // Expand the node.
                    return prevState.filter(uid => uid !== node.uid)
                }

                // Collapse the node.
                return [...prevState, node.uid]
            })
        },
        [isCollapsible, setCollapsedNodeUids]
    )

    return {
        collapsedNodeUids,
        toggleNode,
    }
}

export const useTree = <Datum = DefaultDatum>({
    data,
    width,
    height,
    identity = commonDefaultProps.identity,
    mode = commonDefaultProps.mode,
    layout = commonDefaultProps.layout,
    nodeSize = commonDefaultProps.nodeSize,
    activeNodeSize,
    inactiveNodeSize,
    nodeColor = commonDefaultProps.nodeColor,
    fixNodeColorAtDepth = commonDefaultProps.fixNodeColorAtDepth,
    highlightAncestorNodes = commonDefaultProps.highlightAncestorNodes,
    highlightDescendantNodes = commonDefaultProps.highlightDescendantNodes,
    linkCurve = commonDefaultProps.linkCurve,
    linkThickness = commonDefaultProps.linkThickness,
    linkColor = commonDefaultProps.linkColor,
    activeLinkThickness,
    inactiveLinkThickness,
    highlightAncestorLinks = commonDefaultProps.highlightAncestorLinks,
    highlightDescendantLinks = commonDefaultProps.highlightDescendantLinks,
    isCollapsible = commonDefaultProps.isCollapsible,
}: {
    data: TreeDataProps<Datum>['data']
    width: number
    height: number
    identity?: CommonProps<Datum>['identity']
    mode?: TreeMode
    layout?: Layout
    nodeSize?: CommonProps<Datum>['nodeSize']
    activeNodeSize?: CommonProps<Datum>['activeNodeSize']
    inactiveNodeSize?: CommonProps<Datum>['inactiveNodeSize']
    nodeColor?: CommonProps<Datum>['nodeColor']
    fixNodeColorAtDepth?: number
    highlightAncestorNodes?: boolean
    highlightDescendantNodes?: boolean
    linkCurve?: LinkCurve
    linkThickness?: CommonProps<Datum>['linkThickness']
    activeLinkThickness?: CommonProps<Datum>['activeLinkThickness']
    inactiveLinkThickness?: CommonProps<Datum>['inactiveLinkThickness']
    linkColor?: CommonProps<Datum>['linkColor']
    highlightAncestorLinks?: boolean
    highlightDescendantLinks?: boolean
    isCollapsible?: boolean
}) => {
    const getIdentity = usePropertyAccessor(identity)

    const { collapsedNodeUids, toggleNode } = useCollapsibleNodes(isCollapsible)

    const root = useRoot<Datum>({ data, mode, getIdentity, collapsedNodeUids })

    const { xScale, yScale } = useCartesianScales({ width, height, layout })
    const { nodes, nodeByUid, activeNodeUids, setActiveNodeUids } = useNodes<Datum>({
        root,
        xScale,
        yScale,
        layout,
        getIdentity,
        nodeSize,
        activeNodeSize,
        inactiveNodeSize,
        nodeColor,
        fixNodeColorAtDepth,
    })

    const linkGenerator = useLinkGenerator({ layout, curve: linkCurve })
    const { links, setActiveLinkIds } = useLinks<Datum>({
        root,
        nodeByUid,
        activeNodeUids,
        linkThickness,
        activeLinkThickness,
        inactiveLinkThickness,
        linkColor,
    })

    const setCurrentNode = useSetCurrentNode<Datum>({
        setActiveNodeUids,
        highlightAncestorNodes,
        highlightDescendantNodes,
        links,
        setActiveLinkIds,
        highlightAncestorLinks,
        highlightDescendantLinks,
    })

    return {
        nodes,
        nodeByUid,
        links,
        linkGenerator,
        setCurrentNode,
        toggleNode,
    }
}

/**
 * This hook may generates mouse event handlers for a node according to the main chart props.
 * It's used for the default `Node` component and may be used for custom nodes
 * to simplify their implementation.
 */
export const useNodeMouseEventHandlers = <Datum>(
    node: ComputedNode<Datum>,
    {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        setCurrentNode,
        toggleNode,
        tooltip,
        tooltipPosition,
        tooltipAnchor,
        margin,
    }: {
        isInteractive: boolean
        onMouseEnter?: NodeMouseEventHandler<Datum>
        onMouseMove?: NodeMouseEventHandler<Datum>
        onMouseLeave?: NodeMouseEventHandler<Datum>
        onClick?: NodeMouseEventHandler<Datum>
        setCurrentNode: CurrentNodeSetter<Datum>
        toggleNode: (node: ComputedNode<Datum>) => void
        tooltip?: NodeTooltip<Datum>
        tooltipPosition: TooltipPosition
        tooltipAnchor: TooltipAnchor
        margin: Margin
    }
) => {
    const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip()

    const showTooltip = useMemo(() => {
        if (!tooltip) return undefined

        if (tooltipPosition === 'fixed') {
            return () => {
                const { x, y } = node
                showTooltipAt(
                    createElement(tooltip, {
                        node,
                    }),
                    [x + margin.left, y + margin.top],
                    tooltipAnchor
                )
            }
        }

        return (event: MouseEvent) => {
            showTooltipFromEvent(
                createElement(tooltip, {
                    node,
                }),
                event,
                tooltipAnchor
            )
        }
    }, [node, tooltip, showTooltipFromEvent, showTooltipAt, tooltipPosition, tooltipAnchor, margin])

    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            setCurrentNode(node)
            showTooltip?.(event)
            onMouseEnter?.(node, event)
        },
        [node, showTooltip, setCurrentNode, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            showTooltip?.(event)
            onMouseMove?.(node, event)
        },
        [node, showTooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            setCurrentNode(null)
            hideTooltip()
            onMouseLeave?.(node, event)
        },
        [node, hideTooltip, setCurrentNode, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!node.isLeaf) toggleNode(node)
            onClick?.(node, event)
        },
        [node, toggleNode, onClick]
    )

    return {
        onMouseEnter: isInteractive ? handleMouseEnter : undefined,
        onMouseMove: isInteractive ? handleMouseMove : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onClick: isInteractive ? handleClick : undefined,
    }
}

/**
 * This hook may generates mouse event handlers for a node according to the main chart props.
 * It's used for the default `Node` component and may be used for custom nodes
 * to simplify their implementation.
 */
export const useLinkMouseEventHandlers = <Datum>(
    link: ComputedLink<Datum>,
    {
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
        tooltip,
        tooltipAnchor,
    }: {
        isInteractive: boolean
        onMouseEnter?: LinkMouseEventHandler<Datum>
        onMouseMove?: LinkMouseEventHandler<Datum>
        onMouseLeave?: LinkMouseEventHandler<Datum>
        onClick?: LinkMouseEventHandler<Datum>
        tooltip?: LinkTooltip<Datum>
        tooltipAnchor: TooltipAnchor
    }
) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const showTooltip = useMemo(() => {
        if (!tooltip) return undefined

        return (event: MouseEvent) => {
            showTooltipFromEvent(
                createElement(tooltip, {
                    link,
                }),
                event,
                tooltipAnchor
            )
        }
    }, [link, tooltip, showTooltipFromEvent, tooltipAnchor])

    const handleMouseEnter = useCallback(
        (event: MouseEvent) => {
            showTooltip?.(event)
            onMouseEnter?.(link, event)
        },
        [link, showTooltip, onMouseEnter]
    )

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            showTooltip?.(event)
            onMouseMove?.(link, event)
        },
        [link, showTooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            hideTooltip()
            onMouseLeave?.(link, event)
        },
        [link, hideTooltip, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
            onClick?.(link, event)
        },
        [link, onClick]
    )

    return {
        onMouseEnter: isInteractive ? handleMouseEnter : undefined,
        onMouseMove: isInteractive ? handleMouseMove : undefined,
        onMouseLeave: isInteractive ? handleMouseLeave : undefined,
        onClick: isInteractive ? handleClick : undefined,
    }
}
