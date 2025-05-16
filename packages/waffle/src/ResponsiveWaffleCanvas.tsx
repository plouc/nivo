import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { CanvasProps, Datum } from './types'
import { WaffleCanvas } from './WaffleCanvas'

export const ResponsiveWaffleCanvas = forwardRef(
    <D extends Datum = Datum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CanvasProps<D>>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <WaffleCanvas<D> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends Datum = Datum>(
    props: WithChartRef<ResponsiveProps<CanvasProps<D>>, HTMLCanvasElement>
) => ReactElement
