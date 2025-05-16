import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { SwarmPlotCanvasProps } from './types'
import { SwarmPlotCanvas } from './SwarmPlotCanvas'

type ResponsiveSwarmPlotCanvasProps<RawDatum> = ResponsiveProps<
    Partial<Omit<SwarmPlotCanvasProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>> &
        Pick<SwarmPlotCanvasProps<RawDatum>, 'data' | 'groups'>
>

export const ResponsiveSwarmPlotCanvas = forwardRef(
    <RawDatum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveSwarmPlotCanvasProps<RawDatum>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <SwarmPlotCanvas<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum>(
    props: WithChartRef<ResponsiveSwarmPlotCanvasProps<RawDatum>, HTMLCanvasElement>
) => ReactElement
