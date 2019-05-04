/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useState, useEffect, useMemo } from 'react'
import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import { forceSimulation, forceManyBody, forceCenter, forceLink } from 'd3-force'

const computeForces = ({ linkDistance, repulsivity, distanceMin, distanceMax, center }) => {
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

export const useNetwork = ({
    nodes,
    links,
    linkDistance,
    repulsivity,
    distanceMin,
    distanceMax,
    center,
    iterations,
}) => {
    const [currentNodes, setCurrentNodes] = useState([])
    const [currentLinks, setCurrentLinks] = useState([])

    useEffect(() => {
        const forces = computeForces({
            linkDistance,
            repulsivity,
            distanceMin,
            distanceMax,
            center,
        })

        const nodesCopy = nodes.map(node => ({ ...node }))
        const linksCopy = links.map(link => ({
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

export const useNodeColor = color =>
    useMemo(() => {
        if (typeof color === 'function') return color
        return () => color
    }, [color])

export const useLinkThickness = thickness =>
    useMemo(() => {
        if (typeof thickness === 'function') return thickness
        return () => thickness
    }, [thickness])
