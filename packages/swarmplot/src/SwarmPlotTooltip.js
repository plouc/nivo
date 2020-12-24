import React from 'react'
import PropTypes from 'prop-types'
import { BasicTooltip } from '@nivo/tooltip'

const SwarmPlotTooltip = ({ node }) => (
    <BasicTooltip
        id={node.label}
        value={node.formattedValue}
        enableChip={true}
        color={node.color}
    />
)

SwarmPlotTooltip.propTypes = {
    node: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
}

export default SwarmPlotTooltip
