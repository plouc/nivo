import React from 'react'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'
import { VoronoiSvgProps } from './types'
import { Voronoi } from './Voronoi'

type ResponsiveVoronoiProps = Partial<Omit<VoronoiSvgProps, 'data' | 'width' | 'height'>> &
    Pick<VoronoiSvgProps, 'data'>

export const ResponsiveVoronoi = (props: ResponsiveVoronoiProps) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <Voronoi width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
