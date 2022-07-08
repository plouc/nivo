import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

export const IciclesTooltip = <RawDatum,>({
    id,
    formattedValue,
    color,
}: ComputedDatum<RawDatum>) => (
    <BasicTooltip id={id} value={formattedValue} enableChip={true} color={color} />
)
