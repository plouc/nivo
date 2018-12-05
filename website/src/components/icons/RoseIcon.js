/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Rose } from '@nivo/rose'
import roseGreyImg from '../../assets/icons/rose-grey.png'
import roseRedImg from '../../assets/icons/rose-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
    indexBy: 'id',
    keys: ['A', 'B', 'C'],
    data: [
        { id: '0', A: 3.2, B: 2, C: 1.6 },
        { id: '1', A: 6, B: 4, C: 2 },
        { id: '2', A: 5, B: 3, C: 2 },
    ],
    isInteractive: false,
    enableArcLabel: false,
}

const RoseIcon = () => (
    <Fragment>
        <Icon id="rose-grey">
            <Rose
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#cbcbcb', '#b0aeaf', '#767676']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${roseGreyImg})`,
            }}
        />
        <Icon id="rose-red">
            <Rose
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#ffb8b5', '#ff8d80', '#e2462f']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${roseRedImg})`,
            }}
        />
    </Fragment>
)

export default RoseIcon
