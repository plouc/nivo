import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { DataCell, Datum } from './types'

export interface TooltipProps<RawDatum extends Datum> {
    cell: DataCell<RawDatum>
}

export const CellTooltip = <RawDatum extends Datum>({ cell }: TooltipProps<RawDatum>) => (
    <BasicTooltip
        id={cell.data.label}
        value={cell.data.formattedValue}
        enableChip={true}
        color={cell.data.color}
    />
)
