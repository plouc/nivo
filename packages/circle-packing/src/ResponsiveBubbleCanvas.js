import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import BubbleCanvas from './BubbleCanvas'

const ResponsiveBubbleCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <BubbleCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveBubbleCanvas
