import React from 'react'
// @ts-ignore
import { ResponsiveWrapper } from '@nivo/core'
import PieCanvas from './PieCanvas'
import { PieCanvasProps } from './types'

// prettier-ignore
const ResponsivePieCanvas = <R, >(props: Omit<PieCanvasProps<R>, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }: { width: number, height: number }) => <PieCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsivePieCanvas
