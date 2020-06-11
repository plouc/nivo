/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Funnel } from '@nivo/funnel'
import funnelLightNeutralImg from '../../assets/icons/funnel-light-neutral.png'
import funnelLightColoredImg from '../../assets/icons/funnel-light-colored.png'
import funnelDarkNeutralImg from '../../assets/icons/funnel-dark-neutral.png'
import funnelDarkColoredImg from '../../assets/icons/funnel-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        {
            id: 'A',
            value: 100,
        },
        {
            id: 'B',
            value: 70,
        },
        {
            id: 'C',
            value: 30,
        },
    ],
    margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
    },
    isInteractive: false,
}

const FunnelIconItem = ({ type }) => {
    const currentColors = colors[type].colors

    return (
        <Icon id={`funnel-${type}`} type={type}>
            <Funnel
                {...chartProps}
                spacing={0.12}
                shapeContinuity={0.4}
                colors={[currentColors[4], currentColors[2], currentColors[1]]}
            />
        </Icon>
    )
}

const FunnelIcon = () => (
    <>
        <FunnelIconItem type="lightNeutral" />
        <IconImg url={funnelLightNeutralImg} />
        <FunnelIconItem type="lightColored" />
        <IconImg url={funnelLightColoredImg} />
        <FunnelIconItem type="darkNeutral" />
        <IconImg url={funnelDarkNeutralImg} />
        <FunnelIconItem type="darkColored" />
        <IconImg url={funnelDarkColoredImg} />
    </>
)

export default FunnelIcon
