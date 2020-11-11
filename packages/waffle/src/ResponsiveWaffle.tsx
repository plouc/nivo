import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import { SvgProps, Datum, DefaultRawDatum } from './types'
import Waffle from './Waffle'

export const ResponsiveWaffle = <RawDatum extends Datum = DefaultRawDatum>(
    props: Omit<SvgProps<RawDatum>, 'width' | 'height'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <Waffle<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
