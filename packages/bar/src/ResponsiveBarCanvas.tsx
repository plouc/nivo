import { BarDatum, BarCanvasProps } from './types'
import { BarCanvas } from './BarCanvas'
import { ForwardedRef, forwardRef } from 'react'
import { ResponsiveWrapper } from '@nivo/core'

export const ResponsiveBarCanvas = forwardRef(function ResponsiveBarCanvas<
    RawDatum extends BarDatum
>(props: Omit<BarCanvasProps<RawDatum>, 'height' | 'width'>, ref: ForwardedRef<HTMLCanvasElement>) {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <BarCanvas width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
})
