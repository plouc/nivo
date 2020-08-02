/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Bullet } from '@nivo/bullet'
import bulletLightNeutralImg from '../../assets/icons/bullet-light-neutral.png'
import bulletLightColoredImg from '../../assets/icons/bullet-light-colored.png'
import bulletDarkNeutralImg from '../../assets/icons/bullet-dark-neutral.png'
import bulletDarkColoredImg from '../../assets/icons/bullet-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
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

const Range = colors => d => {
    const color = d.data.v1 === 100 ? colors[1] : colors[0]

    return <rect x={d.x} y={d.y} width={d.width} height={d.height} fill={color} />
}

const Measure = color => d => (
    <rect x={d.x} y={d.y} width={d.width} height={d.height} fill={color} />
)

const Marker = color => d => (
    <rect fill={color} x={d.x - d.size / 2} y={d.y - d.size / 2} width={d.size} height={d.size} />
)

const BulletIconItem = ({ type }) => (
    <Icon id={`bullet-${type}`} type={type}>
        <Bullet
            {...chartProps}
            rangeComponent={Range([colors[type].colors[0], colors[type].colors[1]])}
            measureComponent={Measure(colors[type].colors[4])}
            markerComponent={Marker(colors[type].colors[4])}
        />
    </Icon>
)

const BulletIcon = () => (
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

export default BulletIcon
