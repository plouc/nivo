import { memo } from 'react'
import { useTheme } from '@nivo/theming'
import { Chip, TableTooltip } from '@nivo/tooltip'
import { LineSeries, SliceTooltipProps } from './types'

export const NonMemoizedSliceTooltip = <Series extends LineSeries>({
    slice,
    axis,
}: SliceTooltipProps<Series>) => {
    const theme = useTheme()
    const otherAxis = axis === 'x' ? 'y' : 'x'

    return (
        <TableTooltip
            rows={slice.points.map(point => [
                <Chip key="chip" color={point.seriesColor} style={theme.tooltip.chip} />,
                point.seriesId,
                <span key="value" style={theme.tooltip.tableCellValue}>
                    {point.data[`${otherAxis}Formatted`]}
                </span>,
            ])}
        />
    )
}

export const SliceTooltip = memo(NonMemoizedSliceTooltip)
