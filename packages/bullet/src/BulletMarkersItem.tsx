import React from 'react'
import { BulletMarkersItemProps } from './types'

export const BulletMarkersItem = ({
    x,
    y,
    size,
    rotation,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: BulletMarkersItemProps) => {
    return (
        <line
            transform={`rotate(${rotation}, ${x}, ${y})`}
            x1={x}
            x2={x}
            y1={y - size / 2}
            y2={y + size / 2}
            fill="none"
            stroke={color}
            strokeWidth="5"
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        />
    )
}
