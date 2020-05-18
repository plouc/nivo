/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties, useCallback } from 'react'
import { useTheme } from '@nivo/core'

export interface AxisTickProps<Value extends number | string | Date> {
    value: Value
    format?: any
    x: number
    y: number
    lineX: number
    lineY: number
    textX: number
    textY: number
    textBaseline: string
    textAnchor: string
    opacity?: number
    rotate?: number
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>, value: Value) => void
}

export const AxisTick = <Value extends number | string | Date>({
    value: _value,
    x,
    y,
    opacity = 1,
    rotate,
    format,
    lineX,
    lineY,
    onClick,
    textX,
    textY,
    textBaseline,
    textAnchor,
}: AxisTickProps<Value>) => {
    const theme = useTheme()

    let value = _value
    if (format !== undefined) {
        value = format(value)
    }

    const groupStyle: CSSProperties = {
        opacity,
        cursor: onClick ? 'pointer' : undefined,
    }

    const handleClick = useCallback(
        (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
            if (!onClick) {
                return
            }

            onClick(event, value)
        },
        [onClick, value]
    )

    return (
        <g transform={`translate(${x},${y})`} onClick={handleClick} style={groupStyle}>
            <line x1={0} x2={lineX} y1={0} y2={lineY} style={theme.axis.ticks.line} />
            <text
                dominantBaseline={textBaseline}
                textAnchor={textAnchor}
                transform={`translate(${textX},${textY}) rotate(${rotate})`}
                style={theme.axis.ticks.text}
            >
                {value}
            </text>
        </g>
    )
}
