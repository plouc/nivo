const computeNodePath = (node, getIdentity) =>
    node
        .ancestors()
        .map(ancestor => getIdentity(ancestor.data))
        .join('.')

export const computeNodes = ({ root, pack, leavesOnly, getIdentity, getColor }) => {
    // assign a unique id depending on node path to each node
    root.each(node => {
        node.id = getIdentity(node.data)
        node.path = computeNodePath(node, getIdentity)
    })

    pack(root)

    let nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(node => {
        node.color = getColor({ ...node.data, depth: node.depth })
        node.label = false

        return node
    })

    return nodes
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
