/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { SVGAttributes, useMemo } from 'react'
import { lineRadial, curveLinearClosed } from 'd3-shape'
import { animated, useSpring } from 'react-spring'
import { useTheme, useAnimatedPath, useMotionConfig } from '@nivo/core'
import { RadarGridShape } from './RadarGrid'

export interface RadarGridLevelsProps {
    shape: RadarGridShape
    radius: number
    angleStep: number
    dataLength: number
}

const RadarGridLevelCircular = ({ radius }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        radius,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            fill="none"
            r={animatedProps.radius.interpolate(value => Math.max(value, 0))}
            {...theme.grid.line}
        />
    )
}

const RadarGridLevelLinear = ({ radius, angleStep, dataLength }) => {
    const theme = useTheme()

    const radarLineGenerator = useMemo(
        () =>
            lineRadial()
                .angle(i => i * angleStep)
                .radius(radius)
                .curve(curveLinearClosed),
        [angleStep, radius]
    )

    const points = Array.from({ length: dataLength }, (_, i) => i)
    const animatedPath = useAnimatedPath(radarLineGenerator(points))

    return <animated.path fill="none" d={animatedPath} {...theme.grid.line} />
}

export const RadarGridLevels = ({ shape, ...props }: RadarGridLevelsProps) => {
    return shape === 'circular' ? (
        <RadarGridLevelCircular radius={props.radius} />
    ) : (
        <RadarGridLevelLinear {...props} />
    )
}
