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

interface RectAnnotationOutlineProps {
    height: number
    width: number
    x: number
    y: number
}

const RectAnnotationOutline = memo(({ x, y, width, height }: RectAnnotationOutlineProps) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
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
                <animated.rect
                    x={animatedProps.x}
                    y={animatedProps.y}
                    width={animatedProps.width}
                    height={animatedProps.height}
                    style={{
                        ...outline,
                        fill: 'none',
                        strokeWidth: Number(strokeWidth) + Number(outlineWidth) * 2,
                        stroke: outlineColor,
                    }}
                />
            )}
            <animated.rect
                x={animatedProps.x}
                y={animatedProps.y}
                width={animatedProps.width}
                height={animatedProps.height}
                style={theme.annotations.outline}
            />
        </>
    )
})

export default RectAnnotationOutline
