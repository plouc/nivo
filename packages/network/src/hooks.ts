import { useState, useEffect, useMemo, useCallback } from 'react'
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { AnnotationMatcher, useAnnotations } from '@nivo/annotations'
import { commonDefaultProps } from './defaults'
import {
    InputLink,
    InputNode,
    NetworkCommonProps,
    NodeDerivedProp,
    LinkDerivedProp,
    ComputedNode,
    ComputedLink,
} from './types'

const computeForces = <Node extends InputNode>({
    linkDistance,
    repulsivity,
    distanceMin,
    distanceMax,
    center,
}: {
    linkDistance: NetworkCommonProps<Node>['linkDistance']
    repulsivity: NetworkCommonProps<Node>['repulsivity']
    distanceMin: NetworkCommonProps<Node>['distanceMin']
    distanceMax: NetworkCommonProps<Node>['distanceMax']
    center: [number, number]
}) => {
    let getLinkDistance
    if (typeof linkDistance === 'function') {
        getLinkDistance = linkDistance
    } else if (isNumber(linkDistance)) {
        getLinkDistance = linkDistance
    } else if (isString(linkDistance)) {
        getLinkDistance = (link: InputLink) => get(link, linkDistance)
    }

    const linkForce = forceLink()
        .id((d: any) => d.id)
        .distance(getLinkDistance as any)

    const chargeForce = forceManyBody()
        .strength(-repulsivity)
        .distanceMin(distanceMin)
        .distanceMax(distanceMax)

    const centerForce = forceCenter(center[0], center[1])

    return { link: linkForce, charge: chargeForce, center: centerForce }
}

const useNodeDerivedProp = <Node extends InputNode, T extends string | number>(
    instruction: NodeDerivedProp<Node, T>
) =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

const useLinkDerivedProp = <Node extends InputNode, T extends string | number>(
    instruction: LinkDerivedProp<Node, T>
) =>
    useMemo(() => {
        if (typeof instruction === 'function') return instruction
        return () => instruction
    }, [instruction])

const useNodeStyle = <Node extends InputNode>({
    size,
    activeSize,
    inactiveSize,
    color,
    borderWidth,
    borderColor,
    isInteractive,
    activeNodeIds,
}: {
    size: NetworkCommonProps<Node>['nodeSize']
    activeSize: NetworkCommonProps<Node>['activeNodeSize']
    inactiveSize: NetworkCommonProps<Node>['inactiveNodeSize']
    color: NetworkCommonProps<Node>['nodeColor']
    borderWidth: NetworkCommonProps<Node>['nodeBorderWidth']
    borderColor: NetworkCommonProps<Node>['nodeBorderColor']
    isInteractive: NetworkCommonProps<Node>['isInteractive']
    activeNodeIds: string[]
}) => {
    const theme = useTheme()

    const getSize = useNodeDerivedProp(size)
    const getColor = useNodeDerivedProp(color)
    const getBorderWidth = useNodeDerivedProp(borderWidth)
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getNormalStyle = useCallback(
        (node: ComputedNode<Node>) => ({
            size: getSize(node),
            color: getColor(node),
            borderWidth: getBorderWidth(node),
            borderColor: getBorderColor(node),
        }),
        [getSize, getColor, getBorderWidth, getBorderColor]
    )

    const getActiveSize = useNodeDerivedProp(activeSize)
    const getActiveStyle = useCallback(
        (node: ComputedNode<Node>) => ({
            size: getActiveSize(node),
            color: getColor(node),
            borderWidth: getBorderWidth(node),
            borderColor: getBorderColor(node),
        }),
        [getActiveSize, getColor, getBorderWidth, getBorderColor]
    )

    const getInactiveSize = useNodeDerivedProp(inactiveSize)
    const getInactiveStyle = useCallback(
        (node: ComputedNode<Node>) => ({
            size: getInactiveSize(node),
            color: getColor(node),
            borderWidth: getBorderWidth(node),
            borderColor: getBorderColor(node),
        }),
        [getInactiveSize, getColor, getBorderWidth, getBorderColor]
    )

    return useCallback(
        (node: ComputedNode<Node>) => {
            if (!isInteractive || activeNodeIds.length === 0) return getNormalStyle(node)
            if (activeNodeIds.includes(node.id)) return getActiveStyle(node)
            return getInactiveStyle(node)
        },
        [getNormalStyle, getActiveStyle, getInactiveStyle, isInteractive, activeNodeIds]
    )
}

