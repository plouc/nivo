import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

export const IcicleTooltip = <Datum,>({ id, formattedValue, color }: ComputedDatum<Datum>) => (
    <BasicTooltip id={id} value={formattedValue} enableChip={true} color={color} />
)
