import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { StreamDatum, StreamSvgProps } from './types'
import { Stream } from './Stream'

export const ResponsiveStream = forwardRef(
    <RawDatum extends StreamDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<StreamSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Stream<RawDatum> {...props} width={width} height={height} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends StreamDatum>(
    props: WithChartRef<ResponsiveProps<StreamSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
