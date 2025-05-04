import React from 'react'
import { Icicle, IcicleSvgProps } from '@nivo/icicle'
import icicleLightNeutralImg from '../../assets/icons/icicle-light-neutral.png'
import icicleLightColoredImg from '../../assets/icons/icicle-light-colored.png'
import icicleDarkNeutralImg from '../../assets/icons/icicle-dark-neutral.png'
import icicleDarkColoredImg from '../../assets/icons/icicle-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const chartProps: IcicleSvgProps<any> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    padding: 2,
    data: {
        id: 'A',
        children: [
            {
                id: 'A',
                value: 2,
            },
            {
                id: 'B',
                children: [
                    {
                        id: 'A',
                        children: [
                            {
                                id: 'A',
                                children: [
                                    { id: 'A', value: 1 },
                                    { id: 'B', value: 2 },
                                ],
                            },
                            { id: 'B', value: 2 },
                        ],
                    },
                    { id: 'B', value: 2 },
                ],
            },
            {
                id: 'C',
                value: 4,
            },
        ],
    },
    orientation: 'bottom',
    borderRadius: 2,
    enableRectLabels: false,
    isInteractive: false,
    animate: false,
    enableZooming: false,
}

const IcicleIconItem = ({ type }: { type: IconType }) => {
    const currentColors = [...colors[type].colors].reverse()

    return (
        <Icon id={`icicle-${type}`} type={type}>
            <Icicle
                {...chartProps}
                colors={currentColors}
                colorBy="depth"
                inheritColorFromParent={false}
            />
        </Icon>
    )
}

export const IcicleIcon = () => (
    <>
        <IcicleIconItem type="lightNeutral" />
        <IconImg url={icicleLightNeutralImg} />
        <IcicleIconItem type="lightColored" />
        <IconImg url={icicleLightColoredImg} />
        <IcicleIconItem type="darkNeutral" />
        <IconImg url={icicleDarkNeutralImg} />
        <IcicleIconItem type="darkColored" />
        <IconImg url={icicleDarkColoredImg} />
    </>
)
