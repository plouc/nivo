import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { ScatterPlot } from './ScatterPlot'
import { ScatterPlotDatum, ScatterPlotSvgProps } from './types'

export const ResponsiveScatterPlot = forwardRef(
    <RawDatum extends ScatterPlotDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ScatterPlotSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <ScatterPlot<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends ScatterPlotDatum>(
    props: WithChartRef<ResponsiveProps<ScatterPlotSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
