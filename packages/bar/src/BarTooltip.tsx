import { BarTooltipProps } from './types'
import { BasicTooltip } from '@nivo/tooltip'

export const BarTooltip = <RawDatum,>({
    color,
    getTooltipLabel,
    ...data
}: BarTooltipProps<RawDatum>) => {
    return (
        <BasicTooltip
            id={getTooltipLabel(data)}
            value={data.formattedValue}
            enableChip={true}
            color={color}
        />
    )
}
