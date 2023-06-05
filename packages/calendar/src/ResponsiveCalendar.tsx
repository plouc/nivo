import { Calendar } from './Calendar'
import { CalendarSvgProps } from './types'
import { ResponsiveWrapper } from '@bitbloom/nivo-core'

export const ResponsiveCalendar = (props: Omit<CalendarSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Calendar width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
