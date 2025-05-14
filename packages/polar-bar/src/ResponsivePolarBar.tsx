import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { PolarBar } from './PolarBar'
import { PolarBarSvgProps, PolarBarDatum } from './types'

export const ResponsivePolarBar = forwardRef(
    <RawDatum extends PolarBarDatum>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<PolarBarSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <PolarBar<RawDatum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends PolarBarDatum>(
    props: WithChartRef<ResponsiveProps<PolarBarSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
