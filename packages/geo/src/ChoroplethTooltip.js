import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'

const ChoroplethTooltip = memo(({ feature }) => {
    if (feature.data === undefined) return null

    return (
        <BasicTooltip
            id={feature.label}
            color={feature.color}
            enableChip={true}
            value={feature.formattedValue}
        />
    )
})

export default ChoroplethTooltip
