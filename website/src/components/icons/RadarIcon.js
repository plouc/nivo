/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Radar } from '@nivo/radar'
import radarGreyImg from '../../assets/icons/radar-grey.png'
import radarRedImg from '../../assets/icons/radar-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
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
}

const RadarIcon = () => (
    <Fragment>
        <Icon
            id="radar-grey"
            style={{
                backgroundImage: `url(${radarGreyImg})`,
            }}
        >
            <Radar
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#767676', '#b0aeaf', '#cbcbcb']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${radarGreyImg})`,
            }}
        />
        <Icon
            id="radar-red"
            style={{
                backgroundImage: `url(${radarRedImg})`,
            }}
        >
            <Radar
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#e2462f', '#ff8d80', '#ffb8b5']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${radarRedImg})`,
            }}
        />
    </Fragment>
)

export default RadarIcon
