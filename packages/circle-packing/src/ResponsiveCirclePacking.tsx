import { forwardRef, ReactElement, Ref } from 'react'
import { ResponsiveProps, ResponsiveWrapper, WithChartRef } from '@nivo/core'
import { CirclePackingSvgProps } from './types'
import { CirclePacking } from './CirclePacking'

export const ResponsiveCirclePacking = forwardRef(
    <Datum,>(
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CirclePackingSvgProps<Datum>>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <CirclePacking<Datum> width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
) as <Datum>(
    props: WithChartRef<ResponsiveProps<CirclePackingSvgProps<Datum>>, SVGSVGElement>
) => ReactElement
