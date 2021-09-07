import { memo } from 'react'

interface LinkProps {
    link: any
    sourceX: number
    sourceY: number
    targetX: number
    targetY: number
    thickness: number
    color: string
}

const Link = ({ sourceX, sourceY, targetX, targetY, thickness, color }: LinkProps) => {
    return (
        <line
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            x1={sourceX}
            y1={sourceY}
            x2={targetX}
            y2={targetY}
        />
    )
}

export default memo(Link)
