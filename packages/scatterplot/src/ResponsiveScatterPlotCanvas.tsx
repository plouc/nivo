import { ResponsiveWrapper } from '@nivo/core'
import { ForwardedRef, forwardRef } from 'react'

import { ScatterPlotCanvas } from './ScatterPlotCanvas'
import { ScatterPlotCanvasProps, ScatterPlotDatum } from './types'

export const ResponsiveScatterPlotCanvas = forwardRef(function ResponsiveScatterPlotCanvas<
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
