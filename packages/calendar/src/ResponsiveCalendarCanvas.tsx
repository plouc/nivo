import { forwardRef, Ref } from 'react'
import { ResponsiveWrapper, ResponsiveProps } from '@nivo/core'
import { CalendarCanvas } from './CalendarCanvas'
import { CalendarCanvasProps } from './types'

export const ResponsiveCalendarCanvas = forwardRef(
    (
        {
            defaultWidth,
            defaultHeight,
            onResize,
            debounceResize,
            ...props
        }: ResponsiveProps<CalendarCanvasProps>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <ResponsiveWrapper
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            onResize={onResize}
            debounceResize={debounceResize}
        >
            {({ width, height }) => (
                <CalendarCanvas width={width} height={height} {...props} ref={ref} />
            )}
        </ResponsiveWrapper>
    )
)
