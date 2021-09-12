import { BasicTooltip } from '@nivo/tooltip'
import { NetworkNodeTooltipProps } from './types'

export const NetworkNodeTooltip = ({ node }: NetworkNodeTooltipProps) => (
    <BasicTooltip
        id={node.id}
        enableChip={true}
        color={node.color}
        // renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
    />
)
