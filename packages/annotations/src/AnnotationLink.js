/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@bitbloom/nivo-core'
=======
import { animated } from 'react-spring'
import { useAnimatedPath, useTheme } from '@nivo/core'
>>>>>>> 53b9c1cc7b439d550e8c2084bbd420c334082881

const AnnotationLink = memo(({ isOutline, ...props }) => {
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

export default AnnotationLink
