import React from 'react'
import { animated } from 'react-spring'
import { CircleProps } from './types'

export const CircleSvg = <RawDatum,>({ node, style }: CircleProps<RawDatum>) => {
    return (
        <animated.circle
            key={node.id}
            cx={style.x}
            cy={style.y}
            r={style.radius}
            fill={style.color}
            opacity={style.opacity}
        />
    )
}
