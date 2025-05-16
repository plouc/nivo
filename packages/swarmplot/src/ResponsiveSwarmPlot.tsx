import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { SwarmPlotSvgProps } from './types'
import { SwarmPlot } from './SwarmPlot'

type ResponsiveSwarmPlotProps<RawDatum> = ResponsiveProps<
    Partial<Omit<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups' | 'width' | 'height'>> &
        Pick<SwarmPlotSvgProps<RawDatum>, 'data' | 'groups'>
>

export const ResponsiveSwarmPlot = forwardRef(
    <RawDatum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveSwarmPlotProps<RawDatum>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <SwarmPlot<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum>(
    props: WithChartRef<ResponsiveSwarmPlotProps<RawDatum>, SVGSVGElement>
) => ReactElement
