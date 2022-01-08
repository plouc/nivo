import React, { useMemo } from 'react'
import { Bar, BarSvgProps } from '@nivo/bar'
import barLightNeutralImg from '../../assets/icons/bar-light-neutral.png'
import barLightColoredImg from '../../assets/icons/bar-light-colored.png'
import barDarkNeutralImg from '../../assets/icons/bar-dark-neutral.png'
import barDarkColoredImg from '../../assets/icons/bar-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    id: string
    A: number
    B: number
    C: number
}

const chartProps: BarSvgProps<Datum> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    indexBy: 'id',
    keys: ['A', 'B', 'C'],
    margin: {
        top: 12,
        bottom: 16,
    },
    padding: 0.2,
    enableGridX: false,
    enableGridY: false,
    axisBottom: null,
    axisLeft: null,
    enableLabel: false,
    data: [
        { id: '0', A: 3.2, B: 2, C: 1.6 },
        { id: '1', A: 2.8, B: 1.7, C: 1.2 },
        { id: '2', A: 4, B: 2.4, C: 1.8 },
        { id: '3', A: 6, B: 4, C: 2 },
        { id: '4', A: 5, B: 3, C: 2 },
    ],
    isInteractive: false,
}

const BarIconItem = ({ type }: { type: IconType }) => {
    const typedColors = useMemo(
        () => [colors[type].colors[1], colors[type].colors[2], colors[type].colors[4]],
        [type]
    )

    return (
        <Icon id={`bar-${type}`} type={type}>
            <Bar<Datum> {...chartProps} colors={typedColors} />
        </Icon>
    )
}

export const BarIcon = () => (
    <>
        <BarIconItem type="lightNeutral" />
        <IconImg url={barLightNeutralImg} />
        <BarIconItem type="lightColored" />
        <IconImg url={barLightColoredImg} />
        <BarIconItem type="darkNeutral" />
        <IconImg url={barDarkNeutralImg} />
        <BarIconItem type="darkColored" />
        <IconImg url={barDarkColoredImg} />
    </>
)
