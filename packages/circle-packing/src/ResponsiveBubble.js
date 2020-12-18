import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Bubble from './Bubble'

const ResponsiveBubble = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Bubble width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveBubble
