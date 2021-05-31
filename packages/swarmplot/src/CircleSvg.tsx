import React from 'react'
import { animated } from '@react-spring/web'
import { CircleProps } from './types'
// import { useNodeMouseHandlers } from './hooks'

export const CircleSvg = <RawDatum,>({
    node,
    style,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}: CircleProps<RawDatum>) => {
    return (
        <animated.circle
            key={node.id}
            cx={style.x}
            cy={style.y}
            r={style.radius}
            fill={style.color}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            opacity={style.opacity}
            onMouseEnter={event => onMouseEnter?.(node, event)}
            onMouseMove={event => onMouseMove?.(node, event)}
            onMouseLeave={event => onMouseLeave?.(node, event)}
            onClick={event => onClick?.(node, event)}
        />
    )
}
