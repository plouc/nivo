import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { BaseDatum, ParallelCoordinatesCanvasProps } from '../types'
import { ParallelCoordinatesCanvas } from './ParallelCoordinatesCanvas'

export const ResponsiveParallelCoordinatesCanvas = forwardRef(
    <D extends BaseDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<ParallelCoordinatesCanvasProps<D>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <ParallelCoordinatesCanvas<D> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends BaseDatum>(
    props: WithChartRef<ResponsiveProps<ParallelCoordinatesCanvasProps<D>>, HTMLCanvasElement>
) => ReactElement
