import React from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { DataProps, NormalizedDatum } from './types'

export const SunburstTooltip = <RawDatum,>({
    color,
    id,
    formattedValue,
    percentage,
    valueFormat,
}: NormalizedDatum<RawDatum> & Pick<DataProps<RawDatum>, 'valueFormat'>) => (
    <BasicTooltip
        id={id}
        value={valueFormat ? formattedValue : `${percentage.toFixed(2)}%`}
        enableChip={true}
        color={color}
    />
)
