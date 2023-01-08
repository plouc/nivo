import { memo } from 'react'
import { CalendarWeekdayLegendsProps } from './types'

export const CalendarWeekdayLegends = memo(({ weekdays, legend, theme }: CalendarWeekdayLegendsProps) => {
    return (
        <>
            {weekdays.map((weekday, weekdayIndex) => {
                return (
                    <text
                        key={weekday.value}
                        transform={`translate(${weekday.x},${weekday.y}) rotate(${weekday.rotation})`}
                        textAnchor="left"
                        style={theme.labels.text}
                    >
                        {legend(weekdayIndex)}
                    </text>
                )
            })}
        </>
    )
})
