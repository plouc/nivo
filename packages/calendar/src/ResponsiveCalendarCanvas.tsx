import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { CalendarCanvas } from './CalendarCanvas'
import { CalendarCanvasProps } from './types'

export const ResponsiveCalendarCanvas = forwardRef(
    (props: ResponsiveProps<CalendarCanvasProps>, ref: Ref<HTMLCanvasElement>) => (
        <ResponsiveWrapper>
            {({ width, height }) => (
                <CalendarCanvas width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
