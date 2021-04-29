import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Pie } from './Pie'
import { PieSvgProps } from './types'

export const ResponsivePie = <RawDatum,>(
    props: Omit<PieSvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <Pie<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
