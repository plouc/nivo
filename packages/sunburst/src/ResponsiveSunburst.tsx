import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import Sunburst from './Sunburst'
import { SunburstSvgProps } from './types'

export const ResponsiveSunburst = (props: Omit<SunburstSvgProps, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }: Required<Pick<SunburstSvgProps, 'width' | 'height'>>) => (
            <Sunburst width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
