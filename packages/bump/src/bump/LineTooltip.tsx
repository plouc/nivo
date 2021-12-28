import { BasicTooltip } from '@nivo/tooltip'
import { BumpComputedSerie, BumpDatum } from './types'

interface LineTooltipProps<D extends BumpDatum> {
    serie: BumpComputedSerie<D>
}

export const LineTooltip = <D extends BumpDatum>({ serie }: LineTooltipProps<D>) => (
    <BasicTooltip
        data-testid={`tooltip.${serie.id}`}
        id={serie.id}
        enableChip={true}
        color={serie.color}
    />
)
