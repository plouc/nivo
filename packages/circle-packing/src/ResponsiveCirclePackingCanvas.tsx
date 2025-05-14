import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveWrapper, WithChartRef, ResponsiveProps } from '@nivo/core'
import { CirclePackingCanvasProps } from './types'
import { CirclePackingCanvas } from './CirclePackingCanvas'

export const ResponsiveCirclePackingCanvas = forwardRef(
    <Datum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CirclePackingCanvasProps<Datum>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultWidth}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <CirclePackingCanvas<Datum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum>(
    props: WithChartRef<ResponsiveProps<CirclePackingCanvasProps<Datum>>, HTMLCanvasElement>
) => ReactElement
