import React from 'react'
import { BulletRectsItemProps } from './types'
import { animated } from 'react-spring'

export const BulletRectsItem = ({
    animatedProps: { x, y, width, height, color },
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: BulletRectsItemProps) => {
    return (
        <animated.rect
            x={x}
            y={y}
            width={width.interpolate(value => Math.max(value, 0))}
            height={height.interpolate(value => Math.max(value, 0))}
            fill={color}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        />
    )
}
