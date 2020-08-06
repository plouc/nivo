/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { Datum, LineGenerator } from './hooks'

interface LinesItemProps {
    points: Datum[]
    lineGenerator: LineGenerator
    color: string
    thickness: number
}

export default function LinesItem({ lineGenerator, points, color, thickness }: LinesItemProps) {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        path: lineGenerator(points),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path d={animatedProps.path} fill="none" strokeWidth={thickness} stroke={color} />
    )
}
