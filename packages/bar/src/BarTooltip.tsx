import { BasicTooltip } from '@nivo/tooltip'
import { BarDatum, BarTooltipProps } from './types'

export const BarTooltip = <D extends BarDatum>({ color, label, ...data }: BarTooltipProps<D>) => {
    return <BasicTooltip id={label} value={data.formattedValue} enableChip={true} color={color} />
}
