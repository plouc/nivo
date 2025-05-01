import React, { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { Tree, TreeSvgProps } from '@nivo/tree'
import treeLightNeutralImg from '../../assets/icons/tree-light-neutral.png'
import treeLightColoredImg from '../../assets/icons/tree-light-colored.png'
import treeDarkNeutralImg from '../../assets/icons/tree-dark-neutral.png'
import treeDarkColoredImg from '../../assets/icons/tree-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    id: string
    children?: Datum[]
}

const chartProps: TreeSvgProps<Datum> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: {
        id: 'X',
        children: [
            {
                id: 'A',
                children: [{ id: '0' }],
            },
            {
                id: 'B',
                children: [{ id: '0' }],
            },
            {
                id: 'C',
                children: [{ id: '0' }],
            },
        ],
    },
    margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
    },
    mode: 'dendogram',
    nodeSize: 14,
    linkThickness: 5,
    enableLabel: false,
    isInteractive: false,
}

const TreeIconItem = ({ type }: { type: IconType }) => {
    const currentColors = colors[type].colors

    const theme: Theme = useMemo(
        () => ({
            grid: {
                line: {
                    stroke: currentColors[1],
                    strokeWidth: 2,
                },
            },
        }),
        [type]
    )

    let nodeColor: string
    let linkColor: string
    if (type.startsWith('light')) {
        nodeColor = currentColors[4]
        linkColor = currentColors[1]
    } else {
        nodeColor = currentColors[0]
        linkColor = currentColors[2]
    }

    return (
        <Icon id={`tree-${type}`} type={type}>
            <Tree<Datum>
                {...chartProps}
                nodeColor={nodeColor}
                linkColor={linkColor}
                theme={theme}
            />
        </Icon>
    )
}

export const TreeIcon = () => (
    <>
        <TreeIconItem type="lightNeutral" />
        <IconImg url={treeLightNeutralImg} />
        <TreeIconItem type="lightColored" />
        <IconImg url={treeLightColoredImg} />
        <TreeIconItem type="darkNeutral" />
        <IconImg url={treeDarkNeutralImg} />
        <TreeIconItem type="darkColored" />
        <IconImg url={treeDarkColoredImg} />
    </>
)
