import { BasicTooltip } from '@nivo/core'
import { ComputedDatum } from './types'

export const PieTooltip = <RawDatum,>({ datum }: { datum: ComputedDatum<RawDatum> }) => (
    <BasicTooltip
        id={datum.id}
        value={datum.formattedValue}
        enableChip={true}
        color={datum.color}
    />
)

export default PieTooltip
