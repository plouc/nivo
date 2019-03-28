/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Pie } from '@nivo/pie'
import pieLightNeutralImg from '../../assets/icons/pie-light-neutral.png'
import pieLightColoredImg from '../../assets/icons/pie-light-colored.png'
import pieDarkNeutralImg from '../../assets/icons/pie-dark-neutral.png'
import pieDarkColoredImg from '../../assets/icons/pie-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    data: [
        { id: '0', label: '0', value: 45 },
        { id: '1', label: '1', value: 90 },
        { id: '2', label: '2', value: 225 },
    ],
    margin: {
        top: 3,
        right: 3,
        bottom: 3,
        left: 3,
    },
    innerRadius: 0.6,
    padAngle: 2.5,
    enableRadialLabels: false,
    enableSlicesLabels: false,
    isInteractive: false,
}

const PieIconItem = ({ type }) => (
    <Icon id={`pie-${type}`} type={type}>
        <Pie
            {...chartProps}
            colors={[colors[type].colors[4], colors[type].colors[3], colors[type].colors[2]]}
        />
    </Icon>
)

const PieIcon = () => (
    <>
        <PieIconItem type="lightNeutral" />
        <IconImg url={pieLightNeutralImg} />
        <PieIconItem type="lightColored" />
        <IconImg url={pieLightColoredImg} />
        <PieIconItem type="darkNeutral" />
        <IconImg url={pieDarkNeutralImg} />
        <PieIconItem type="darkColored" />
        <IconImg url={pieDarkColoredImg} />
    </>
)

export default PieIcon
