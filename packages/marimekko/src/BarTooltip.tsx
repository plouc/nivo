import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { BarDatum } from './types'

export const BarTooltip = <RawDatum,>({ bar }: { bar: BarDatum<RawDatum> }) => (
    <BasicTooltip
        id={`${bar.datum.id} - ${bar.id}`}
        value={bar.formattedValue}
        enableChip={true}
        color={bar.color}
    />
)
