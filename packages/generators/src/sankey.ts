import range from 'lodash/range'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import { randColor } from './color'
import { names } from './sets'

type Link = {
    source: string
    target: string
    value: number
}

const availableNodes = names.map(name => ({ id: name }))

const getNodeTargets = (id: string, links: Link[], currentPath?: string[]): string[] => {
    const targets = links
        .filter(({ source }) => source === id)
        .map(({ target }) => {
            if (target === id) {
                throw new Error(
                    `[sankey] a node cannot be linked on itself:\n  link: ${id} —> ${id}`
                )
            }
            if (currentPath?.includes(target)) {
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

const getNodesTargets = (links: Link[]) =>
    links.reduce<Record<string, string[]>>((targetsById, link) => {
        if (!targetsById[link.source]) {
            targetsById[link.source] = getNodeTargets(link.source, links)
        }

        return targetsById
    }, {})

export const generateSankeyData = ({
    nodeCount,
    maxIterations = 3,
}: {
    nodeCount?: number
    maxIterations?: number
} = {}) => {
    const nodes = availableNodes.slice(0, nodeCount).map(node =>
        Object.assign({}, node, {
            nodeColor: randColor(),
        })
    )

    const links: Link[] = []
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
