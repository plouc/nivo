import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { TreeCanvasProps, DefaultDatum } from './types'
import { TreeCanvas } from './TreeCanvas'

export const ResponsiveTreeCanvas = forwardRef(
    <Datum = DefaultDatum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TreeCanvasProps<Datum>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <TreeCanvas<Datum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum = DefaultDatum>(
    props: WithChartRef<ResponsiveProps<TreeCanvasProps<Datum>>, HTMLCanvasElement>
) => ReactElement
