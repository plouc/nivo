import { useState, useEffect, useMemo } from 'react'
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force'
import {
    InputLink,
    NetworkInputNode,
    NetworkCommonProps,
    NetworkNodeColor,
    NetworkLinkThickness,
    NetworkComputedNode,
    ComputedLink,
} from './types'

const computeForces = <N extends NetworkInputNode>({
    linkDistance,
    repulsivity,
    distanceMin,
    distanceMax,
    center,
}: {
    linkDistance: NetworkCommonProps<N>['linkDistance']
    repulsivity: NetworkCommonProps<N>['repulsivity']
    distanceMin: NetworkCommonProps<N>['distanceMin']
    distanceMax: NetworkCommonProps<N>['distanceMax']
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

export const useNetwork = <N extends NetworkInputNode = NetworkInputNode>({
    nodes,
    links,
    linkDistance,
    repulsivity,
    distanceMin,
    distanceMax,
    center,
    iterations,
}: {
    nodes: N[]
    links: InputLink[]
    linkDistance: NetworkCommonProps<N>['linkDistance']
    repulsivity: NetworkCommonProps<N>['repulsivity']
    distanceMin: NetworkCommonProps<N>['distanceMin']
    distanceMax: NetworkCommonProps<N>['distanceMax']
    center: [number, number]
    iterations: NetworkCommonProps<N>['iterations']
}): [null | NetworkComputedNode<N>[], null | ComputedLink<N>[]] => {
    const [currentNodes, setCurrentNodes] = useState<null | NetworkComputedNode<N>[]>(null)
    const [currentLinks, setCurrentLinks] = useState<null | ComputedLink<N>[]>(null)

    useEffect(() => {
        const forces = computeForces<N>({
            linkDistance,
            repulsivity,
            distanceMin,
            distanceMax,
            center,
        })

        const nodesCopy: N[] = nodes.map(node => ({ ...node }))
        const linksCopy: InputLink[] = links.map(link => ({
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
        setCurrentNodes((nodesCopy as unknown) as NetworkComputedNode<N>[])
        setCurrentLinks(
            ((linksCopy as unknown) as ComputedLink<N>[]).map(link => {
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
            simulation.stop()
        }
    }, [
        nodes,
        links,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        center[0],
        center[1],
    ])

    return [currentNodes, currentLinks]
}

export const useNodeColor = <N extends NetworkInputNode>(color: NetworkNodeColor<N>) =>
    useMemo(() => {
        if (typeof color === 'function') return color
        return () => color
    }, [color])

export const useLinkThickness = <N extends NetworkInputNode>(thickness: NetworkLinkThickness<N>) =>
    useMemo(() => {
        if (typeof thickness === 'function') return thickness
        return () => thickness
    }, [thickness])
