import React from 'react'
import { animated, to, useSpring } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { useEventHandlers } from './hooks'
import { SunburstArcProps } from './types'

export const SunburstArc = <RawDatum,>({
    node,
    arcGenerator,
    borderWidth,
    borderColor,
    ...props
}: SunburstArcProps<RawDatum>) => {
    const { animate, config: springConfig } = useMotionConfig()

    const handlers = useEventHandlers({ data: node.data, ...props })

    const { x0, x1, y0, y1 } = useSpring({
        x0: node.x0,
        x1: node.x1,
        y0: node.y0,
        y1: node.y1,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path
            d={to([x0, x1, y0, y1], (x0, x1, y0, y1) => arcGenerator({ ...node, x0, x1, y0, y1 }))}
            fill={node.data.fill ?? node.data.color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            {...handlers}
        />
    )
}
