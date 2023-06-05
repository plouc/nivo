import { useMemo } from 'react'
import { TableTooltip, Chip } from '@bitbloom/nivo-tooltip'
import { StackTooltipProps } from './types'

export const StackTooltip = ({ slice }: StackTooltipProps) => {
    const rows = useMemo(
        () =>
            slice.stack.map(p => [
                <Chip key={p.layerId} color={p.color} />,
                p.layerLabel,
                p.formattedValue,
            ]),
        [slice]
    )

    return <TableTooltip rows={rows} />
}
