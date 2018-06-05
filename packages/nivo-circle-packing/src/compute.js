/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import min from 'lodash/min'
import max from 'lodash/max'
import { scaleLinear } from 'd3-scale'

const computeNodePath = (node, getIdentity) =>
    node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .join('.')

export const computeNodes = ({ root, pack, leavesOnly, getIdentity, getColor }) => {
    pack(root)

    const values = []
    const sizes = []

    // assign a unique id depending on node path to each node
    root.each(node => {
        values.push(node.value)
        sizes.push(node.r * 2)
        node.id = getIdentity(node.data)
        node.path = computeNodePath(node, getIdentity)
    })

    const sizeScale = scaleLinear()
        .domain([min(values), max(values)])
        .rangeRound([min(sizes), max(sizes)])
        .nice()

    let nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(node => {
        node.color = getColor({ ...node.data, depth: node.depth })
        node.label = false

        return node
    })

    return { nodes, sizeScale }
}

export const computeZoom = (nodes, currentNodePath, width, height) => {
    const currentNode = nodes.find(({ path }) => path === currentNodePath)

    if (!currentNode) return nodes

    const ratio = Math.min(width, height) / (currentNode.r * 2)
    const offsetX = width / 2 - currentNode.x * ratio
    const offsetY = height / 2 - currentNode.y * ratio

    return nodes.map(node => ({
        ...node,
        r: node.r * ratio,
        x: node.x * ratio + offsetX,
        y: node.y * ratio + offsetY,
    }))
}
