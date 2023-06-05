import React from 'react'
import { Network } from '@bitbloom/nivo-network'
import networkLightNeutralImg from '../../assets/icons/network-light-neutral.png'
import networkLightColoredImg from '../../assets/icons/network-light-colored.png'
import networkDarkNeutralImg from '../../assets/icons/network-dark-neutral.png'
import networkDarkColoredImg from '../../assets/icons/network-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Node = {
    id: string
    size: number
    color: string
}

const getData = (currentColors: any) => {
    let nodes = 'ABCDE'.split('').map(id => ({
        id,
        size: 10,
        color: currentColors[2],
    }))
    const links = nodes.map(node => ({
        source: 'root',
        target: node.id,
        distance: 30,
    }))

    const leaves: Node[] = []
    nodes.forEach(node => {
        Array.from({ length: 7 }, (_v, k) => {
            leaves.push({
                id: `${node.id}.${k}`,
                size: 6,
                color: currentColors[4],
            })
            links.push({
                source: node.id,
                target: `${node.id}.${k}`,
                distance: 12,
            })
        })
    })

    nodes = nodes.concat(leaves)
    nodes.unshift({ id: 'root', size: 20, color: currentColors[4] })

    return { nodes, links }
}

type Link = ReturnType<typeof getData>['links'][number]

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    linkDistance: (link: Link) => link.distance,
    centeringStrength: 1.2,
    repulsivity: 4,
    linkThickness: 2,
    nodeSize: (node: Node) => node.size,
    nodeColor: (node: Node) => node.color,
    linkColor: { from: 'source.color' },
    animate: false,
    isInteractive: false,
}

const NetworkIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`network-${type}`} type={type}>
        <Network<Node, Link> {...chartProps} data={getData(colors[type].colors)} />
    </Icon>
)

export const NetworkIcon = () => (
    <>
        <NetworkIconItem type="lightNeutral" />
        <IconImg url={networkLightNeutralImg} />
        <NetworkIconItem type="lightColored" />
        <IconImg url={networkLightColoredImg} />
        <NetworkIconItem type="darkNeutral" />
        <IconImg url={networkDarkNeutralImg} />
        <NetworkIconItem type="darkColored" />
        <IconImg url={networkDarkColoredImg} />
    </>
)
