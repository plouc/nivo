import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Sunburst } from './Sunburst'
import { SvgProps } from './types'

export const ResponsiveSunburst = <RawDatum,>(
    props: Omit<SvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: Required<Pick<SvgProps<RawDatum>, 'width' | 'height'>>) => (
            <Sunburst width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
