import { BasicTooltip } from '@nivo/tooltip'
import { BarDatum, BarIndex, BarTooltipProps } from './types'

export const BarTooltip = <D extends BarDatum = BarDatum, I extends BarIndex = string>({
    color,
    label,
    ...data
}: BarTooltipProps<D, I>) => {
    return <BasicTooltip id={label} value={data.formattedValue} enableChip={true} color={color} />
}
