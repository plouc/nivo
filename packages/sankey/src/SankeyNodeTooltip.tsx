import { BasicTooltip } from '@nivo/tooltip'
import { SankeyId, SankeyNodeDatum } from './types'

export interface SankeyNodeTooltipProps<Id extends SankeyId> {
    node: SankeyNodeDatum<Id>
}

export const SankeyNodeTooltip = <Id extends SankeyId>({ node }: SankeyNodeTooltipProps<Id>) => (
    <BasicTooltip id={node.label} enableChip={true} color={node.color} />
)
