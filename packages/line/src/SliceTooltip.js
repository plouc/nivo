import { memo } from 'react'
import { useTheme } from '@nivo/core'
import { Chip, TableTooltip } from '@nivo/tooltip'

const SliceTooltip = ({ slice, axis }) => {
    const theme = useTheme()
    const otherAxis = axis === 'x' ? 'y' : 'x'

    return (
        <TableTooltip
            rows={slice.points.map(point => [
                <Chip key="chip" color={point.serieColor} style={theme.tooltip.chip} />,
                point.serieId,
                <span key="value" style={theme.tooltip.tableCellValue}>
                    {point.data[`${otherAxis}Formatted`]}
                </span>,
            ])}
        />
    )
}

export default memo(SliceTooltip)
