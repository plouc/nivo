import { ResponsiveWrapper } from '@nivo/core'
import { ScatterPlotCanvas } from './ScatterPlotCanvas'
import { ScatterPlotCanvasProps, ScatterPlotDatum } from './types'
import { ForwardedRef, forwardRef } from 'react'

export const ResponsiveScatterPlotCanvas = forwardRef(function ResponsiveBarCanvas<
    RawDatum extends ScatterPlotDatum
>(
    props: Omit<ScatterPlotCanvasProps<RawDatum>, 'width' | 'height'>,
    ref: ForwardedRef<HTMLCanvasElement>
) {
    return (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <ScatterPlotCanvas
                    width={width}
                    height={height}
                    {...(props as Omit<
                        ScatterPlotCanvasProps<ScatterPlotDatum>,
                        'height' | 'width'
                    >)}
                    ref={ref}
                />
            )}
        </ResponsiveWrapper>
    )
})
