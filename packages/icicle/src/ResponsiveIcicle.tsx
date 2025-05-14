import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, DefaultChartContext, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Icicle } from './Icicle'
import { IcicleSvgProps } from './types'

export const ResponsiveIcicle = forwardRef(
    <Datum, Context = DefaultChartContext>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<IcicleSvgProps<Datum, Context>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { height: number; width: number }) => (
                <Icicle<Datum, Context> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum, Context = DefaultChartContext>(
    props: WithChartRef<ResponsiveProps<IcicleSvgProps<Datum, Context>>, SVGSVGElement>
) => ReactElement
