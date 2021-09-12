import React from 'react'
import { Network } from '@nivo/network'
import networkLightNeutralImg from '../../assets/icons/network-light-neutral.png'
import networkLightColoredImg from '../../assets/icons/network-light-colored.png'
import networkDarkNeutralImg from '../../assets/icons/network-dark-neutral.png'
import networkDarkColoredImg from '../../assets/icons/network-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const getData = (currentColors: any) => {
    let nodes = 'ABCDE'.split('').map(id => ({
        id,
        radius: 5,
        color: currentColors[2],
    }))
    const links = nodes.map(node => ({
        source: 'root',
        target: node.id,
        distance: 2,
    }))

    const leaves: any[] = []
    nodes.forEach(node => {
        Array.from({ length: 7 }, (v, k) => {
            leaves.push({
                id: `${node.id}.${k}`,
                radius: 3,
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
    nodes.unshift({ id: 'root', radius: 11, color: currentColors[4] })

    return { nodes, links }
}

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    linkDistance: (link: any) => link.distance,
    repulsivity: 5,
    linkThickness: 2,
    nodeColor: (node: any) => node.color,
    linkColor: { from: 'source.color' },
    animate: false,
    isInteractive: false,
}

const NetworkIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`network-${type}`} type={type}>
        <Network {...chartProps} data={getData(colors[type].colors)} />
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
