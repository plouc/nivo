/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { animated } from 'react-spring'
import { useAnimatedPath, useTheme } from '@nivo/core'

export interface AnnotationLinkProps {
    points: number[][]
    isOutline?: boolean
}

const AnnotationLink = ({ isOutline = false, ...props }: AnnotationLinkProps) => {
    const theme = useTheme()
    const [point, ...points] = props.points

    const path = points.reduce((acc, [x, y]) => `${acc} L${x},${y}`, `M${point[0]},${point[1]}`)
    const animatedPath = useAnimatedPath(path)

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

    return <animated.path fill="none" d={animatedPath} style={style} />
}

export default AnnotationLink
