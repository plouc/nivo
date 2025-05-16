import { ResponsiveWrapper, WithChartRef, ResponsiveProps } from '@nivo/core'
import { forwardRef, Ref, ReactElement } from 'react'
import { ScatterPlotCanvas } from './ScatterPlotCanvas'
import { ScatterPlotCanvasProps, ScatterPlotDatum } from './types'

export const ResponsiveScatterPlotCanvas = forwardRef(
    <RawDatum extends ScatterPlotDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ScatterPlotCanvasProps<RawDatum>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <ScatterPlotCanvas {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends ScatterPlotDatum>(
    props: WithChartRef<ResponsiveProps<ScatterPlotCanvasProps<RawDatum>>, HTMLCanvasElement>
) => ReactElement
