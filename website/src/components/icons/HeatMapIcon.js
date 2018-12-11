/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { HeatMap } from '@nivo/heatmap'
import heatmapGreyImg from '../../assets/icons/heatmap-grey.png'
import heatmapRedImg from '../../assets/icons/heatmap-red.png'
import { ICON_SIZE, Icon } from './styled'

const chartProps = {
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

const HeatMapIcon = () => (
    <Fragment>
        <Icon id="heatmap-grey">
            <HeatMap
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#b0aeaf', '#b0aeaf', '#9a9a9a', '#838383', '#5c5c5c']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${heatmapGreyImg})`,
            }}
        />
        <Icon id="heatmap-red">
            <HeatMap
                width={ICON_SIZE}
                height={ICON_SIZE}
                {...chartProps}
                colors={['#ff8d80', '#ff8d80', '#ff765f', '#ff5d45', '#e54127']}
            />
        </Icon>
        <Icon
            style={{
                backgroundImage: `url(${heatmapRedImg})`,
            }}
        />
    </Fragment>
)

export default HeatMapIcon
