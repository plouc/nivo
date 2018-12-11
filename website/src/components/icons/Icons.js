/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Container } from './styled'
import BarIcon from './BarIcon'
import BulletIcon from './BulletIcon'
import CirclePackingIcon from './CirclePackingIcon'
import HeatMapIcon from './HeatMapIcon'
import LineIcon from './LineIcon'
import PieIcon from './PieIcon'
import RadarIcon from './RadarIcon'
import ScatterPlotIcon from './ScatterPlotIcon'
import StreamIcon from './StreamIcon'
import WaffleIcon from './WaffleIcon'
import ParallelCoordinatesIcon from './ParallelCoordinatesIcon'

const Icons = () => (
    <Container>
        <ParallelCoordinatesIcon />
        <ScatterPlotIcon />
        <StreamIcon />
        <CirclePackingIcon />
        <BulletIcon />
        <LineIcon />
        <RadarIcon />
        <PieIcon />
        <BarIcon />
        <HeatMapIcon />
        <WaffleIcon />
    </Container>
)

export default Icons
