import random from 'lodash/random'

type Link = {
    source: string
    target: string
    distance: number
}

type ExtraNode = {
    id: string
    height: number
    color: string
    size: number
}

export const generateNetworkData = ({
    rootSize = 32,
    midSize = 24,
    leafSize = 12,
    minMidNodes = 5,
    maxMidNodes = 11,
    minLeaves = 3,
    maxLeaves = 9,
}: {
    rootSize?: number
    midSize?: number
    leafSize?: number
    minMidNodes?: number
    maxMidNodes?: number
    minLeaves?: number
    maxLeaves?: number
} = {}) => {
    const rootNode = {
        id: 'Node 0',
        height: 2,
        size: rootSize,
        color: 'rgb(244, 117, 96)',
    }
    let nodes = Array.from({ length: random(minMidNodes, maxMidNodes) }, (_, k) => ({
        id: `Node ${k + 1}`,
        height: 1,
        size: midSize,
        color: 'rgb(97, 205, 187)',
    }))

    const links: Link[] = []
    const extraNodes: ExtraNode[] = []
    nodes.forEach(source => {
        links.push({
            source: 'Node 0',
            target: source.id,
            distance: 80,
        })
        nodes.forEach(target => {
            if (Math.random() < 0.04) {
                links.push({
                    source: source.id,
                    target: target.id,
                    distance: 80,
                })
            }
        })
        Array.from({ length: random(minLeaves, maxLeaves) }, (_, k) => {
            extraNodes.push({
                id: `${source.id}.${k}`,
                height: 0,
                size: leafSize,
                color: 'rgb(232, 193, 160)',
            })
            links.push({
                source: source.id,
                target: `${source.id}.${k}`,
                distance: 50,
            })

            return null
        })
    })

    nodes.push(rootNode)
    nodes = nodes.concat(extraNodes)

    return { nodes, links }
}
