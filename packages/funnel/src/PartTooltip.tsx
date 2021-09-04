import { BasicTooltip } from '@nivo/tooltip'
import { FunnelDatum, FunnelPartWithHandlers } from './types'

interface PartTooltipProps<D extends FunnelDatum> {
    part: FunnelPartWithHandlers<D>
}

export const PartTooltip = <D extends FunnelDatum>({ part }: PartTooltipProps<D>) => (
    <BasicTooltip
        id={part.data.label}
        value={part.formattedValue}
        color={part.color}
        enableChip={true}
    />
)
