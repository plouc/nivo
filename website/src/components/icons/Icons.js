/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Fragment } from 'react'
import { Container } from './styled'
import AreaBumpIcon from './AreaBumpIcon'
import BarIcon from './BarIcon'
import BulletIcon from './BulletIcon'
import BumpIcon from './BumpIcon'
import CalendarIcon from './CalendarIcon'
import ChoroplethIcon from './ChoroplethIcon'
import ChordIcon from './ChordIcon'
import CirclePackingIcon from './CirclePackingIcon'
import CodeIcon from './CodeIcon'
import DataIcon from './DataIcon'
import FunnelIcon from './FunnelIcon'
import GeoMapIcon from './GeoMapIcon'
import HeatMapIcon from './HeatMapIcon'
import LineIcon from './LineIcon'
import NetworkIcon from './NetworkIcon'
import PieIcon from './PieIcon'
import RadarIcon from './RadarIcon'
import SankeyIcon from './SankeyIcon'
import ScatterPlotIcon from './ScatterPlotIcon'
import StreamIcon from './StreamIcon'
import SunburstIcon from './SunburstIcon'
import SwarmPlotIcon from './SwarmPlotIcon'
import TreeMapIcon from './TreeMapIcon'
import WaffleIcon from './WaffleIcon'
import ParallelCoordinatesIcon from './ParallelCoordinatesIcon'
import VoronoiIcon from './VoronoiIcon'
import { colors, Icon, Colors } from './styled'

const ColorsDemo = ({ type }) => {
    return (
        <Icon type={type}>
            <Colors>
                {colors[type].colors.map(color => {
                    return (
                        <Fragment key={color}>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: 16,
                                    height: 16,
                                    marginRight: 12,
                                    background: color,
                                }}
                            />
                            <span>{color}</span>
                        </Fragment>
                    )
                })}
            </Colors>
        </Icon>
    )
}

const Icons = () => (
    <Container>
        <ColorsDemo type="lightNeutral" />
        <ColorsDemo type="lightColored" />
        <ColorsDemo type="darkNeutral" />
        <ColorsDemo type="darkColored" />
        <AreaBumpIcon />
        <BumpIcon />
        <FunnelIcon />
        <NetworkIcon />
        <BarIcon />
        <CirclePackingIcon />
        <BulletIcon />
        <CalendarIcon />
        <ChoroplethIcon />
        <ChordIcon />
        <CodeIcon />
        <DataIcon />
        <GeoMapIcon />
        <HeatMapIcon />
        <LineIcon />
        <ParallelCoordinatesIcon />
        <PieIcon />
        <RadarIcon />
        <SankeyIcon />
        <ScatterPlotIcon />
        <StreamIcon />
        <SunburstIcon />
        <SwarmPlotIcon />
        <TreeMapIcon />
        <VoronoiIcon />
        <WaffleIcon />
    </Container>
)

export default Icons
