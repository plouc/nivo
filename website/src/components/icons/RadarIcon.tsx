import React, { useMemo } from 'react'
import { Theme } from '@nivo/core'
import { Radar, RadarSvgProps } from '@nivo/radar'
import radarLightNeutralImg from '../../assets/icons/radar-light-neutral.png'
import radarLightColoredImg from '../../assets/icons/radar-light-colored.png'
import radarDarkNeutralImg from '../../assets/icons/radar-dark-neutral.png'
import radarDarkColoredImg from '../../assets/icons/radar-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

type Datum = {
    id: string
    A: number
    B: number
    C: number
}

const chartProps: RadarSvgProps<Datum> = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        { id: '0', A: 33, B: 52, C: 76 },
        { id: '1', A: 30, B: 42, C: 83 },
        { id: '2', A: 25, B: 38, C: 62 },
        { id: '3', A: 20, B: 50, C: 82 },
        { id: '4', A: 30, B: 50, C: 64 },
    ],
    keys: ['C', 'B', 'A'],
    indexBy: 'id',
    maxValue: 100,
    margin: {
        top: 3,
        right: 3,
        bottom: -4,
        left: 3,
    },
    enableDots: false,
    curve: 'linearClosed',
    fillOpacity: 1,
    gridLevels: 1,
    gridShape: 'linear',
    isInteractive: false,
    animate: false,
}

const RadarIconItem = ({ type }: { type: IconType }) => {
    const theme: Theme = useMemo(
        () => ({
            grid: {
                line: {
                    strokeWidth: 3,
                    stroke: colors[type].colors[3],
                },
            },
        }),
        [type]
    )

    return (
        <Icon id={`radar-${type}`} type={type}>
            <Radar<Datum>
                {...chartProps}
                colors={[colors[type].colors[4], colors[type].colors[2], colors[type].colors[0]]}
                theme={theme}
            />
        </Icon>
    )
}

export const RadarIcon = () => (
    <>
        <RadarIconItem type="lightNeutral" />
        <IconImg url={radarLightNeutralImg} />
        <RadarIconItem type="lightColored" />
        <IconImg url={radarLightColoredImg} />
        <RadarIconItem type="darkNeutral" />
        <IconImg url={radarDarkNeutralImg} />
        <RadarIconItem type="darkColored" />
        <IconImg url={radarDarkColoredImg} />
    </>
)
