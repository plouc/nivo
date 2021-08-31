import { BasicTooltip } from '@nivo/tooltip'
import { DefaultLink, DefaultNode, SankeyNodeDatum } from './types'

export interface SankeyNodeTooltipProps<N extends DefaultNode, L extends DefaultLink> {
    node: SankeyNodeDatum<N, L>
}

export const SankeyNodeTooltip = <N extends DefaultNode, L extends DefaultLink>({
    node,
}: SankeyNodeTooltipProps<N, L>) => (
    <BasicTooltip id={node.label} enableChip={true} color={node.color} />
)
