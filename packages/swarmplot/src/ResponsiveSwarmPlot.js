import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import SwarmPlot from './SwarmPlot'

const ResponsiveSwarmPlot = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <SwarmPlot width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveSwarmPlot
