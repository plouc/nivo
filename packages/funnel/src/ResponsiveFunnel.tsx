import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveProps, ResponsiveWrapper, WithChartRef } from '@nivo/core'
import { FunnelDatum, FunnelSvgProps } from './types'
import { Funnel } from './Funnel'

export const ResponsiveFunnel = forwardRef(
    <D extends FunnelDatum = FunnelDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<FunnelSvgProps<D>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Funnel<D> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends FunnelDatum = FunnelDatum>(
    props: WithChartRef<ResponsiveProps<FunnelSvgProps<D>>, SVGSVGElement>
) => ReactElement
