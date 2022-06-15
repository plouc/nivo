import { BasicTooltip } from '@nivo/core'
import { ScatterPlotTooltipProps, ScatterPlotDatum } from './types'

export const Tooltip = <RawDatum extends ScatterPlotDatum>({
    node,
}: ScatterPlotTooltipProps<RawDatum>) => (
    <BasicTooltip
        id={node.serieId}
        value={`x: ${node.formattedX}, y: ${node.formattedY}`}
        enableChip={true}
        color={node.color}
    />
)
