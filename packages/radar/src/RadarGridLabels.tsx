/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { SVGAttributes, FunctionComponent, createElement } from 'react'
import { TransitionMotion, spring } from 'react-motion'
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

export const RadarGridLabels = ({
    slices,
    radius,
    labelComponent = RadarGridLabel,
    labelOffset,
}: RadarGridLabelsProps) => {
    const { animate, springConfig } = useMotionConfig()

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

    if (!animate) {
        return <g>{labels.map(label => createElement(labelComponent, label))}</g>
    }

    return (
        <TransitionMotion
            styles={labels.map(label => ({
                key: label.id as string,
                data: label,
                style: {
                    x: spring(label.x, springConfig),
                    y: spring(label.y, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ data: label }) =>
                        createElement(labelComponent, label)
                    )}
                </g>
            )}
        </TransitionMotion>
    )
}
