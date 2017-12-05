const range = require('lodash.range')
const random = require('lodash.random')
const shuffle = require('lodash.shuffle')
const color = require('./color')
const sets = require('./sets')

const availableNodes = sets.names.map(name => ({ id: name }))

const getNodeTargets = (id, links, currentPath) => {
    const targets = links.filter(({ source }) => source === id).map(({ target }) => {
        if (target === id) {
            throw new Error(`[sankey] a node cannot be linked on itself:\n  link: ${id} —> ${id}`)
        }
        if (currentPath && currentPath.includes(target)) {
            throw new Error(
                `[sankey] found cyclic dependency:\n  link: ${currentPath.join(
                    ' —> '
                )} —> ${target}`
            )
        }
        return target
    })

    return targets.reduce(
        (acc, targetId) =>
            acc.concat(
                getNodeTargets(
                    targetId,
                    links,
                    currentPath ? [...currentPath, targetId] : [id, targetId]
                )
            ),
        targets
    )
}

const getNodesTargets = links =>
    links.reduce((targetsById, link) => {
        if (!targetsById[link.source]) {
            targetsById[link.source] = getNodeTargets(link.source, links)
        }

        return targetsById
    }, {})

module.exports = ({ nodeCount, maxIterations = 3 } = {}) => {
    const nodes = availableNodes.slice(0, nodeCount).map(node =>
        Object.assign({}, node, {
            color: color.randColor(),
        })
    )

    const links = []
    shuffle(nodes).forEach(({ id }) => {
        range(random(1, maxIterations)).forEach(() => {
            const targetsById = getNodesTargets(links)
            const randId = shuffle(nodes.filter(n => n.id !== id).map(n => n.id))[0]
            if (
                (!targetsById[randId] || !targetsById[randId].includes(id)) &&
                (!targetsById[id] || !targetsById[id].includes(randId))
            ) {
                links.push({
                    source: id,
                    target: randId,
                    value: random(5, 200),
                })
            }
        })
    })

    return { nodes, links }
}
