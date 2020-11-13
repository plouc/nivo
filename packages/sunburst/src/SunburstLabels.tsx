import React from 'react'
// @ts-ignore
import { midAngle, positionFromAngle, radiansToDegrees, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { SunburstLabelProps } from './types'

const sliceStyle = {
    pointerEvents: 'none',
} as const

export const SunburstLabels = ({
    nodes,
    label,
    skipAngle = 0,
    textColor: _textColor,
}: SunburstLabelProps) => {
    const theme = useTheme()
    const textColor = useInheritedColor(_textColor, theme)

    let centerRadius: number

    return (
        <>
            {nodes
                .filter(node => node.depth === 1)
                .map(node => {
                    if (!centerRadius) {
                        const innerRadius = Math.sqrt(node.y0)
                        const outerRadius = Math.sqrt(node.y1)
                        centerRadius = innerRadius + (outerRadius - innerRadius) / 2
                    }

                    const startAngle = node.x0
                    const endAngle = node.x1
                    const angle = Math.abs(endAngle - startAngle)
                    const angleDeg = radiansToDegrees(angle)

                    if (angleDeg <= skipAngle) return null

                    const middleAngle = midAngle({ startAngle, endAngle }) - Math.PI / 2
                    const position = positionFromAngle(middleAngle, centerRadius)

                    return (
                        <g
                            key={node.data.id}
                            transform={`translate(${position.x}, ${position.y})`}
                            style={sliceStyle}
                        >
                            <text
                                textAnchor="middle"
                                style={{
                                    ...theme.labels.text,
                                    fill: textColor(node.data),
                                }}
                            >
                                {label(node.data)}
                            </text>
                        </g>
                    )
                })}
        </>
    )
}
