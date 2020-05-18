/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { useTransition } from 'react-spring'
import { useMotionConfig } from '@nivo/core'
import { GridLine, GridLineProps } from './GridLine'

export interface GridLinesProps {
    lines: GridLineProps[]
}

export const GridLines = ({ lines }: GridLinesProps) => {
    const { animate, config: springConfig } = useMotionConfig()

    const transitions = useTransition(lines, line => String(line.key), {
        initial: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        from: line => ({
            opacity: 0,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        enter: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        update: line => ({
            opacity: 1,
            x1: line.x1,
            x2: line.x2,
            y1: line.y1,
            y2: line.y2,
        }),
        leave: {
            opacity: 0,
        },
        config: springConfig,
        immediate: !animate,
    })

    return (
        <g>
            {transitions.map(({ props: animatedProps, key }) => (
                <GridLine key={key} animatedProps={animatedProps} />
            ))}
        </g>
    )
}
