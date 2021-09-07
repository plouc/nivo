import { memo } from 'react'

interface NodeProps {
    node: any
    x: number
    y: number
    radius: number
    color: string
    borderWidth: number
    borderColor: string
    scale?: number
    handleNodeClick: Function
    handleNodeHover: Function
    handleNodeLeave: Function
}

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
}: NodeProps) => {
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

export default memo(Node)
