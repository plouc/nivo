import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { BarDatum, BarCanvasProps } from './types'
import { BarCanvas } from './BarCanvas'

export const ResponsiveBarCanvas = forwardRef(
    <RawDatum extends BarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<BarCanvasProps<RawDatum>>,
        ref: ForwardedRef<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <BarCanvas width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends BarDatum>(
    props: WithChartRef<ResponsiveProps<BarCanvasProps<RawDatum>>, HTMLCanvasElement>
) => ReactElement
