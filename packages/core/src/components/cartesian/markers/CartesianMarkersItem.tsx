/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { CSSProperties } from 'react'
import { useTheme } from '../../../theming'

type CartesianMarkerLegendPosition =
    | 'top-left'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'

type CartesianMarkerLegendOrientation = 'horizontal' | 'vertical'

const computeLegend = ({
    axis,
    width,
    height,
    position,
    offsetX,
    offsetY,
    orientation,
}: {
    axis: 'x' | 'y'
    width: number
    height: number
    position: CartesianMarkerLegendPosition
    offsetX: number
    offsetY: number
    orientation: CartesianMarkerLegendOrientation
}) => {
    let x = 0
    let y = 0
    const rotation = orientation === 'vertical' ? -90 : 0
    let textAnchor = 'start'

    if (axis === 'x') {
        switch (position) {
            case 'top-left':
                x = -offsetX
                y = offsetY
                textAnchor = 'end'
                break
            case 'top':
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'top-right':
                x = offsetX
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'right':
                x = offsetX
                y = height / 2
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'middle'
                }
                break
            case 'bottom-right':
                x = offsetX
                y = height - offsetY
                textAnchor = 'start'
                break
            case 'bottom':
                y = height + offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'bottom-left':
                y = height - offsetY
                x = -offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'left':
                x = -offsetX
                y = height / 2
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'middle'
                }
                break
        }
    } else {
        switch (position) {
            case 'top-left':
                x = offsetX
                y = -offsetY
                textAnchor = 'start'
                break
            case 'top':
                x = width / 2
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'top-right':
                x = width - offsetX
                y = -offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'start'
                }
                break
            case 'right':
                x = width + offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'middle'
                }
                break
            case 'bottom-right':
                x = width - offsetX
                y = offsetY
                textAnchor = 'end'
                break
            case 'bottom':
                x = width / 2
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'middle'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'bottom-left':
                x = offsetX
                y = offsetY
                if (orientation === 'horizontal') {
                    textAnchor = 'start'
                } else {
                    textAnchor = 'end'
                }
                break
            case 'left':
                x = -offsetX
                if (orientation === 'horizontal') {
                    textAnchor = 'end'
                } else {
                    textAnchor = 'middle'
                }
                break
        }
    }

    return { x, y, rotation, textAnchor }
}

interface CartesianMarkersItemProps<Value extends number | string | Date> {
    width: number
    height: number
    axis: 'x' | 'y'
    scale: (v: Value) => number
    value: Value
    lineStyle?: CSSProperties
    textStyle?: CSSProperties
    legend?: string
    legendPosition?: CartesianMarkerLegendPosition
    legendOffsetX?: number
    legendOffsetY?: number
    legendOrientation?: CartesianMarkerLegendOrientation
}

export const CartesianMarkersItem = <Value extends number | string | Date>({
    width,
    height,
    axis,
    scale,
    value,
    lineStyle,
    textStyle,
    legend,
    legendPosition = 'top-right',
    legendOffsetX = 14,
    legendOffsetY = 14,
    legendOrientation = 'horizontal',
}: CartesianMarkersItemProps<Value>) => {
    const theme = useTheme()

    let x = 0
    let x2 = 0
    let y = 0
    let y2 = 0

    if (axis === 'y') {
        y = scale(value)
        x2 = width
    } else {
        x = scale(value)
        y2 = height
    }

    let legendNode = null
    if (legend) {
        const legendProps = computeLegend({
            axis,
            width,
            height,
            position: legendPosition,
            offsetX: legendOffsetX,
            offsetY: legendOffsetY,
            orientation: legendOrientation,
        })
        legendNode = (
            <text
                transform={`translate(${legendProps.x}, ${legendProps.y}) rotate(${legendProps.rotation})`}
                textAnchor={legendProps.textAnchor}
                dominantBaseline="central"
                style={textStyle}
            >
                {legend}
            </text>
        )
    }

    return (
        <g transform={`translate(${x}, ${y})`}>
            <line
                x1={0}
                x2={x2}
                y1={0}
                y2={y2}
                stroke={theme.markers.lineColor}
                strokeWidth={theme.markers.lineStrokeWidth}
                style={lineStyle}
            />
            {legendNode}
        </g>
    )
}
