import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { RadarSvgProps } from './types'
import { Radar } from './Radar'

export const ResponsiveRadar = forwardRef(
    <D extends Record<string, unknown>>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<RadarSvgProps<D>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => <Radar<D> {...props} width={width} height={height} ref={ref} />}
        </ResponsiveWrapper>
    )
) as <D extends Record<string, unknown>>(
    props: WithChartRef<ResponsiveProps<RadarSvgProps<D>>, SVGSVGElement>
) => ReactElement
