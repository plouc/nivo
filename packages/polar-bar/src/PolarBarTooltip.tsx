import { BasicTooltip } from '@nivo/tooltip'
import { PolarBarTooltipProps } from './types'

export const PolarBarTooltip = ({ arc }: PolarBarTooltipProps) => {
    return (
        <BasicTooltip
            enableChip
            id={
                <span>
                    {arc.index} - {arc.key}
                </span>
            }
            value={arc.formattedValue}
            color={arc.color}
        />
    )
}
