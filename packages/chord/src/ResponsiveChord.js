import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Chord from './Chord'

const ResponsiveChord = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Chord width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveChord
