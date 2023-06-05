import { CalendarYearLegendsProps } from './types'
import { memo } from 'react'

export const CalendarYearLegends = memo(({ years, legend, theme }: CalendarYearLegendsProps) => {
    return (
        <>
            {years.map(year => {
                return (
                    <text
                        key={year.year}
                        transform={`translate(${year.x},${year.y}) rotate(${year.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(year.year)}
                    </text>
                )
            })}
        </>
    )
})
