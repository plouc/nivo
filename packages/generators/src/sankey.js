/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import range from 'lodash/range'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import { randColor } from './color'
import { names } from './sets'

const availableNodes = names.map(name => ({ id: name }))

const getNodeTargets = (id, links, currentPath) => {
    const targets = links
        .filter(({ source }) => source === id)
        .map(({ target }) => {
            if (target === id) {
                throw new Error(
                    `[sankey] a node cannot be linked on itself:\n  link: ${id} —> ${id}`
                )
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

export const generateSankeyData = ({ nodeCount, maxIterations = 3 } = {}) => {
    const nodes = availableNodes.slice(0, nodeCount).map(node =>
        Object.assign({}, node, {
            color: randColor(),
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
