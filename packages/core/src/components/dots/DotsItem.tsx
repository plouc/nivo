/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Theme } from '../../theming'
import { DotsItemSymbol } from './DotsItemSymbol'

interface DotsItemProps<Datum> {
    x: number
    y: number
    datum: Datum
    size: number
    color: string
    borderWidth: number
    borderColor: string
    symbol: React.ElementType
    label?: string | number | null
    labelTextAnchor?: 'start' | 'middle' | 'end'
    labelYOffset?: number
    theme: Theme
}

export function DotsItem<Datum = any>({
    x,
    y,
    symbol = DotsItemSymbol,
    size,
    datum,
    color,
    borderWidth,
    borderColor,
    label,
    labelTextAnchor = 'middle',
    labelYOffset = -12,
    theme,
}: DotsItemProps<Datum>) {
    return (
        <g transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
            {React.createElement(symbol, {
                size,
                color,
                datum,
                borderWidth,
                borderColor,
            })}
            {label && (
                <text textAnchor={labelTextAnchor} y={labelYOffset} style={theme.dots.text}>
                    {label}
                </text>
            )}
        </g>
    )
}
