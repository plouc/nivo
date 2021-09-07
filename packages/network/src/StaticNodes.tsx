import { memo } from 'react'
import PropTypes from 'prop-types'
import Node from './Node'

const StaticNodes = ({ nodes, color, borderColor, ...props }) => {
    return nodes.map(node => {
        return (
            <Node
                key={node.id}
                node={node}
                x={node.x}
                y={node.y}
                radius={node.radius}
                color={color(node)}
                borderColor={borderColor(node)}
                {...props}
            />
        )
    })
}

StaticNodes.propTypes = {
    nodes: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,
    handleNodeHover: PropTypes.func.isRequired,
    handleNodeLeave: PropTypes.func.isRequired,
}

export default memo(StaticNodes)
