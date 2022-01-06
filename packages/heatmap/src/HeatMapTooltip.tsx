import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { HeatMapDatum, TooltipProps } from './types'

const NonMemoizedHeatMapTooltip = <Datum extends HeatMapDatum>({ cell }: TooltipProps<Datum>) => (
    <BasicTooltip
        id={`${cell.serieId} - ${cell.data.x}`}
        value={cell.formattedValue}
        enableChip={true}
        color={cell.color}
    />
)

export const HeatMapTooltip = memo(NonMemoizedHeatMapTooltip) as typeof NonMemoizedHeatMapTooltip
