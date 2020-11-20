import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Sunburst } from './Sunburst'
import { SvgProps } from './types'

export const ResponsiveSunburst = <Datum extends Record<string, unknown>>(
    props: Omit<SvgProps<Datum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: Required<Pick<SvgProps<Datum>, 'width' | 'height'>>) => (
            <Sunburst width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
