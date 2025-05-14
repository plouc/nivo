import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { PieCanvas } from './PieCanvas'
import { PieCanvasProps, MayHaveLabel } from './types'

export const ResponsivePieCanvas = forwardRef(
    <RawDatum extends MayHaveLabel>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<PieCanvasProps<RawDatum>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <PieCanvas<RawDatum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends MayHaveLabel>(
    props: WithChartRef<ResponsiveProps<PieCanvasProps<RawDatum>>, HTMLCanvasElement>
) => ReactElement
