/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Bubble } from '@nivo/circle-packing'
import circlePackingGreyImg from '../../assets/icons/circle-packing-grey.png'
import circlePackingRedImg from '../../assets/icons/circle-packing-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = colors => ({
    root: {
        id: 'root',
        children: [
            { id: 'v', value: 0.1, color: colors[1] },
            { id: 'a', value: 3.4, color: colors[1] },
            { id: 'b', value: 2.6, color: colors[1] },
            { id: 'd', value: 1, color: colors[1] },
            { id: 'u', value: 0.1, color: colors[1] },
            { id: 'c', value: 0.1, color: colors[1] },
            { id: 'q', value: 0.7, color: colors[1] },
            { id: 's', value: 2, color: colors[1] },
            { id: 't', value: 0.1, color: colors[1] },
            { id: 'j', value: 0.2, color: colors[1] },
            { id: 'l', value: 0.7, color: colors[1] },
            { id: 'k', value: 2.6, color: colors[1] },
            { id: 'h', value: 0.4, color: colors[0] },
            { id: 'w', value: 0.1, color: colors[0] },
            { id: 'x', value: 1, color: colors[1] },
            { id: 'y', value: 0.1, color: colors[0] },
            { id: 'g', value: 0.4, color: colors[1] },
            { id: 'z', value: 0.1, color: colors[1] },
            { id: 'e', value: 1, color: colors[0] },
            { id: 'f', value: 1, color: colors[0] },
            { id: 'n', value: 0.4, color: colors[0] },
            { id: 'o', value: 0.2, color: colors[0] },
            { id: 'p', value: 0.4, color: colors[0] },
            { id: 'i', value: 0.2, color: colors[0] },
            { id: 'm', value: 0.2, color: colors[0] },
        ],
    },
    colorBy: d => d.color,
    padding: 2,
    enableLabel: false,
    leavesOnly: true,
    isInteractive: false,
})

const CirclePackingIcon = () => (
    <Fragment>
        <Icon id="circle-packing-grey">
            <Bubble width={ICON_SIZE} height={ICON_SIZE} {...chartProps(['#b0aeaf', '#767676'])} />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${circlePackingGreyImg})`,
            }}
        />
        <Icon id="circle-packing-red">
            <Bubble width={ICON_SIZE} height={ICON_SIZE} {...chartProps(['#ff8d80', '#e2462f'])} />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${circlePackingRedImg})`,
            }}
        />
    </Fragment>
)

export default CirclePackingIcon
