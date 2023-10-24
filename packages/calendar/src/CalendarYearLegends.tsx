import { memo } from 'react'
import { Text } from '@nivo/text'
import { CalendarYearLegendsProps } from './types'

export const CalendarYearLegends = memo(({ years, legend, theme }: CalendarYearLegendsProps) => {
    return (
        <>
            {years.map(year => {
                return (
                    <Text
                        key={year.year}
                        transform={`translate(${year.x},${year.y}) rotate(${year.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(year.year)}
                    </Text>
                )
            })}
        </>
    )
})
