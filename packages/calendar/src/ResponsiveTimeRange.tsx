import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { TimeRange } from './TimeRange'
import { TimeRangeSvgProps } from './types'

export const ResponsiveTimeRange = forwardRef(
    (
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<TimeRangeSvgProps>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <TimeRange width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
