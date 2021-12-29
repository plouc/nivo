import { BasicTooltip } from '@nivo/tooltip'
import { BumpComputedSerie, BumpDatum, BumpSerieExtraProps } from './types'

interface LineTooltipProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    serie: BumpComputedSerie<Datum, ExtraProps>
}

export const LineTooltip = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    serie,
}: LineTooltipProps<Datum, ExtraProps>) => (
    <BasicTooltip
        data-testid={`tooltip.${serie.data.id}`}
        id={serie.data.id}
        enableChip={true}
        color={serie.color}
    />
)
