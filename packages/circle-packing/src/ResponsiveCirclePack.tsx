import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePack } from './CirclePack'
import { CirclePackSvgProps } from './types'

export const ResponsiveCirclePack = <RawDatum,>(
    props: Omit<CirclePackSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePack<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
