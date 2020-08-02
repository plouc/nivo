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
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

const AnnotationLink = memo(({ points, isOutline }) => {
    const theme = useTheme()

    let path = `M${points[0][0]},${points[0][1]}`
    points.slice(1).forEach(point => {
        path = `${path} L${point[0]},${point[1]}`
    })

    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        path,
        config: springConfig,
        immediate: !animate,
    })

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

    return <animated.path fill="none" d={animatedProps.path} style={style} />
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
