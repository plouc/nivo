/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memo } from 'react'
import { useTheme } from '../../../theming'
import { CartesianMarkerProps, CartesianMarkersItemProps } from './types'
import { defaultCartesianMarkersItemProps } from './props'

const computeLabel = ({
    axis,
    width,
    height,
    legendPosition,
    legendOffsetX,
    legendOffsetY,
    legendOrientation,
}: Pick<
    CartesianMarkerProps,
    'axis' | 'legendPosition' | 'legendOffsetX' | 'legendOffsetY' | 'legendOrientation'
> & {
    width: number
    height: number
}): {
    x: number
    y: number
    rotation: number
    textAnchor: string
} => {
    let x = 0
    let y = 0
    const rotation = legendOrientation === 'vertical' ? -90 : 0
    let textAnchor = 'start'
    const horizontal = legendOrientation === 'horizontal'
    if (axis === 'x') {
        switch (legendPosition) {
            case 'top-left':
                x = -legendOffsetX
                y = legendOffsetY
                textAnchor = 'end'
                break
            case 'top':
                y = -legendOffsetY
                textAnchor = horizontal ? 'middle' : 'start'
                break
            case 'top-right':
                x = legendOffsetX
                y = legendOffsetY
                textAnchor = horizontal ? 'start' : 'end'
                break
            case 'right':
                x = legendOffsetX
                y = height / 2
                textAnchor = horizontal ? 'start' : 'middle'
                break
            case 'bottom-right':
                x = legendOffsetX
                y = height - legendOffsetY
                textAnchor = 'start'
                break
            case 'bottom':
                y = height + legendOffsetY
                textAnchor = horizontal ? 'middle' : 'end'
                break
            case 'bottom-left':
                y = height - legendOffsetY
                x = -legendOffsetX
                textAnchor = horizontal ? 'end' : 'start'
                break
            case 'left':
                x = -legendOffsetX
                y = height / 2
                textAnchor = horizontal ? 'end' : 'middle'
                break
        }
    } else {
        switch (legendPosition) {
            case 'top-left':
                x = legendOffsetX
                y = -legendOffsetY
                textAnchor = 'start'
                break
            case 'top':
                x = width / 2
                y = -legendOffsetY
                textAnchor = horizontal ? 'middle' : 'start'
                break
            case 'top-right':
                x = width - legendOffsetX
                y = -legendOffsetY
                textAnchor = horizontal ? 'end' : 'start'
                break
            case 'right':
                x = width + legendOffsetX
                textAnchor = horizontal ? 'start' : 'middle'
                break
            case 'bottom-right':
                x = width - legendOffsetX
                y = legendOffsetY
                textAnchor = 'end'
                break
            case 'bottom':
                x = width / 2
                y = legendOffsetY
                textAnchor = horizontal ? 'middle' : 'end'
                break
            case 'bottom-left':
                x = legendOffsetX
                y = legendOffsetY
                textAnchor = horizontal ? 'start' : 'end'
                break
            case 'left':
                x = -legendOffsetX
                textAnchor = horizontal ? 'end' : 'middle'
                break
        }
    }

    return { x, y, rotation, textAnchor }
}

export const CartesianMarkersItem = memo(
    ({
        width,
        height,
        axis,
        scale,
        value,
        lineStyle,
        textStyle,
        legend,
        legendPosition = defaultCartesianMarkersItemProps['legendPosition'],
        legendOffsetX = defaultCartesianMarkersItemProps['legendOffsetX'],
        legendOffsetY = defaultCartesianMarkersItemProps['legendOffsetY'],
        legendOrientation = defaultCartesianMarkersItemProps['legendOrientation'],
    }: CartesianMarkersItemProps) => {
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

        let legendNode = <></>
        if (legend) {
            const legendProps = computeLabel({
                axis,
                width,
                height,
                legendPosition,
                legendOffsetX,
                legendOffsetY,
                legendOrientation,
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
)
