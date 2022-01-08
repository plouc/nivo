import React from 'react'
import { Bullet, BulletSvgProps, BulletRectsItemProps, BulletMarkersItemProps } from '@nivo/bullet'
import bulletLightNeutralImg from '../../assets/icons/bullet-light-neutral.png'
import bulletLightColoredImg from '../../assets/icons/bullet-light-colored.png'
import bulletDarkNeutralImg from '../../assets/icons/bullet-dark-neutral.png'
import bulletDarkColoredImg from '../../assets/icons/bullet-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'
import { IconType } from './types'

const chartProps: BulletSvgProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        {
            id: 'A',
            ranges: [36, 100],
            measures: [56],
            markers: [76],
        },
        {
            id: 'B',
            ranges: [60, 100],
            measures: [76],
            markers: [88],
        },
        {
            id: 'C',
            ranges: [50, 100],
            measures: [60],
            markers: [74],
        },
    ],
    margin: {
        top: 8,
        bottom: 8,
    },
    titleOffsetX: -300,
    spacing: 8,
    isInteractive: false,
    markerSize: 0.4,
    theme: {
        axis: {
            ticks: {
                line: {
                    strokeWidth: 0,
                },
                text: {
                    fill: 'transparent',
                },
            },
        },
    },
}

const Range = (colors: [string, string]) => (rect: BulletRectsItemProps) => {
    const color = rect.data.v1 === 100 ? colors[1] : colors[0]

    return <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={color} />
}

const Measure = (color: string) => (rect: BulletRectsItemProps) =>
    <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={color} />

const Marker = (color: string) => (marker: BulletMarkersItemProps) =>
    (
        <rect
            fill={color}
            x={marker.x - marker.size / 2}
            y={marker.y - marker.size / 2}
            width={marker.size}
            height={marker.size}
        />
    )

const BulletIconItem = ({ type }: { type: IconType }) => (
    <Icon id={`bullet-${type}`} type={type}>
        <Bullet
            {...chartProps}
            rangeComponent={Range([colors[type].colors[0], colors[type].colors[1]])}
            measureComponent={Measure(colors[type].colors[4])}
            markerComponent={Marker(colors[type].colors[4])}
        />
    </Icon>
)

export const BulletIcon = () => (
    <>
        <BulletIconItem type="lightNeutral" />
        <IconImg url={bulletLightNeutralImg} />
        <BulletIconItem type="lightColored" />
        <IconImg url={bulletLightColoredImg} />
        <BulletIconItem type="darkNeutral" />
        <IconImg url={bulletDarkNeutralImg} />
        <BulletIconItem type="darkColored" />
        <IconImg url={bulletDarkColoredImg} />
    </>
)
