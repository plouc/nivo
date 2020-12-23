import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import Voronoi from './Voronoi'

const ResponsiveVoronoi = props => (
    <ResponsiveWrapper>
        {({ width, height }) => <Voronoi width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveVoronoi
