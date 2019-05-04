/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Network } from '@nivo/network'
import networkLightNeutralImg from '../../assets/icons/network-light-neutral.png'
import networkLightColoredImg from '../../assets/icons/network-light-colored.png'
import networkDarkNeutralImg from '../../assets/icons/network-dark-neutral.png'
import networkDarkColoredImg from '../../assets/icons/network-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const getData = currentColors => {
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

    const leaves = []
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
    distance: link => link.distance,
    repulsivity: 5,
    linkThickness: 2,
    linkColor: { from: 'source.color' },
    animate: false,
    isInteractive: false,
}

const NetworkIconItem = ({ type }) => (
    <Icon id={`network-${type}`} type={type}>
        <Network {...chartProps} {...getData(colors[type].colors)} />
    </Icon>
)

const NetworkIcon = () => (
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

export default NetworkIcon
