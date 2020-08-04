import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const NetworkNodeTooltip = ({ node, format, tooltip }) => (
    <BasicTooltip
        id={node.id}
        enableChip={true}
        color={node.color}
        format={format}
        renderContent={typeof tooltip === 'function' ? tooltip.bind(null, { ...node }) : null}
    />
)

NetworkNodeTooltip.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    format: PropTypes.func,
    tooltip: PropTypes.func,
}

export default memo(NetworkNodeTooltip)
