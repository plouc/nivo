/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Stream } from '@nivo/stream'
import streamLightNeutralImg from '../../assets/icons/stream-light-neutral.png'
import streamLightColoredImg from '../../assets/icons/stream-light-colored.png'
import streamDarkNeutralImg from '../../assets/icons/stream-dark-neutral.png'
import streamDarkColoredImg from '../../assets/icons/stream-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
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
    animate: false,
}

const StreamIconItem = ({ type }) => (
    <Icon id={`stream-${type}`} type={type}>
        <Stream
            {...chartProps}
            colors={[colors[type].colors[3], colors[type].colors[1], colors[type].colors[4]]}
        />
    </Icon>
)

const StreamIcon = () => (
    <>
        <StreamIconItem type="lightNeutral" />
        <IconImg url={streamLightNeutralImg} />
        <StreamIconItem type="lightColored" />
        <IconImg url={streamLightColoredImg} />
        <StreamIconItem type="darkNeutral" />
        <IconImg url={streamDarkNeutralImg} />
        <StreamIconItem type="darkColored" />
        <IconImg url={streamDarkColoredImg} />
    </>
)

export default StreamIcon
