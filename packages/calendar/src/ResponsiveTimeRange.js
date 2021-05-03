import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import TimeRange from './TimeRange'

const ResponsiveTimeRange = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <TimeRange width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveTimeRange
