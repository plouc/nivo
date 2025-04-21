import React from 'react'
import { PolarBar, PolarBarSvgProps } from '@nivo/polar-bar'
import imgLightNeutralImg from '../../assets/icons/polar-bar-light-neutral.png'
import imgLightColoredImg from '../../assets/icons/polar-bar-light-colored.png'
import imgDarkNeutralImg from '../../assets/icons/polar-bar-dark-neutral.png'
import imgDarkColoredImg from '../../assets/icons/polar-bar-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const data: PolarBarSvgProps['data'] = [
    {
        id: 'A',
        x: 30,
        y: 30,
    },
    {
        id: 'B',
        x: 30,
        y: 20,
    },
    {
        id: 'C',
        x: 20,
        y: 20,
    },
    {
        id: 'D',
        x: 20,
        y: 30,
    },
]

const PolarBarIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`polar-bar-${type}`} type={type}>
        <PolarBar
            data={data}
            keys={['x', 'y']}
            height={ICON_SIZE}
            width={ICON_SIZE}
            innerRadius={0.15}
            colors={colors[type].colors}
            borderWidth={2}
            borderColor={colors[type].background}
            enableRadialGrid={false}
            enableCircularGrid={false}
            radialAxisStart={null}
            circularAxisOuter={null}
            animate={false}
            isInteractive={false}
        />
    </Icon>
)

export const PolarBarIcon = () => (
    <>
        <PolarBarIconItem type="lightNeutral" />
        <IconImg url={imgLightNeutralImg} />
        <PolarBarIconItem type="lightColored" />
        <IconImg url={imgLightColoredImg} />
        <PolarBarIconItem type="darkNeutral" />
        <IconImg url={imgDarkNeutralImg} />
        <PolarBarIconItem type="darkColored" />
        <IconImg url={imgDarkColoredImg} />
    </>
)
