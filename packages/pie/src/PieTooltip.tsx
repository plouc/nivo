import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

export const PieTooltip = <RawDatum,>({ datum }: { datum: ComputedDatum<RawDatum> }) => (
    <BasicTooltip
        id={datum.id}
        value={datum.formattedValue}
        enableChip={true}
        color={datum.color}
    />
)

export default PieTooltip
