import { useMemo } from 'react'
import { TableTooltip, Chip } from '@nivo/tooltip'
import { RadarSliceTooltipProps } from './types'

export const RadarSliceTooltip = ({ index, data }: RadarSliceTooltipProps) => {
    const rows = useMemo(
        () =>
            data.map(datum => [
                <Chip key={datum.id} color={datum.color} />,
                datum.id,
                datum.formattedValue,
            ]),
        [data]
    )

    return <TableTooltip title={<strong>{index}</strong>} rows={rows} />
}
