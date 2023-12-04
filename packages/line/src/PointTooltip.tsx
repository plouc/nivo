import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { PointTooltipProps, LineDatum } from './types'

const NonMemoizedPointTooltip = <Datum extends LineDatum>({ point }: PointTooltipProps<Datum>) => (
    <BasicTooltip
        id={
            <span>
                x: <strong>{point.data.xFormatted}</strong>, y:{' '}
                <strong>{point.data.yFormatted}</strong>
            </span>
        }
        enableChip={true}
        color={point.serieColor}
    />
)

export const PointTooltip = memo(NonMemoizedPointTooltip)
