import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'
import { NetworkNodeTooltipProps } from './types'

const NetworkNodeTooltip = ({ node }: NetworkNodeTooltipProps) => (
    <BasicTooltip
        id={node.id}
        enableChip={true}
        color={node.color}
        // renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
    />
)

export default memo(NetworkNodeTooltip)
