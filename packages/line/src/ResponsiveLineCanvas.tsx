import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { LineCanvasProps, LineSeries } from './types'
import { LineCanvas } from './LineCanvas'

export const ResponsiveLineCanvas = forwardRef(
    <Series extends LineSeries>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<LineCanvasProps<Series>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultWidth}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <LineCanvas<Series> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Series extends LineSeries>(
    props: WithChartRef<ResponsiveProps<LineCanvasProps<Series>>, HTMLCanvasElement>
) => ReactElement
