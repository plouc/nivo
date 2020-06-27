/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { SVGAttributes, FunctionComponent, createElement, memo } from 'react'
import { useSprings, animated } from 'react-spring'
import { useTheme, useMotionConfig, positionFromAngle, radiansToDegrees } from '@nivo/core'
import { RadarSlice } from './hooks'

interface RadarGridLabelProps {
    id: string | number
    angle: number
    x: number
    y: number
    anchor: SVGAttributes<SVGTextElement>['textAnchor']
}

export type RadarGridLabelComponent = FunctionComponent<RadarGridLabelProps>

export interface RadarGridLabelsProps {
    slices: RadarSlice[]
    radius: number
    labelComponent?: RadarGridLabelComponent
    labelOffset: number
}

const textAnchorFromAngle = (_angle: number) => {
    const angle = radiansToDegrees(_angle) + 90
    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) {
        return 'middle'
    }
    if (angle > 180) {
        return 'end'
    }

    return 'start'
}

const RadarGridLabel = (props: RadarGridLabelProps) => {
    const theme = useTheme()

    return (
        <g key={props.id} transform={`translate(${props.x}, ${props.y})`}>
            <text
                style={theme.axis.ticks.text}
                dominantBaseline="central"
                textAnchor={props.anchor}
            >
                {props.id}
            </text>
        </g>
    )
}

export const RadarGridLabels = memo(
    ({ slices, radius, labelComponent = RadarGridLabel, labelOffset }: RadarGridLabelsProps) => {
        const { animate, config: springConfig } = useMotionConfig()

        const labels: RadarGridLabelProps[] = slices.map((slice, i) => {
            const position = positionFromAngle(slice.angle, radius + labelOffset)
            const textAnchor = textAnchorFromAngle(slice.angle)

            return {
                id: slice.index,
                angle: radiansToDegrees(slice.angle),
                anchor: textAnchor,
                ...position,
            }
        })

        const springs = useSprings(
            labels.length,
            labels.map(label => ({
                transform: `translate(${label.x}, ${label.y})`,
                config: springConfig,
                immediate: !animate,
            }))
        )

        return (
            <>
                {springs.map((animatedProps, index) => {
                    const label = labels[index]

                    return (
                        <animated.g key={label.id} transform={animatedProps.transform}>
                            {createElement(labelComponent, label)}
                        </animated.g>
                    )
                })}
            </>
        )
    }
)

RadarGridLabels.displayName = 'RadarGridLabels'
