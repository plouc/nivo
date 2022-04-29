import { CalendarMonthLegendsProps, CalendarWeekdayLegendsProps } from './types'
import { memo } from 'react'

export const CalendarMonthLegends = memo(({ months, legend, theme }: CalendarMonthLegendsProps) => {
    return (
        <>
            {months.map(month => {
                return (
                    <text
                        key={`${month.date.toString()}.legend`}
                        transform={`translate(${month.x},${month.y}) rotate(${month.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(month.year, month.month, month.date)}
                    </text>
                )
            })}
        </>
    )
})

export const CalendarWeekdayLegends = memo(
    ({ weekdays, legend, theme }: CalendarWeekdayLegendsProps) => {
        return (
            <>
                {weekdays.map((weekday, i) => {
                    return (
                        <text
                            key={`${weekday.day}.${i}.legend`}
                            transform={`translate(${weekday.x},${weekday.y}) rotate(${weekday.rotation})`}
                            textAnchor="left"
                            alignmentBaseline={'central'}
                            style={theme.labels.text}
                        >
                            {legend(weekday.day)}
                        </text>
                    )
                })}
            </>
        )
    }
)
