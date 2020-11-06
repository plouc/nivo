import React from 'react'
import { BulletMarkersItemProps } from './types'
import { animated } from 'react-spring'

export const BulletMarkersItem = ({
    animatedProps: { color, transform, x, y1, y2 },
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: BulletMarkersItemProps) => {
    return (
        <animated.line
            transform={transform}
            x1={x}
            x2={x}
            y1={y1}
            y2={y2}
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
