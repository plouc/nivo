/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Stream } from '@nivo/stream'
import streamGreyImg from '../../assets/icons/stream-grey.png'
import streamRedImg from '../../assets/icons/stream-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
    keys: ['A', 'B', 'C'],
    margin: {
        top: 12,
        bottom: 16,
    },
    enableGridX: false,
    enableGridY: false,
    axisBottom: null,
    axisLeft: null,
    offsetType: 'none',
    data: [
        { A: 1, B: 2, C: 1.2 },
        { A: 2.4, B: 1.3, C: 1.2 },
        { A: 0.8, B: 0.6, C: 3 },
        { A: 1, B: 3, C: 3.6 },
        { A: 3.8, B: 1, C: 3 },
        { A: 5.8, B: 2.6, C: 1.6 },
        { A: 5, B: 1.8, C: 1.4 },
    ],
    isInteractive: false,
}

const StreamIcon = () => (
    <Fragment>
        <Icon id="stream-grey">
            <Stream
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#838383', '#b0aeaf', '#767676']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${streamGreyImg})`,
            }}
        />
        <Icon id="stream-red">
            <Stream
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#f15038', '#ff8d80', '#e2462f']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${streamRedImg})`,
            }}
        />
    </Fragment>
)

export default StreamIcon
