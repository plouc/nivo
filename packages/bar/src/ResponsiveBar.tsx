import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Bar } from './Bar'
import { BarDatum, BarSvgProps } from './types'

export const ResponsiveBar = forwardRef(
    <RawDatum extends BarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<BarSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <Bar<RawDatum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends BarDatum>(
    props: WithChartRef<ResponsiveProps<BarSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
