import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { Calendar } from './Calendar'
import { CalendarSvgProps } from './types'

export const ResponsiveCalendar = forwardRef(
    (props: ResponsiveProps<CalendarSvgProps>, ref: Ref<SVGSVGElement>) => (
        <ResponsiveWrapper>
            {({ width, height }) => <Calendar width={width} height={height} {...props} ref={ref} />}
        </ResponsiveWrapper>
    )
)
