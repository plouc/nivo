import React from 'react'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import ChordCanvas from './ChordCanvas'

const ResponsiveChordCanvas = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <ChordCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveChordCanvas
