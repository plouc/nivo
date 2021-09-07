import { memo } from 'react'
import PropTypes from 'prop-types'

const Node = ({
    node,
    x,
    y,
    radius,
    color,
    borderWidth,
    borderColor,
    scale = 1,
    handleNodeClick,
    handleNodeHover,
    handleNodeLeave,
}) => {
    return (
        <circle
            transform={`translate(${x},${y}) scale(${scale})`}
            r={radius}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            onClick={event => handleNodeClick(node, event)}
            onMouseEnter={event => handleNodeHover(node, event)}
            onMouseMove={event => handleNodeHover(node, event)}
            onMouseLeave={handleNodeLeave}
        />
    )
}

Node.propTypes = {
    node: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    scale: PropTypes.number,
    handleNodeHover: PropTypes.func.isRequired,
    handleNodeLeave: PropTypes.func.isRequired,
}

export default memo(Node)
