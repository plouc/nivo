import random from 'lodash/random'

type Link = {
    distance: number
    source: string
    target: string
}

type ExtraNode = {
    color: string
    depth: number
    id: string
    radius: number
}

export const generateNetworkData = ({
    rootNodeRadius = 12,
    minMidNodes = 6,
    maxMidNodes = 16,
    midNodeRadius = 8,
    minLeaves = 4,
    maxLeaves = 16,
    leafRadius = 4,
} = {}) => {
    const rootNode = {
        id: '0',
        radius: rootNodeRadius,
        depth: 0,
        color: 'rgb(244, 117, 96)',
    }
    let nodes = Array.from({ length: random(minMidNodes, maxMidNodes) }, (_, k) => ({
        id: `${k + 1}`,
        radius: midNodeRadius,
        depth: 1,
        color: 'rgb(97, 205, 187)',
    }))

    const links: Link[] = []
    const extraNodes: ExtraNode[] = []
    nodes.forEach(source => {
        links.push({
            source: '0',
            target: source.id,
            distance: 50,
        })
        nodes.forEach(target => {
            if (Math.random() < 0.04) {
                links.push({
                    source: source.id,
                    target: target.id,
                    distance: 70,
                })
            }
        })
        Array.from({ length: random(minLeaves, maxLeaves) }, (_, k) => {
            extraNodes.push({
                id: `${source.id}.${k}`,
                radius: leafRadius,
                depth: 2,
                color: 'rgb(232, 193, 160)',
            })
            links.push({
                source: source.id,
                target: `${source.id}.${k}`,
                distance: 30,
            })

            return null
        })
    })

    nodes.push(rootNode)
    nodes = nodes.concat(extraNodes)

    return { nodes, links }
}
