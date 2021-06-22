import { ResponsiveWrapper } from '@nivo/core'
import { TimeRange } from './TimeRange'
import { TimeRangeSvgProps } from './types'

export const ResponsiveTimeRange = (props: Omit<TimeRangeSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <TimeRange width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
