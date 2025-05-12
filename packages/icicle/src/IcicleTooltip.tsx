import { BasicTooltip } from '@nivo/tooltip'
import { IcicleNode } from './types'

export const IcicleTooltip = <Datum,>({ id, formattedValue, color }: IcicleNode<Datum>) => (
    <BasicTooltip id={id} value={formattedValue} enableChip={true} color={color} />
)
