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
import { useMotionConfig, useTheme } from '@nivo/core'

interface CircleAnnotationOutlineProps {
    size: number
    x: number
    y: number
}

const CircleAnnotationOutline = memo(({ x, y, size }: CircleAnnotationOutlineProps) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x,
        y,
        radius: size / 2,
        config: springConfig,
        immediate: !animate,
    })

    const {
        outlineWidth = 0,
        strokeWidth = 0,
        outlineColor,
        ...outline
    } = theme.annotations.outline

    return (
        <>
            {outlineWidth > 0 && (
                <animated.circle
                    cx={animatedProps.x}
                    cy={animatedProps.y}
                    r={animatedProps.radius}
                    style={{
                        ...outline,
                        fill: 'none',
                        strokeWidth: Number(strokeWidth) + Number(outlineWidth) * 2,
                        stroke: outlineColor,
                    }}
                />
            )}
            <animated.circle
                cx={animatedProps.x}
                cy={animatedProps.y}
                r={animatedProps.radius}
                style={outline}
            />
        </>
    )
})

export default CircleAnnotationOutline
