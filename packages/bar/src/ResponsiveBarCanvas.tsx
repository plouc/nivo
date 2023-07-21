import { BarDatum, BarCanvasProps } from './types'
import { BarCanvas } from './BarCanvas'
import { ForwardedRef, forwardRef } from 'react'
import { ResponsiveWrapper } from '@nivo/core'

export type ResponsiveBarCanvasProps<RawDatum extends BarDatum> = Omit<
    BarCanvasProps<RawDatum>,
    'height' | 'width'
>

export const ResponsiveBarCanvas = forwardRef(function ResponsiveBarCanvas<
    RawDatum extends BarDatum
>(props: ResponsiveBarCanvasProps<RawDatum>, ref: ForwardedRef<HTMLCanvasElement>) {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <BarCanvas
                    width={width}
                    height={height}
                    {...(props as Omit<BarCanvasProps<BarDatum>, 'height' | 'width'>)}
                    ref={ref}
                />
            )}
        </ResponsiveWrapper>
    )
})
