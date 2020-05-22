/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Waffle } from '@nivo/waffle'
import waffleLightNeutralImg from '../../assets/icons/waffle-light-neutral.png'
import waffleLightColoredImg from '../../assets/icons/waffle-light-colored.png'
import waffleDarkNeutralImg from '../../assets/icons/waffle-dark-neutral.png'
import waffleDarkColoredImg from '../../assets/icons/waffle-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    total: 12,
    columns: 3,
    rows: 4,
    margin: {
        top: 5,
        bottom: 5,
    },
    padding: 2,
    data: [
        { id: 'A', label: 'A', value: 8 },
        { id: 'B', label: 'B', value: 4 },
    ],
    isInteractive: false,
}

const WaffleIconItem = ({ type }) => (
    <Icon id={`waffle-${type}`} type={type}>
        <Waffle {...chartProps} colors={[colors[type].colors[4], colors[type].colors[0]]} />
    </Icon>
)

const WaffleIcon = () => (
    <>
        <WaffleIconItem type="lightNeutral" />
        <Icon id="waffle-grey">
            <Waffle
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#767676', '#cbcbcb']}
            />
        </Icon>
        <IconImg url={waffleLightNeutralImg} />
        <WaffleIconItem type="lightColored" />
        <Icon id="waffle-red">
            <Waffle
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#e2462f', '#ffb8b5']}
            />
        </Icon>
        <IconImg url={waffleLightColoredImg} />
        <WaffleIconItem type="darkNeutral" />
        <IconImg url={waffleDarkNeutralImg} />
        <WaffleIconItem type="darkColored" />
        <IconImg url={waffleDarkColoredImg} />
    </>
)

export default WaffleIcon
