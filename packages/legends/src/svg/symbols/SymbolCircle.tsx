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

export const SymbolCircle = ({ x, y, size, fill, borderWidth, borderColor }: LegendSymbolProps) => (
    <circle
        r={size / 2}
        cx={x + size / 2}
        cy={y + size / 2}
        fill={fill}
        strokeWidth={borderWidth}
        stroke={borderColor}
        style={{
            pointerEvents: 'none',
        }}
    />
)
