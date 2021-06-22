import { ResponsiveWrapper } from '@nivo/core'
import { CalendarCanvas } from './CalendarCanvas'
import { CalendarCanvasProps } from './types'

export const ResponsiveCalendarCanvas = (props: Omit<CalendarCanvasProps, 'width' | 'height'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <CalendarCanvas width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)
