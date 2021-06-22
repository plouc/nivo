import { CalendarMonthLegendsProps } from './types'
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
