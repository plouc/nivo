import React, { useMemo } from 'react'
import {
    // @ts-ignore
    midAngle,
    // @ts-ignore
    positionFromAngle,
    // @ts-ignore
    getLabelGenerator,
    radiansToDegrees,
    useTheme,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { SunburstLabelProps } from './types'

const sliceStyle = {
    pointerEvents: 'none',
} as const

export const SunburstLabels = <RawDatum,>({
    label,
    nodes,
    skipAngle = 0,
    textColor: _textColor,
}: SunburstLabelProps<RawDatum>) => {
    const theme = useTheme()
    const textColor = useInheritedColor(_textColor, theme)

    const getLabel = useMemo(() => getLabelGenerator(label), [label])

    const { centerRadius, labelNodes } = useMemo(() => {
        const labelNodes = nodes.filter(node => node.depth === 1)
        const [node] = labelNodes
        const innerRadius = Math.sqrt(node.y0)
        const outerRadius = Math.sqrt(node.y1)
        const centerRadius = innerRadius + (outerRadius - innerRadius) / 2

        return { centerRadius, labelNodes }
    }, [nodes])

    return (
        <>
            {labelNodes.map(node => {
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
                            {getLabel(node.data)}
                        </text>
                    </g>
                )
            })}
        </>
    )
}
