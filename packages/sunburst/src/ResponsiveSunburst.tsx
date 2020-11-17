import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { Sunburst } from './Sunburst'
import { SunburstSvgProps } from './types'

export const ResponsiveSunburst = <Datum extends Record<string, unknown>>(
    props: Omit<SunburstSvgProps<Datum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: Required<Pick<SunburstSvgProps<Datum>, 'width' | 'height'>>) => (
            <Sunburst width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
