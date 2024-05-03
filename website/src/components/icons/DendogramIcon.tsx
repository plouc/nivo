import React, { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { Dendogram, DendogramSvgProps } from '@nivo/dendogram'
import dendogramLightNeutralImg from '../../assets/icons/dendogram-light-neutral.png'
import dendogramLightColoredImg from '../../assets/icons/dendogram-light-colored.png'
import dendogramDarkNeutralImg from '../../assets/icons/dendogram-dark-neutral.png'
import dendogramDarkColoredImg from '../../assets/icons/dendogram-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    id: string
    children?: Datum[]
}

const chartProps: DendogramSvgProps<Datum> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: {
        id: 'A',
        children: [
            {
                id: 'B',
                children: [{ id: 'E' }],
            },
            {
                id: 'C',
                children: [{ id: 'F' }],
            },
            {
                id: 'D',
                children: [{ id: 'G' }],
            },
        ],
    },
    margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
    linkThickness: 6,
    isInteractive: false,
}

const DendogramIconItem = ({ type }: { type: IconType }) => {
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
        <Icon id={`dendogram-${type}`} type={type}>
            <Dendogram<Datum>
                {...chartProps}
                nodeColor={nodeColor}
                linkColor={linkColor}
                theme={theme}
            />
        </Icon>
    )
}

export const DendogramIcon = () => (
    <>
        <DendogramIconItem type="lightNeutral" />
        <IconImg url={dendogramLightNeutralImg} />
        <DendogramIconItem type="lightColored" />
        <IconImg url={dendogramLightColoredImg} />
        <DendogramIconItem type="darkNeutral" />
        <IconImg url={dendogramDarkNeutralImg} />
        <DendogramIconItem type="darkColored" />
        <IconImg url={dendogramDarkColoredImg} />
    </>
)
