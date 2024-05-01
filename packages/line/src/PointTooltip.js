import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'

const LinePointTooltip = ({ point }) => {
    return (
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
}

export default memo(LinePointTooltip)
