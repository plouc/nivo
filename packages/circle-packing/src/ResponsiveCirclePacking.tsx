import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePacking } from './CirclePacking'
import { CirclePackSvgProps } from './types'

type ResponsiveCirclePackingProps<RawDatum> = Partial<
    Omit<CirclePackingSvgProps<RawDatum>, 'data' | 'width' | 'height'>
> &
    Pick<CirclePackingSvgProps<RawDatum>, 'data'>

export const ResponsiveCirclePacking = <RawDatum,>(
    props: ResponsiveCirclePackingProps<RawDatum>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePacking<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
