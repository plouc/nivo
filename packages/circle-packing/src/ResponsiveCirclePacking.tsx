import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePacking } from './CirclePacking'
import { CirclePackSvgProps } from './types'

export const ResponsiveCirclePacking = <RawDatum,>(
    props: Omit<CirclePackSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePacking<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
