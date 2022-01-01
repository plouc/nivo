import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { TreeMapDatum, TooltipProps } from './types'

const NonMemoizedTreeMapNodeTooltip = <Datum extends TreeMapDatum>({
    node,
}: TooltipProps<Datum>) => (
    <BasicTooltip id={node.id} value={node.formattedValue} enableChip={true} color={node.color} />
)

export const TreeMapNodeTooltip = memo(
    NonMemoizedTreeMapNodeTooltip
) as typeof NonMemoizedTreeMapNodeTooltip