export const useNetwork = <Node extends InputNode = InputNode>({
    center,
    nodes,
    links,
    linkDistance = commonDefaultProps.linkDistance,
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
    links: InputLink[]
    linkDistance?: NetworkCommonProps<Node>['linkDistance']
    repulsivity?: NetworkCommonProps<Node>['repulsivity']
    distanceMin?: NetworkCommonProps<Node>['distanceMin']
    distanceMax?: NetworkCommonProps<Node>['distanceMax']
    iterations?: NetworkCommonProps<Node>['iterations']
    nodeSize?: NetworkCommonProps<Node>['nodeSize']
    activeNodeSize?: NetworkCommonProps<Node>['activeNodeSize']
    inactiveNodeSize?: NetworkCommonProps<Node>['inactiveNodeSize']
    nodeColor?: NetworkCommonProps<Node>['nodeColor']
    nodeBorderWidth?: NetworkCommonProps<Node>['nodeBorderWidth']
    nodeBorderColor?: NetworkCommonProps<Node>['nodeBorderColor']
    linkThickness?: NetworkCommonProps<Node>['linkThickness']
    linkColor?: NetworkCommonProps<Node>['linkColor']
    isInteractive?: NetworkCommonProps<Node>['isInteractive']
}) => {
    // we're using `null` instead of empty array so that we can dissociate
    // initial rendering from updates when using transitions.
    const [currentNodes, setCurrentNodes] = useState<null | ComputedNode<Node>[]>(null)
    const [currentLinks, setCurrentLinks] = useState<null | ComputedLink<Node>[]>(null)

    const centerX = center[0]
    const centerY = center[1]

    useEffect(() => {
        const forces = computeForces<Node>({
            linkDistance,
            repulsivity,
            distanceMin,
            distanceMax,
            center: [centerX, centerY],
        })

        const nodesCopy: Node[] = nodes.map(node => ({ ...node }))
        const linksCopy: InputLink[] = links.map(link => ({
            // generate a unique id for each link
            id: `${link.source}.${link.target}`,
            ...link,
        }))

        const simulation = forceSimulation(nodesCopy as any[])
            .force('link', forces.link.links(linksCopy))
            .force('charge', forces.charge)
            .force('center', forces.center)
            .stop()

        simulation.tick(iterations)

        // d3 mutates data, hence the castings
        setCurrentNodes(nodesCopy as unknown as ComputedNode<Node>[])
        setCurrentLinks(
            (linksCopy as unknown as ComputedLink<Node>[]).map(link => {
                link.previousSource = currentNodes
                    ? currentNodes.find(n => n.id === link.source.id)
                    : undefined
                link.previousTarget = currentNodes
                    ? currentNodes.find(n => n.id === link.target.id)
                    : undefined

                return link
            })
        )

        return () => {
            // prevent the simulation from continuing in case the data is updated.
            simulation.stop()
        }
    }, [
        centerX,
        centerY,
        nodes,
        links,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
    ])

    const [activeNodeIds, setActiveNodeIds] = useState<string[]>([])

    const theme = useTheme()
    const getLinkThickness = useLinkDerivedProp(linkThickness)
    const getLinkColor = useInheritedColor(linkColor, theme)

    const getNodeStyle = useNodeStyle<Node>({
        size: nodeSize,
        activeSize: activeNodeSize,
        inactiveSize: inactiveNodeSize,
        color: nodeColor,
        borderWidth: nodeBorderWidth,
        borderColor: nodeBorderColor,
        isInteractive,
        activeNodeIds,
    })

    const enhancedNodes: ComputedNode<Node>[] | null = useMemo(() => {
        if (currentNodes === null) return null

        return currentNodes.map(node => {
            return {
                ...node,
                ...getNodeStyle(node),
            }
        })
    }, [currentNodes, getNodeStyle])

    const enhancedLinks: ComputedLink<Node>[] | null = useMemo(() => {
        if (currentLinks === null) return null

        return currentLinks.map(link => {
            return {
                ...link,
                thickness: getLinkThickness(link),
                color: getLinkColor(link),
            }
        })
    }, [currentLinks, getLinkThickness, getLinkColor])

    return {
        nodes: enhancedNodes,
        links: enhancedLinks,
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
