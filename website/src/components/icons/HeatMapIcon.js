/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { HeatMap } from '@nivo/heatmap'
import heatmapLightNeutralImg from '../../assets/icons/heatmap-light-neutral.png'
import heatmapLightColoredImg from '../../assets/icons/heatmap-light-colored.png'
import heatmapDarkNeutralImg from '../../assets/icons/heatmap-dark-neutral.png'
import heatmapDarkColoredImg from '../../assets/icons/heatmap-dark-colored.png'
import { ICON_SIZE, Icon, colors, IconImg } from './styled'

const chartProps = {
    width: ICON_SIZE,
    height: ICON_SIZE,
    indexBy: 'id',
    keys: ['A', 'B', 'C'],
    data: [
        { id: '0', A: 4, B: 3, C: 2 },
        { id: '1', A: 3, B: 2, C: 1 },
        { id: '2', A: 2, B: 1, C: 0 },
    ],
    margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8,
    },
    axisTop: null,
    axisLeft: null,
    enableLabels: false,
    padding: 4,
    cellOpacity: 1,
    isInteractive: false,
}

const HeatMapIconItem = ({ type }) => (
    <Icon id={`heatmap-${type}`} type={type}>
        <HeatMap {...chartProps} colors={colors[type].colors} />
    </Icon>
)

const HeatMapIcon = () => (
    <>
        <HeatMapIconItem type="lightNeutral" />
        <IconImg url={heatmapLightNeutralImg} />
        <HeatMapIconItem type="lightColored" />
        <IconImg url={heatmapLightColoredImg} />
        <HeatMapIconItem type="darkNeutral" />
        <IconImg url={heatmapDarkNeutralImg} />
        <HeatMapIconItem type="darkColored" />
        <IconImg url={heatmapDarkColoredImg} />
    </>
)

export default HeatMapIcon
