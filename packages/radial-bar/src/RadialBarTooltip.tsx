import { BasicTooltip } from '@nivo/tooltip'
import { RadialBarTooltipProps } from './types'

export const RadialBarTooltip = ({ bar }: RadialBarTooltipProps) => {
    return (
        <BasicTooltip
            enableChip
            id={
                <span>
                    {bar.category} - {bar.groupId}
                </span>
            }
            value={bar.value}
            color={bar.color}
        />
    )
}
