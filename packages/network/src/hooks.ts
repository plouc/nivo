import { useState, useEffect, useMemo, useCallback } from 'react'
import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { AnnotationMatcher, useAnnotations } from '@nivo/annotations'
import { commonDefaultProps } from './defaults'
import {
    InputLink,
    InputNode,
    NetworkCommonProps,
    DerivedProp,
    ComputedNode,
    ComputedLink,
    TransientNode,
    TransientLink,
} from './types'

const useDerivedProp = <Target, Output extends string | number>(
    instruction: DerivedProp<Target, Output>
) =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

const useComputeForces = <Node extends InputNode, Link extends InputLink>({
    linkDistance,
    centeringStrength,
    repulsivity,
    distanceMin,
    distanceMax,
    center,
}: {
    linkDistance: NetworkCommonProps<Node, Link>['linkDistance']
    centeringStrength: NetworkCommonProps<Node, Link>['centeringStrength']
    repulsivity: NetworkCommonProps<Node, Link>['repulsivity']
    distanceMin: NetworkCommonProps<Node, Link>['distanceMin']
    distanceMax: NetworkCommonProps<Node, Link>['distanceMax']
    center: [number, number]
}) => {
    const getLinkDistance = useDerivedProp<Link, number>(linkDistance)

    const centerX = center[0]
    const centerY = center[1]

    return useMemo(() => {
        const linkForce = forceLink<TransientNode<Node>, TransientLink<Node, Link>>()
            .distance(link => getLinkDistance(link.data))
            .strength(centeringStrength)

        const chargeForce = forceManyBody()
            .strength(-repulsivity)
            .distanceMin(distanceMin)
            .distanceMax(distanceMax)

        const centerForce = forceCenter(centerX, centerY)

        return { link: linkForce, charge: chargeForce, center: centerForce }
    }, [
        getLinkDistance,
        centeringStrength,
        repulsivity,
        distanceMin,
        distanceMax,
        centerX,
        centerY,
    ])
}

const useNodeStyle = <Node extends InputNode, Link extends InputLink>({
    size,
    activeSize,
    inactiveSize,
    color,
    borderWidth,
    borderColor,
    isInteractive,
    activeNodeIds,
}: {
    size: NetworkCommonProps<Node, Link>['nodeSize']
    activeSize: NetworkCommonProps<Node, Link>['activeNodeSize']
    inactiveSize: NetworkCommonProps<Node, Link>['inactiveNodeSize']
    color: NetworkCommonProps<Node, Link>['nodeColor']
    borderWidth: NetworkCommonProps<Node, Link>['nodeBorderWidth']
    borderColor: NetworkCommonProps<Node, Link>['nodeBorderColor']
    isInteractive: NetworkCommonProps<Node, Link>['isInteractive']
    activeNodeIds: string[]
}) => {
    const theme = useTheme()

    const getSize = useDerivedProp(size)
    const getColor = useDerivedProp(color)
    const getBorderWidth = useDerivedProp(borderWidth)
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getNormalStyle = useCallback(
        (node: TransientNode<Node>) => {
            const color = getColor(node.data)

            return {
                size: getSize(node.data),
                color,
                borderWidth: getBorderWidth(node.data),
                borderColor: getBorderColor({ ...node, color }),
            }
        },
        [getSize, getColor, getBorderWidth, getBorderColor]
    )

    const getActiveSize = useDerivedProp(activeSize)
    const getActiveStyle = useCallback(
        (node: TransientNode<Node>) => {
            const color = getColor(node.data)

            return {
                size: getActiveSize(node.data),
                color,
                borderWidth: getBorderWidth(node.data),
                borderColor: getBorderColor({ ...node, color }),
            }
        },
        [getActiveSize, getColor, getBorderWidth, getBorderColor]
    )

    const getInactiveSize = useDerivedProp(inactiveSize)
    const getInactiveStyle = useCallback(
        (node: TransientNode<Node>) => {
            const color = getColor(node.data)

            return {
                size: getInactiveSize(node.data),
                color,
                borderWidth: getBorderWidth(node.data),
                borderColor: getBorderColor({ ...node, color }),
            }
        },
        [getInactiveSize, getColor, getBorderWidth, getBorderColor]
    )

    return useCallback(
        (node: TransientNode<Node>) => {
            if (!isInteractive || activeNodeIds.length === 0) return getNormalStyle(node)
            if (activeNodeIds.includes(node.id)) return getActiveStyle(node)
            return getInactiveStyle(node)
        },
        [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, activeNodeIds]
    )
}

