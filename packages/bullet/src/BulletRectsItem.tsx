import React from 'react'
import { BulletRectsItemProps } from './types'

export const BulletRectsItem = ({
    x,
    y,
    width,
    height,
    color,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: BulletRectsItemProps) => {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        />
    )
}
