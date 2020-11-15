import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { DimensionDatum } from './types'

export const BarTooltip = <RawDatum,>({ datum }: { datum: DimensionDatum<RawDatum> }) => (
    <BasicTooltip
        id={`${datum.datum.id} - ${datum.id}`}
        value={datum.value}
        enableChip={true}
        color={datum.color}
    />
)
