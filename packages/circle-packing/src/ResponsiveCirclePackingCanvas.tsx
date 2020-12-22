import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePackingCanvasProps } from './types'
import { CirclePackingCanvas } from './CirclePackingCanvas'

export const ResponsiveCirclePackingCanvas = <RawDatum,>(
    props: Partial<Omit<CirclePackingCanvasProps<RawDatum>, 'data' | 'width' | 'height'>> &
        Pick<CirclePackingCanvasProps<RawDatum>, 'data'>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePackingCanvas<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
