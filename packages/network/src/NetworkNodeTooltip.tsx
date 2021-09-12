import { BasicTooltip } from '@nivo/tooltip'
import { NetworkInputNode, NetworkNodeTooltipProps } from './types'

export const NetworkNodeTooltip = <N extends NetworkInputNode>({
    node,
}: NetworkNodeTooltipProps<N>) => <BasicTooltip id={node.id} enableChip={true} color={node.color} />
