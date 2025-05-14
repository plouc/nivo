import { forwardRef, Ref, ReactElement } from 'react'
import { ResponsiveWrapper, ResponsiveProps, WithChartRef } from '@nivo/core'
import { Pie } from './Pie'
import { PieSvgProps, MayHaveLabel } from './types'

export const ResponsivePie = forwardRef(
    <RawDatum extends MayHaveLabel>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<PieSvgProps<RawDatum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }: { width: number; height: number }) => (
                <Pie<RawDatum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <RawDatum extends MayHaveLabel>(
    props: WithChartRef<ResponsiveProps<PieSvgProps<RawDatum>>, SVGSVGElement>
) => ReactElement
