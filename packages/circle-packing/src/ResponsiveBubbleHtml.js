import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import BubbleHtml from './BubbleHtml'

const ResponsiveBubbleHtml = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <BubbleHtml width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveBubbleHtml
