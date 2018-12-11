/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Bar } from '@nivo/bar'
import barGreyImg from '../../assets/icons/bar-grey.png'
import barRedImg from '../../assets/icons/bar-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
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

const BarIcon = () => (
    <Fragment>
        <Icon id="bar-grey">
            <Bar
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#b0aeaf', '#838383', '#767676']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${barGreyImg})`,
            }}
        />
        <Icon id="bar-red">
            <Bar
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#ff8d80', '#f54d31', '#e2462f']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${barRedImg})`,
            }}
        />
    </Fragment>
)

export default BarIcon
