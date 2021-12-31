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
    rootNodeSize = 24,
    minMidNodes = 6,
    maxMidNodes = 16,
    midNodeSize = 16,
    minLeaves = 4,
    maxLeaves = 16,
    leafSize = 8,
} = {}) => {
    const rootNode = {
        id: '0',
        height: 2,
        size: rootNodeSize,
        color: 'rgb(244, 117, 96)',
    }
    let nodes = Array.from({ length: random(minMidNodes, maxMidNodes) }, (_, k) => ({
        id: `${k + 1}`,
        height: 1,
        size: midNodeSize,
        color: 'rgb(97, 205, 187)',
    }))

    const links: Link[] = []
    const extraNodes: ExtraNode[] = []
    nodes.forEach(source => {
        links.push({
            source: '0',
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
