import React, { useMemo } from 'react'
import { animated } from 'react-spring'
import { useAnimatedPath } from '@nivo/core'
import { useEventHandlers } from './hooks'
import { SunburstArcProps } from './types'

export const SunburstArc = <RawDatum,>({
    node,
    arcGenerator,
    borderWidth,
    borderColor,
    ...props
}: SunburstArcProps<RawDatum>) => {
    const path = useMemo(() => arcGenerator(node), [arcGenerator, node])

    const animatedPath = useAnimatedPath(path ?? '')
    const handlers = useEventHandlers({ data: node.data, ...props })

    if (!path) {
        return null
    }

    return (
        <animated.path
            d={animatedPath}
            fill={node.data.fill ?? node.data.color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            {...handlers}
        />
    )
}
