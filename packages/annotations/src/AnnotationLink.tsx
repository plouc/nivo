import React from 'react'
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
    const [firstPoint, ...otherPoints] = points

    const path = otherPoints.reduce(
        (acc, [x, y]) => `${acc} L${x},${y}`,
        `M${firstPoint[0]},${firstPoint[1]}`
    )
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

/*
export const AnnotationLink = memo(({ isOutline, ...props }) => {
    const theme = useTheme()
    const [point, ...points] = props.points

    const path = points.reduce((acc, [x, y]) => `${acc} L${x},${y}`, `M${point[0]},${point[1]}`)
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
})

AnnotationLink.displayName = 'AnnotationLink'
AnnotationLink.propTypes = {
    points: PropTypes.arrayOf(PropTypes.array).isRequired,
    isOutline: PropTypes.bool.isRequired,
}
AnnotationLink.defaultProps = {
    isOutline: false,
}
*/
