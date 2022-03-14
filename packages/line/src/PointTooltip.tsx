import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { LineDatum, LinePointDatum } from './types'

interface LinePointTooltipProps<Datum extends LineDatum> {
    point: LinePointDatum<Datum>
}

const NonMemoizedPointTooltip = <Datum extends LineDatum>({
    point,
}: LinePointTooltipProps<Datum>) => (
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

export const PointTooltip = memo(NonMemoizedPointTooltip) as typeof NonMemoizedPointTooltip
