import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePackingHtmlProps } from './types'
import { CirclePackingHtml } from './CirclePackingHtml'

export const ResponsiveCirclePackingHtml = <RawDatum,>(
    props: Omit<CirclePackingHtmlProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePackingHtml<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