export const useNetwork = <Node extends InputNode = InputNode, Link extends InputLink = InputLink>({
    center,
    nodes,
    links,
    linkDistance = commonDefaultProps.linkDistance,
    centeringStrength = commonDefaultProps.centeringStrength,
    repulsivity = commonDefaultProps.repulsivity,
    distanceMin = commonDefaultProps.distanceMin,
    distanceMax = commonDefaultProps.distanceMax,
    iterations = commonDefaultProps.iterations,
    nodeSize = commonDefaultProps.nodeSize,
    activeNodeSize = commonDefaultProps.activeNodeSize,
    inactiveNodeSize = commonDefaultProps.inactiveNodeSize,
    nodeColor = commonDefaultProps.nodeColor,
    nodeBorderWidth = commonDefaultProps.nodeBorderWidth,
    nodeBorderColor = commonDefaultProps.nodeBorderColor,
    linkThickness = commonDefaultProps.linkThickness,
    linkColor = commonDefaultProps.linkColor,
    isInteractive = commonDefaultProps.isInteractive,
}: {
    center: [number, number]
    nodes: Node[]
    links: Link[]
    linkDistance?: NetworkCommonProps<Node, Link>['linkDistance']
    centeringStrength?: NetworkCommonProps<Node, Link>['centeringStrength']
    repulsivity?: NetworkCommonProps<Node, Link>['repulsivity']
    distanceMin?: NetworkCommonProps<Node, Link>['distanceMin']
    distanceMax?: NetworkCommonProps<Node, Link>['distanceMax']
    iterations?: NetworkCommonProps<Node, Link>['iterations']
    nodeSize?: NetworkCommonProps<Node, Link>['nodeSize']
    activeNodeSize?: NetworkCommonProps<Node, Link>['activeNodeSize']
    inactiveNodeSize?: NetworkCommonProps<Node, Link>['inactiveNodeSize']
    nodeColor?: NetworkCommonProps<Node, Link>['nodeColor']
    nodeBorderWidth?: NetworkCommonProps<Node, Link>['nodeBorderWidth']
    nodeBorderColor?: NetworkCommonProps<Node, Link>['nodeBorderColor']
    linkThickness?: NetworkCommonProps<Node, Link>['linkThickness']
    linkColor?: NetworkCommonProps<Node, Link>['linkColor']
    isInteractive?: NetworkCommonProps<Node, Link>['isInteractive']
}) => {
    // we're using `null` instead of empty array so that we can dissociate
    // initial rendering from updates when using transitions.
    const [transientNodes, setTransientNodes] = useState<null | TransientNode<Node>[]>(null)
    const [transientLinks, setTransientLinks] = useState<null | TransientLink<Node, Link>[]>(null)

    const forces = useComputeForces<Node, Link>({
        linkDistance,
        centeringStrength,
        repulsivity,
        distanceMin,
        distanceMax,
        center,
    })

    useEffect(() => {
        // copy the nodes & links to avoid mutating the original ones.
        const _transientNodes: TransientNode<Node>[] = nodes.map(node => ({
            id: node.id,
            data: { ...node },
            // the properties below are populated by D3, via mutations
            index: 0,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
        }))
        const _transientLinks: TransientLink<Node, Link>[] = links.map(link => ({
            data: { ...link },
            // populated by D3, via mutation
            index: 0,
            // replace ids with objects, otherwise D3 does this automatically
            // which is a bit annoying with typings because then `source` & `target`
            // can be either strings (before the simulation) or an objects (after).
            source: _transientNodes.find(node => node.id === link.source)!,
            target: _transientNodes.find(node => node.id === link.target)!,
        }))

        const simulation = forceSimulation(_transientNodes)
            .force('link', forces.link.links(_transientLinks))
            .force('charge', forces.charge)
            .force('center', forces.center)
            .stop()

        // this will set `index`, `x`, `y`, `vx`, `vy` for each node.
        simulation.tick(iterations)

        setTransientNodes(_transientNodes)
        setTransientLinks(_transientLinks)

        return () => {
            simulation.stop()
        }
    }, [nodes, links, forces, iterations, setTransientNodes, setTransientLinks])

    const [activeNodeIds, setActiveNodeIds] = useState<string[]>([])

    const getNodeStyle = useNodeStyle<Node, Link>({
        size: nodeSize,
        activeSize: activeNodeSize,
        inactiveSize: inactiveNodeSize,
        color: nodeColor,
        borderWidth: nodeBorderWidth,
        borderColor: nodeBorderColor,
        isInteractive,
        activeNodeIds,
    })
    const computedNodes: ComputedNode<Node>[] | null = useMemo(() => {
        if (transientNodes === null) return null

        return transientNodes.map(node => ({
            ...node,
            ...getNodeStyle(node),
        }))
    }, [transientNodes, getNodeStyle])

    const theme = useTheme()
    const getLinkThickness = useDerivedProp(linkThickness)
    const getLinkColor = useInheritedColor(linkColor, theme)

    const computedLinks: ComputedLink<Node, Link>[] | null = useMemo(() => {
        if (transientLinks === null || computedNodes === null) return null

        return transientLinks.map(({ index, ...link }) => {
            const linkWithComputedNodes: Omit<ComputedLink<Node, Link>, 'color' | 'thickness'> = {
                id: `${link.source.id}.${link.target.id}`,
                data: link.data,
                index,
                source: computedNodes.find(node => node.id === link.source.id)!,
                target: computedNodes.find(node => node.id === link.target.id)!,
            }

            return {
                ...linkWithComputedNodes,
                thickness: getLinkThickness(linkWithComputedNodes),
                color: getLinkColor(linkWithComputedNodes),
            }
        })
    }, [transientLinks, computedNodes, getLinkThickness, getLinkColor])

    return {
        nodes: computedNodes,
        links: computedLinks,
        setActiveNodeIds,
    }
}

const getNodeAnnotationPosition = <Node extends InputNode>(node: ComputedNode<Node>) => ({
    x: node.x,
    y: node.y,
})

const getNodeAnnotationDimensions = <Node extends InputNode>(node: ComputedNode<Node>) => ({
    size: node.size,
    width: node.size,
    height: node.size,
})

export const useNodeAnnotations = <Node extends InputNode>(
    nodes: ComputedNode<Node>[],
    annotations: AnnotationMatcher<ComputedNode<Node>>[]
) =>
    useAnnotations<ComputedNode<Node>>({
        data: nodes,
        annotations,
        getPosition: getNodeAnnotationPosition,
        getDimensions: getNodeAnnotationDimensions,
    })
