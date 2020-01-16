/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { LegendSymbolProps } from './index'

export const SymbolSquare = ({ x, y, size, fill, borderWidth, borderColor }: LegendSymbolProps) => (
    <rect
        x={x}
        y={y}
        fill={fill}
        strokeWidth={borderWidth}
        stroke={borderColor}
        width={size}
        height={size}
        style={{
            pointerEvents: 'none',
        }}
    />
)
