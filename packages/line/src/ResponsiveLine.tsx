import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Line } from './Line'
import { LineSvgProps, LineSeries } from './types'

export const ResponsiveLine = forwardRef(
    <Series extends LineSeries>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<LineSvgProps<Series>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <Line<Series> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Series extends LineSeries>(
    props: WithChartRef<ResponsiveProps<LineSvgProps<Series>>, SVGSVGElement>
) => ReactElement
