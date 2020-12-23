import React from 'react'
import { ResponsiveWrapper } from '@nivo/core'
import { CirclePackingCanvasProps } from './types'
import { CirclePackingCanvas } from './CirclePackingCanvas'

type ResponsiveCirclePackingCanvasProps<RawDatum> = Partial<
    Omit<CirclePackingCanvasProps<RawDatum>, 'data' | 'width' | 'height'>
> &
    Pick<CirclePackingCanvasProps<RawDatum>, 'data'>

export const ResponsiveCirclePackingCanvas = <RawDatum,>(
    props: ResponsiveCirclePackingCanvasProps<RawDatum>
) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number; height: number }) => (
            <CirclePackingCanvas<RawDatum> width={width} height={height} {...props} />
        )}
    </ResponsiveWrapper>
)
