import React from 'react'
import { animated, to, SpringValue, Interpolation } from 'react-spring'
import { CircleProps } from './types'
import { useNodeMouseHandlers } from './hooks'

export const interpolatePosition = (
    positionValue: SpringValue<number>,
    radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

export const interpolateSize = (radiusValue: Interpolation<number>) =>
    to([radiusValue], radius => radius * 2)

export const CircleHtml = <RawDatum,>({
    node,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: CircleProps<RawDatum>) => {
    const size = interpolateSize(style.radius)

    const handlers = useNodeMouseHandlers<RawDatum>(node, {
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    })

    return (
        <animated.div
            style={{
                position: 'absolute',
                top: interpolatePosition(style.y, style.radius),
                left: interpolatePosition(style.x, style.radius),
                height: size,
                width: size,
                borderRadius: style.radius,
                backgroundColor: style.color,
            }}
            onMouseEnter={handlers.onMouseEnter}
            onMouseMove={handlers.onMouseMove}
            onMouseLeave={handlers.onMouseLeave}
            onClick={handlers.onClick}
        />
    )
}
