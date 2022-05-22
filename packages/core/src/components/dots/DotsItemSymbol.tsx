/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { memo } from 'react'
import { DotsItemSymbolProps } from './types'

export const DotsItemSymbol = memo(
    ({ size, color, borderWidth, borderColor }: DotsItemSymbolProps) => (
        <circle
            r={size / 2}
            fill={color}
            stroke={borderColor}
            strokeWidth={borderWidth}
            style={{ pointerEvents: 'none' }}
        />
    )
)
