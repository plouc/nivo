import React from 'react'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import Chord from './Chord'

const ResponsiveChord = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Chord width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveChord
