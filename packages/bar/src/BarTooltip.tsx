import { BarTooltipProps } from './types'
import { BasicTooltip } from '@nivo/tooltip'

export const BarTooltip = <RawDatum,>({
    color,
    getTooltipLabel,
    tooltipFormat,
    ...data
}: BarTooltipProps<RawDatum>) => {
    return (
        <BasicTooltip
            id={getTooltipLabel(data)}
            value={data.value}
            enableChip={true}
            color={color}
            format={tooltipFormat}
        />
    )
}
