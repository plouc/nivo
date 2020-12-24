import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import SwarmPlotCanvas from './SwarmPlotCanvas'

const ResponsiveSwarmPlotCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <SwarmPlotCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveSwarmPlotCanvas
