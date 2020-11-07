import React from 'react'
// @ts-ignore
import { line } from 'd3-shape'
// @ts-ignore
import { textPropsByEngine, useTheme } from '@nivo/core'
import { RadialLabelData, Point } from './types'

const lineGenerator = line()
    .x((d: Point) => d.x)
    .y((d: Point) => d.y)

// prettier-ignore
export const RadialLabel = <RawDatum, >({ label, linkStrokeWidth }: {
    label: RadialLabelData<RawDatum>
    linkStrokeWidth: number
}) => {
    const theme = useTheme()

    return (
        <>
            <path
                d={lineGenerator(label.line)}
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
