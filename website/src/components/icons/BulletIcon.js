/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Bullet } from '@nivo/bullet'
import bulletGreyImg from '../../assets/icons/bullet-grey.png'
import bulletRedImg from '../../assets/icons/bullet-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
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

const BulletIcon = () => (
    <Fragment>
        <Icon id="bullet-grey">
            <Bullet
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                rangeComponent={Range(['#e2e2e2', '#c5c5c5'])}
                measureComponent={Measure('#666')}
                markerComponent={Marker('#666')}
                theme={{
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
                }}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${bulletGreyImg})`,
            }}
        />
        <Icon id="bullet-red">
            <Bullet
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                rangeComponent={Range(['#ffc6c6', '#ffa4a2'])}
                measureComponent={Measure('#e2462f')}
                markerComponent={Marker('#e2462f')}
                theme={{
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
                }}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${bulletRedImg})`,
            }}
        />
    </Fragment>
)

export default BulletIcon
