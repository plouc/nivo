import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePackingSvgProps } from './types'
import { CirclePacking } from './CirclePacking'

export const ResponsiveCirclePacking = <RawDatum,>(
    props: Omit<CirclePackingSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePacking<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
