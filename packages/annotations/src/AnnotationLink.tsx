import React, { useMemo } from 'react'
import { animated } from '@react-spring/web'
import { useAnimatedPath, useTheme } from '@nivo/core'

export const AnnotationLink = ({
    points,
    isOutline = false,
}: {
    points: [number, number][]
    isOutline?: boolean
}) => {
    const theme = useTheme()

    const path = useMemo(() => {
        const [firstPoint, ...otherPoints] = points

        return otherPoints.reduce(
            (acc, [x, y]) => `${acc} L${x},${y}`,
            `M${firstPoint[0]},${firstPoint[1]}`
        )
    }, [points])

    const animatedPath = useAnimatedPath(path)

    if (isOutline && theme.annotations.link.outlineWidth <= 0) {
        return null
    }

    const style = { ...theme.annotations.link }
    if (isOutline) {
        style.strokeLinecap = 'square'
        style.strokeWidth =
            theme.annotations.link.strokeWidth + theme.annotations.link.outlineWidth * 2
        style.stroke = theme.annotations.link.outlineColor
    }

    return <animated.path fill="none" d={animatedPath} style={style} />
}
