import React from 'react'
import { Calendar } from './Calendar'
import { CalendarSvgProps } from './types'
import { ResponsiveWrapper } from '@nivo/core'

const ResponsiveCalendar = (props: Omit<CalendarSvgProps, 'height' | 'width'>) => (
    <ResponsiveWrapper>
        {({ width, height }) => <Calendar width={width} height={height} {...props} />}
    </ResponsiveWrapper>
)

export default ResponsiveCalendar
