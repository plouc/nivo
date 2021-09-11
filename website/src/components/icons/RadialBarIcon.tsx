import React from 'react'
import { RadialBar, RadialBarSvgProps } from '@nivo/radial-bar'
import imgLightNeutralImg from '../../assets/icons/radial-bar-light-neutral.png'
import imgLightColoredImg from '../../assets/icons/radial-bar-light-colored.png'
import imgDarkNeutralImg from '../../assets/icons/radial-bar-dark-neutral.png'
import imgDarkColoredImg from '../../assets/icons/radial-bar-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const data: RadialBarSvgProps['data'] = [
    {
        id: 'A',
        data: [{ x: 'A', y: 10 }],
    },
    {
        id: 'B',
        data: [{ x: 'A', y: 20 }],
    },
    {
        id: 'C',
        data: [{ x: 'A', y: 30 }],
    },
]

const RadialBarIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`radial-bar-${type}`} type={type}>
        <RadialBar
            data={data}
            height={ICON_SIZE}
            width={ICON_SIZE}
            innerRadius={.25}
            padding={.3}
            colors={colors[type].colors[3]}
            tracksColor={colors[type].colors[0]}
            enableRadialGrid={false}
            enableCircularGrid={false}
            radialAxisStart={null}
            circularAxisOuter={null}
            animate={false}
        />
    </Icon>
)

export const RadialBarIcon = () => (
    <>
        <RadialBarIconItem type="lightNeutral" />
        <IconImg url={imgLightNeutralImg} />
        <RadialBarIconItem type="lightColored" />
        <IconImg url={imgLightColoredImg} />
        <RadialBarIconItem type="darkNeutral" />
        <IconImg url={imgDarkNeutralImg} />
        <RadialBarIconItem type="darkColored" />
        <IconImg url={imgDarkColoredImg} />
    </>
)
