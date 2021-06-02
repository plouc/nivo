import { CalendarMonthPathProps } from './types'
import React, { memo } from 'react'

export const CalendarMonthPath = memo(
    ({ path, borderWidth, borderColor }: CalendarMonthPathProps) => {
        return (
            <path
                d={path}
                style={{
                    fill: 'none',
                    strokeWidth: borderWidth,
                    stroke: borderColor,
                    pointerEvents: 'none',
                }}
            />
        )
    }
)
