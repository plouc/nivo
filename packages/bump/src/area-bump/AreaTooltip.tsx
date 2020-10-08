import { BasicTooltip } from '@bitbloom/nivo-tooltip'
import { AreaBumpDatum, AreaBumpComputedSerie, AreaBumpSerieExtraProps } from './types'

interface AreaTooltipProps<
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
> {
    serie: AreaBumpComputedSerie<Datum, ExtraProps>
}

export const AreaTooltip = <
    Datum extends AreaBumpDatum,
    ExtraProps extends AreaBumpSerieExtraProps
>({
    serie,
}: AreaTooltipProps<Datum, ExtraProps>) => (
    <BasicTooltip id={serie.id} enableChip={true} color={serie.color} />
)
