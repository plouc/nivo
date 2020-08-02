/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SwarmPlot } from '@nivo/swarmplot'
import swarmplotLightNeutralImg from '../../assets/icons/swarmplot-light-neutral.png'
import swarmplotLightColoredImg from '../../assets/icons/swarmplot-light-colored.png'
import swarmplotDarkNeutralImg from '../../assets/icons/swarmplot-dark-neutral.png'
import swarmplotDarkColoredImg from '../../assets/icons/swarmplot-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const values = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    8,
    9,
]

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    valueScale: {
        type: 'linear',
        min: 1,
        max: 9,
    },
    forceStrength: 6,
    simulationIterations: 400,
    groups: ['A'],
    data: values.map((v, i) => ({
        id: i,
        group: 'A',
        value: v,
    })),
    margin: {
        top: 6,
        right: 6,
        bottom: 6,
        left: 6,
    },
    layout: 'vertical',
    enableGridX: false,
    enableGridY: false,
    axisTop: null,
    axisRight: null,
    axisBottom: null,
    axisLeft: null,
    size: 10,
    spacing: 1,
    isInteractive: false,
    animate: true,
}

const SwarmPlotIconItem = ({ type }) => (
    <Icon id={`swarmplot-${type}`} type={type}>
        <SwarmPlot {...chartProps} colors={[colors[type].colors[3]]} />
    </Icon>
)

const SwarmPlotIcon = () => (
    <>
        <SwarmPlotIconItem type="lightNeutral" />
        <IconImg url={swarmplotLightNeutralImg} />
        <SwarmPlotIconItem type="lightColored" />
        <IconImg url={swarmplotLightColoredImg} />
        <SwarmPlotIconItem type="darkNeutral" />
        <IconImg url={swarmplotDarkNeutralImg} />
        <SwarmPlotIconItem type="darkColored" />
        <IconImg url={swarmplotDarkColoredImg} />
    </>
)

export default SwarmPlotIcon
