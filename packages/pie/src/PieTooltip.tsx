import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { ComputedDatum } from './types'

// prettier-ignore
export const PieTooltip = <R, >({ datum }: { datum: ComputedDatum<R> }) => (
    <BasicTooltip
        id={datum.id}
        value={datum.formattedValue}
        enableChip={true}
        color={datum.color}
    />
)

export default PieTooltip
