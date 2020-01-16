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
import { useTransition, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'
import { RadarGridShape } from './RadarGrid'

export interface RadarGridLevelsProps {
    shape: RadarGridShape
    radii: number[]
    angleStep: number
    dataLength: number
}

export const RadarGridLevels = ({ shape, radii, angleStep, dataLength }: RadarGridLevelsProps) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()
    let transitions

    const radarLineGenerator = useMemo(
        () =>
            lineRadial()
                .angle(([i]) => i * angleStep)
                .curve(curveLinearClosed),
        [angleStep]
    )

    const keyFn = (_, i) => `level.${i}`

    if (shape === 'circular') {
        transitions = useTransition<number, SVGAttributes<unknown>>(radii, keyFn as any, {
            enter: radius => ({ radius }),
            update: radius => ({ radius }),
            leave: { radius: 0 },
            config: springConfig,
            immediate: !animate,
        })

        return transitions.map(({ props: animatedProps, key }) => (
            <animated.circle
                key={key}
                fill="none"
                r={animatedProps.radius.interpolate(v => Math.max(v, 0))}
                {...theme.grid.line}
            />
        ))
    }

    const points = Array.from({ length: dataLength }, (_, i) => i)

    transitions = useTransition<number, SVGAttributes<unknown>>(radii, keyFn as any, {
        enter: radius => ({ path: radarLineGenerator.radius(radius)(points as any) }),
        update: radius => ({ path: radarLineGenerator.radius(radius)(points as any) }),
        leave: { path: radarLineGenerator.radius(0)(points as any) },
        config: springConfig,
        immediate: !animate,
    } as any)

    return transitions.map(({ props: animatedProps, key }) => (
        <animated.path key={key} fill="none" d={animatedProps.path} {...theme.grid.line} />
    ))
}
