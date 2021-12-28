import { BasicTooltip } from '@nivo/tooltip'
import { AreaBumpDatum, AreaBumpComputedSerie } from './types'

interface AreaTooltipProps<D extends AreaBumpDatum> {
    serie: AreaBumpComputedSerie<D>
}

export const AreaTooltip = <D extends AreaBumpDatum>({ serie }: AreaTooltipProps<D>) => {
    return <BasicTooltip id={serie.id} enableChip={true} color={serie.color} />
}
