import { memo } from 'react'
import { BasicTooltip } from '@nivo/core'
import { HeatMapDatum, TooltipProps } from './types'

const NonMemoizedHeatMapTooltip = <Datum extends HeatMapDatum>({ cell }: TooltipProps<Datum>) => {
    if (cell.formattedValue === null) return null

    return (
        <BasicTooltip
            id={`${cell.serieId} - ${cell.data.x}`}
            value={cell.formattedValue}
            enableChip={true}
            color={cell.color}
        />
    )
}

export const HeatMapTooltip = memo(NonMemoizedHeatMapTooltip) as typeof NonMemoizedHeatMapTooltip
