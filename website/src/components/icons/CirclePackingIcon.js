/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Bubble } from '@nivo/circle-packing'
import circlePackingLightNeutralImg from '../../assets/icons/circle-packing-light-neutral.png'
import circlePackingLightColoredImg from '../../assets/icons/circle-packing-light-colored.png'
import circlePackingDarkNeutralImg from '../../assets/icons/circle-packing-dark-neutral.png'
import circlePackingDarkColoredImg from '../../assets/icons/circle-packing-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = colors => ({
    width: ICON_SIZE,
    height: ICON_SIZE,
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
    colors: { datum: 'color' },
    padding: 2,
    enableLabel: false,
    leavesOnly: true,
    isInteractive: false,
})

const CirclePackingIconItem = ({ type }) => (
    <Icon id={`circle-packing-${type}`} type={type}>
        <Bubble {...chartProps([colors[type].colors[1], colors[type].colors[4]])} />
    </Icon>
)

const CirclePackingIcon = () => (
    <>
        <CirclePackingIconItem type="lightNeutral" />
        <IconImg url={circlePackingLightNeutralImg} />
        <CirclePackingIconItem type="lightColored" />
        <IconImg url={circlePackingLightColoredImg} />
        <CirclePackingIconItem type="darkNeutral" />
        <IconImg url={circlePackingDarkNeutralImg} />
        <CirclePackingIconItem type="darkColored" />
        <IconImg url={circlePackingDarkColoredImg} />
    </>
)

export default CirclePackingIcon
