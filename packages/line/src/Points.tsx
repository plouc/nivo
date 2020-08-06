/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { getLabelGenerator, DotsItem, useTheme } from '@nivo/core'
import { PointSymbolProps, AccessorFunc, Point, PointSymbol } from './hooks';

interface PointsProps extends Omit<PointSymbolProps, 'datum'> {
    points: Point[]
    symbol?: PointSymbol
    enableLabel?: boolean
    label?: string | AccessorFunc
    labelYOffset?: number
}

export default function Points({ points, symbol, size, borderWidth, enableLabel, label, labelYOffset }: PointsProps) {
    const theme = useTheme()
    const getLabel = getLabelGenerator(label)

    const mappedPoints = points.map(point => {
        const mappedPoint = {
            id: point.id,
            x: point.x,
            y: point.y,
            datum: point.data,
            fill: point.color,
            stroke: point.borderColor,
            label: enableLabel ? getLabel(point.data) : null,
        }

        return mappedPoint
    })

    return (
        <g>
            {mappedPoints.map(point => (
                <DotsItem
                    key={point.id}
                    x={point.x}
                    y={point.y}
                    datum={point.datum}
                    symbol={symbol}
                    size={size}
                    color={point.fill}
                    borderWidth={borderWidth}
                    borderColor={point.stroke}
                    label={point.label}
                    labelYOffset={labelYOffset}
                    theme={theme}
                />
            ))}
        </g>
    )
}
