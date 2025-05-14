import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { RadialBarDatum, RadialBarSvgProps } from './types'
import { RadialBar } from './RadialBar'

export const ResponsiveRadialBar = forwardRef(
    <D extends RadialBarDatum = RadialBarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<RadialBarSvgProps<D>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <RadialBar<D> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <D extends RadialBarDatum = RadialBarDatum>(
    props: WithChartRef<ResponsiveProps<RadialBarSvgProps<D>>, SVGSVGElement>
) => ReactElement
