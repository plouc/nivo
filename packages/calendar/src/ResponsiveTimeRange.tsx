import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { TimeRange } from './TimeRange'
import { TimeRangeSvgProps } from './types'

export const ResponsiveTimeRange = forwardRef(
    (props: ResponsiveProps<TimeRangeSvgProps>, ref: Ref<SVGSVGElement>) => (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <TimeRange width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
