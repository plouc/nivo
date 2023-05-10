import { TableTooltip } from '@nivo/tooltip'
import { BaseDatum, TooltipProps, DatumGroupKeys } from './types'

export const ParallelCoordinatesLineTooltip = <
    Datum extends BaseDatum,
    GroupBy extends DatumGroupKeys<Datum> | undefined = undefined
>({
    datum,
    variables,
}: TooltipProps<Datum, GroupBy>) => {
    return (
        <TableTooltip
            rows={variables.map(variable => [
                variable.label || variable.id,
                <strong>{datum.data[variable.value] as number}</strong>, // eslint-disable-line react/jsx-key
            ])}
        />
    )
}
