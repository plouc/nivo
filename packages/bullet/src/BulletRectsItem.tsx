import React from 'react'
import { BulletRectsItemProps } from './types'
import { animated } from 'react-spring'

export const BulletRectsItem = ({
    animatedProps: { x, y, width, height, color },
    data,
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
            onMouseMove={event => onMouseMove(data, event)}
            onMouseEnter={event => onMouseEnter(data, event)}
            onMouseLeave={event => onMouseLeave(data, event)}
            onClick={event => onClick(data, event)}
        />
    )
}
