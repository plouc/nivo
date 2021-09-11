import { BasicTooltip } from '@nivo/tooltip'
import { RadialBarDatum, RadialBarTooltipProps } from './types'

export const RadialBarTooltip = <D extends RadialBarDatum>({ bar }: RadialBarTooltipProps<D>) => {
    return (
        <BasicTooltip
            enableChip
            id={
                <span>
                    {bar.category} - {bar.groupId}
                </span>
            }
            value={bar.formattedValue}
            color={bar.color}
        />
    )
}
