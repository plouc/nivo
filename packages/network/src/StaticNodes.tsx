import { memo } from 'react'
import Node from './Node'

interface StaticNodesProps {
    nodes: any[]
    color: Function
    borderWidth: number
    borderColor: Function
    handleNodeHover: Function
    handleNodeLeave: Function
}

const StaticNodes = ({ nodes, color, borderColor, ...props }: StaticNodesProps) => {
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

export default memo(StaticNodes)
