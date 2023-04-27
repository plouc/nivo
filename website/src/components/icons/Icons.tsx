import React, { Fragment } from 'react'
import { Container } from './styled'
import { AreaBumpIcon } from './AreaBumpIcon'
import { BarIcon } from './BarIcon'
import { BoxPlotIcon } from './BoxPlotIcon'
import { BulletIcon } from './BulletIcon'
import { BumpIcon } from './BumpIcon'
import { CalendarIcon } from './CalendarIcon'
import { ChordIcon } from './ChordIcon'
import { ChoroplethIcon } from './ChoroplethIcon'
import { CirclePackingIcon } from './CirclePackingIcon'
import { CodeIcon } from './CodeIcon'
import { DataIcon } from './DataIcon'
import { FunnelIcon } from './FunnelIcon'
import { GeoMapIcon } from './GeoMapIcon'
import { HeatMapIcon } from './HeatMapIcon'
import { LineIcon } from './LineIcon'
import { MarimekkoIcon } from './MarimekkoIcon'
import { NetworkIcon } from './NetworkIcon'
import { ParallelCoordinatesIcon } from './ParallelCoordinatesIcon'
import { PieIcon } from './PieIcon'
import { RadarIcon } from './RadarIcon'
import { RadialBarIcon } from './RadialBarIcon'
import { SankeyIcon } from './SankeyIcon'
import { ScatterPlotIcon } from './ScatterPlotIcon'
import { StreamIcon } from './StreamIcon'
import { SunburstIcon } from './SunburstIcon'
import { SwarmPlotIcon } from './SwarmPlotIcon'
import { TimeRangeIcon } from './TimeRangeIcon'
import { TreeMapIcon } from './TreeMapIcon'
import { VoronoiIcon } from './VoronoiIcon'
import { WaffleIcon } from './WaffleIcon'
import { colors, Icon, Colors } from './styled'
import { IconType } from './types'

const ColorsDemo = ({ type }: { type: IconType }) => {
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

export const Icons = () => (
    <Container>
        <ColorsDemo type="lightNeutral" />
        <ColorsDemo type="lightColored" />
        <ColorsDemo type="darkNeutral" />
        <ColorsDemo type="darkColored" />
        <BoxPlotIcon />
        <AreaBumpIcon />
        <BarIcon />
        <BulletIcon />
        <BumpIcon />
        <CalendarIcon />
        <ChordIcon />
        <ChoroplethIcon />
        <CirclePackingIcon />
        <FunnelIcon />
        <GeoMapIcon />
        <HeatMapIcon />
        <LineIcon />
        <MarimekkoIcon />
        <NetworkIcon />
        <ParallelCoordinatesIcon />
        <PieIcon />
        <RadarIcon />
        <RadialBarIcon />
        <CodeIcon />
        <DataIcon />
        <SankeyIcon />
        <ScatterPlotIcon />
        <StreamIcon />
        <SunburstIcon />
        <SwarmPlotIcon />
        <TimeRangeIcon />
        <TreeMapIcon />
        <VoronoiIcon />
        <WaffleIcon />
    </Container>
)
