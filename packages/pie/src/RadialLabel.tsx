/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
// @ts-ignore
import { line } from 'd3-shape'
// @ts-ignore
import { textPropsByEngine, useTheme } from '@nivo/core'
import { RadialLabelData, Point } from './definitions'

const lineGenerator = line()
    .x((d: Point) => d.x)
    .y((d: Point) => d.y)

// prettier-ignore
export const RadialLabel = <R, >({ label, linkStrokeWidth }: {
    label: RadialLabelData<R>
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
