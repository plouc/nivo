import { memo } from 'react'
import { BasicTooltip } from '@nivo/tooltip'

interface NetworkNodeTooltipProps {
    // node: PropTypes.shape({
    //     id: PropTypes.string.isRequired,
    //     color: PropTypes.string.isRequired,
    // }).isRequired,
    // format: PropTypes.func,
    // tooltip: PropTypes.func,
}

const NetworkNodeTooltip = ({ node, format, tooltip }: NetworkNodeTooltipProps) => (
    <BasicTooltip
        id={node.id}
        enableChip={true}
        color={node.color}
        format={format}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
    />
)

export default memo(NetworkNodeTooltip)
