import { BasicTooltip } from '@bitbloom/nivo-tooltip'
import { InputNode, NodeTooltipProps } from './types'

export const NetworkNodeTooltip = <Node extends InputNode>({ node }: NodeTooltipProps<Node>) => (
    <BasicTooltip id={node.id} enableChip={true} color={node.color} />
)
