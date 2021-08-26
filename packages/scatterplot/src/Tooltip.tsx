import { BasicTooltip } from '@nivo/tooltip'
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
