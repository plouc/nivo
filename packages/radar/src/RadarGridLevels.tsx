/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { SVGAttributes } from 'react'
import { range } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig } from '@nivo/core'
import { lineRadial, curveLinearClosed } from 'd3-shape'
import { RadarGridShape } from './RadarGrid'

const levelWillEnter = () => ({ r: 0 })

export interface RadarGridLevelsProps {
    shape: RadarGridShape
    radii: number[]
    angleStep: number
    dataLength: number
}

export const RadarGridLevels = ({ shape, radii, angleStep, dataLength }: RadarGridLevelsProps) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const levelsTransitionProps = {
        willEnter: levelWillEnter,
        willLeave: () => ({ r: spring(0, springConfig) }),
        styles: radii.map((r, i) => ({
            key: `level.${i}`,
            style: {
                r: spring(r, springConfig),
            },
        })),
    }

    if (shape === 'circular') {
        if (!animate) {
            return (
                <g>
                    {radii.map((r, i) => (
                        <circle
                            key={`level.${i}`}
                            fill="none"
                            r={r}
                            {...(theme.grid.line as SVGAttributes<SVGCircleElement>)}
                        />
                    ))}
                </g>
            )
        }

        return (
            <TransitionMotion {...levelsTransitionProps}>
                {interpolatedStyles => (
                    <g>
                        {interpolatedStyles.map(({ key, style }) => (
                            <circle
                                key={key}
                                fill="none"
                                r={Math.max(style.r, 0)}
                                {...(theme.grid.line as SVGAttributes<SVGCircleElement>)}
                            />
                        ))}
                    </g>
                )}
            </TransitionMotion>
        )
    }

    const radarLineGenerator = lineRadial<number>()
        .angle(i => i * angleStep)
        .curve(curveLinearClosed)

    const points = range(dataLength)

    if (!animate) {
        return (
            <g>
                {radii.map((radius, i) => (
                    <path
                        key={`level.${i}`}
                        fill="none"
                        d={radarLineGenerator.radius(radius)(points) as string}
                        {...(theme.grid.line as SVGAttributes<SVGPathElement>)}
                    />
                ))}
            </g>
        )
    }

    return (
        <TransitionMotion {...levelsTransitionProps}>
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style }) => (
                        <path
                            key={key}
                            fill="none"
                            d={radarLineGenerator.radius(style.r as number)(points) as string}
                            {...(theme.grid.line as SVGAttributes<SVGPathElement>)}
                        />
                    ))}
                </g>
            )}
        </TransitionMotion>
    )
}
