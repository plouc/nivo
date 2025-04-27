import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { LineSeries, PointTooltipProps } from './types'

export const NonMemoizedPointTooltip = <Series extends LineSeries>({
    point,
}: PointTooltipProps<Series>) => {
    return (
        <BasicTooltip
            id={
                <span>
                    x: <strong>{point.data.xFormatted}</strong>, y:{' '}
                    <strong>{point.data.yFormatted}</strong>
                </span>
            }
            enableChip={true}
            color={point.seriesColor}
        />
    )
}

export const PointTooltip = memo(NonMemoizedPointTooltip)
