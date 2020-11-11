import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import WaffleHtml from './WaffleHtml'
import { Datum, DefaultRawDatum, HtmlProps } from './types'

export const ResponsiveWaffleHtml = <RawDatum extends Datum = DefaultRawDatum>(
    props: Omit<HtmlProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <WaffleHtml<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
