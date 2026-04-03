import { BasicTooltip } from '@nivo/tooltip'
import { CalendarTooltipProps } from './types'
import { memo } from 'react'

export const CalendarTooltip = memo(({ value, day, color }: CalendarTooltipProps) => {
    if (value === undefined) return null
    return <BasicTooltip id={day} value={value} color={color} enableChip={true} />
})
