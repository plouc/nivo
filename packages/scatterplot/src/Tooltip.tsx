import { BasicTooltip } from '@nivo/tooltip'
import { ScatterPlotTooltipProps, ScatterPlotDatum } from './types'

export const Tooltip = <RawDatum extends ScatterPlotDatum>({
    node,
}: ScatterPlotTooltipProps<RawDatum>) => (
    <BasicTooltip
        id={node.data.serieId}
        value={`x: ${node.data.formattedX}, y: ${node.data.formattedY}`}
        enableChip={true}
        color={node.color}
    />
)
