/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

export interface AnnotationLinkProps {
    points: number[][]
    isOutline?: boolean
}

const AnnotationLink = memo(({ points, isOutline = false }: AnnotationLinkProps) => {
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
    const { outlineWidth = 0, strokeWidth = 0, outlineColor, ...rest } = theme.annotations.link

    if (isOutline && outlineWidth <= 0) {
        return null
    }

    const style = { ...rest, outlineWidth, strokeWidth, outlineColor }
    if (isOutline) {
        style.strokeLinecap = 'square'
        style.strokeWidth = Number(strokeWidth) + Number(outlineWidth) * 2
        style.stroke = outlineColor
    }

    return <animated.path fill="none" d={animatedProps.path} style={style} />
})

export default AnnotationLink
