import { TableTooltip } from '@nivo/tooltip'
import { BaseDatum, VariableSpec, ComputedDatum } from './types'

interface ParallelCoordinatesLineTooltipProps<D extends BaseDatum> {
    data: ComputedDatum<D>
    variables: VariableSpec<D>[]
}

export const ParallelCoordinatesLineTooltip = <D extends BaseDatum>({
    data,
    variables,
}: ParallelCoordinatesLineTooltipProps<D>) => {
    return (
        <TableTooltip
            rows={variables.map(variable => [
                variable.label || variable.id,
                <strong>{data.data[variable.value] as number}</strong>, // eslint-disable-line react/jsx-key
            ])}
        />
    )
}
