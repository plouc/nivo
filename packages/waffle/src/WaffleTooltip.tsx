import { BasicTooltip } from '@bitbloom/nivo-tooltip'
import { Datum, TooltipProps } from './types'

export const WaffleTooltip = <RawDatum extends Datum>({ data }: TooltipProps<RawDatum>) => (
    <BasicTooltip
        id={data.label}
        value={data.formattedValue}
        enableChip={true}
        color={data.color}
    />
)
