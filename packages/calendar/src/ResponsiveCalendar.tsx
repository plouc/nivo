import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { Calendar } from './Calendar'
import { CalendarSvgProps } from './types'

export const ResponsiveCalendar = forwardRef(
    (
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CalendarSvgProps>,
        ref: Ref<SVGSVGElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => <Calendar width={width} height={height} {...props} ref={ref} />}
        </ResponsiveWrapper>
    )
)
