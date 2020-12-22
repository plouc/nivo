import React from 'react'
import { animated, to, SpringValue, Interpolation } from 'react-spring'
import { CircleProps } from './types'

const interpolatePosition = (
    positionValue: SpringValue<number>,
    radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

const interpolateSize = (radiusValue: Interpolation<number>) =>
    to([radiusValue], radius => radius * 2)

export const CircleHtml = <RawDatum,>({ style }: CircleProps<RawDatum>) => {
    return (
        <animated.div
            style={{
                position: 'absolute',
                top: interpolatePosition(style.y, style.radius),
                left: interpolatePosition(style.x, style.radius),
                height: interpolateSize(style.radius),
                width: interpolateSize(style.radius),
                borderRadius: style.radius,
                backgroundColor: style.color,
            }}
        />
    )
}
