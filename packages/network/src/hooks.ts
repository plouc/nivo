import { useState, useEffect, useMemo } from 'react'
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force'
import { InputLink, NetworkInputNode, NetworkCommonProps, NetworkNodeColor } from './types'

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
    let computedLinkDistance
    if (typeof linkDistance === 'function') {
        computedLinkDistance = linkDistance
    } else if (isNumber(linkDistance)) {
        computedLinkDistance = linkDistance
    } else if (isString(linkDistance)) {
        computedLinkDistance = link => get(link, linkDistance)
    }

    const linkForce = forceLink()
        .id(d => d.id)
        .distance(computedLinkDistance)

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
}) => {
    const [currentNodes, setCurrentNodes] = useState([])
    const [currentLinks, setCurrentLinks] = useState([])

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

        const simulation = forceSimulation(nodesCopy)
            .force('link', forces.link.links(linksCopy))
            .force('charge', forces.charge)
            .force('center', forces.center)
            .stop()

        simulation.tick(iterations)

        setCurrentNodes(nodesCopy)
        setCurrentLinks(
            linksCopy.map(link => {
                link.previousSource = currentNodes.find(n => n.id === link.source.id)
                link.previousTarget = currentNodes.find(n => n.id === link.target.id)

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

export const useLinkThickness = thickness =>
    useMemo(() => {
        if (typeof thickness === 'function') return thickness
        return () => thickness
    }, [thickness])
