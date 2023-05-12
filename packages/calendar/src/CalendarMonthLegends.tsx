import { memo } from 'react'
import { Text } from '@nivo/text'
import { CalendarMonthLegendsProps } from './types'

export const CalendarMonthLegends = memo(({ months, legend, theme }: CalendarMonthLegendsProps) => {
    return (
        <>
            {months.map(month => {
                return (
                    <Text
                        key={`${month.date.toString()}.legend`}
                        transform={`translate(${month.x},${month.y}) rotate(${month.rotation})`}
                        textAnchor="middle"
                        style={theme.labels.text}
                    >
                        {legend(month.year, month.month, month.date)}
                    </Text>
                )
            })}
        </>
    )
})
