import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import PieCanvas from './PieCanvas'
import { PieCanvasProps } from './types'

// prettier-ignore
export const ResponsivePieCanvas = <RawDatum, >(props: Omit<PieCanvasProps<RawDatum>, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number, height: number }) => <PieCanvas<RawDatum> width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
