import { BasicTooltip } from '@nivo/tooltip'
import { BarDatum } from './types'

export const BarTooltip = <Datum,>({ bar }: { bar: BarDatum<Datum> }) => (
    <BasicTooltip
        id={`${bar.datum.id} - ${bar.id}`}
        value={bar.formattedValue}
        enableChip={true}
        color={bar.color}
    />
)
