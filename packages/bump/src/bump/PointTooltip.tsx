import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { BumpDatum, BumpPoint, BumpSerieExtraProps } from './types'

interface PointTooltipProps<Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps> {
    point: BumpPoint<Datum, ExtraProps>
}

const LinePointTooltip = <Datum extends BumpDatum, ExtraProps extends BumpSerieExtraProps>({
    point,
}: PointTooltipProps<Datum, ExtraProps>) => {
    return (
        <BasicTooltip
            id={
                <span>
                    x: <strong>{point.data.x}</strong>, y: <strong>{point.data.y}</strong>
                </span>
            }
            enableChip={true}
            color={point.serie.color}
        />
    )
}

export default memo(LinePointTooltip)
