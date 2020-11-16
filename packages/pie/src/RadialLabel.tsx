import React from 'react'
import { line } from 'd3-shape'
import {
    // @ts-ignore
    textPropsByEngine,
    useTheme,
} from '@nivo/core'
import { RadialLabelData, Point } from './types'

const lineGenerator = line<Point>()
    .x(d => d.x)
    .y(d => d.y)

export const RadialLabel = <RawDatum,>({
    label,
    linkStrokeWidth,
}: {
    label: RadialLabelData<RawDatum>
    linkStrokeWidth: number
}) => {
    const theme = useTheme()

    return (
        <>
            <path
                d={lineGenerator(label.line) ?? undefined}
                fill="none"
                style={{ fill: 'none', stroke: label.linkColor }}
                strokeWidth={linkStrokeWidth}
            />
            <g transform={`translate(${label.position.x}, ${label.position.y})`}>
                <text
                    textAnchor={textPropsByEngine.svg.align[label.align]}
                    dominantBaseline="central"
                    style={{
                        ...theme.labels.text,
                        fill: label.textColor,
                    }}
                >
                    {label.text}
                </text>
            </g>
        </>
    )
}
