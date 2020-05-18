/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import { GridLine, GridLineProps } from './GridLine'

export interface GridLinesProps {
    type: 'x' | 'y'
    lines: GridLineProps[]
}

interface TransitioningStyles {
    style: {
        x1: { val: number }
        x2: { val: number }
        y1: { val: number }
        y2: { val: number }
    }
}

export const GridLines = ({ type, lines }: GridLinesProps) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const lineWillEnter = useMemo(
        () => ({ style }: TransitioningStyles) => ({
            opacity: 0,
            x1: type === 'x' ? 0 : style.x1.val,
            x2: type === 'x' ? 0 : style.x2.val,
            y1: type === 'y' ? 0 : style.y1.val,
            y2: type === 'y' ? 0 : style.y2.val,
        }),
        [type]
    )

    const lineWillLeave = useMemo(
        () => ({ style }: TransitioningStyles) => ({
            opacity: spring(0, springConfig),
            x1: spring(style.x1.val, springConfig),
            x2: spring(style.x2.val, springConfig),
            y1: spring(style.y1.val, springConfig),
            y2: spring(style.y2.val, springConfig),
        }),
        [springConfig]
    )

    if (!animate) {
        return (
            <g>
                {lines.map(line => (
                    <GridLine key={line.key} {...line} {...(theme.grid.line as any)} />
                ))}
            </g>
        )
    }

    return (
        <TransitionMotion
            willEnter={lineWillEnter as any}
            willLeave={lineWillLeave as any}
            styles={lines.map(line => {
                return {
                    key: line.key,
                    style: {
                        opacity: spring(1, springConfig),
                        x1: spring(line.x1 || 0, springConfig),
                        x2: spring(line.x2 || 0, springConfig),
                        y1: spring(line.y1 || 0, springConfig),
                        y2: spring(line.y2 || 0, springConfig),
                    },
                }
            })}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(interpolatedStyle => {
                        const { key, style } = interpolatedStyle

                        return <GridLine key={key} {...(theme.grid.line as any)} {...style} />
                    })}
                </g>
            )}
        </TransitionMotion>
    )
}
