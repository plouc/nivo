/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

export interface PatternSquaresSpec {
    id: string
    type: 'patternSquares'
    background?: string
    color?: string
    size?: number
    padding?: number
    stagger?: boolean
}

export const patternSquaresDefaults = {
    background: '#ffffff',
    color: '#000000',
    size: 4,
    padding: 4,
    stagger: false,
}

export const PatternSquares = ({
    id,
    background = patternSquaresDefaults.background,
    color = patternSquaresDefaults.color,
    size = patternSquaresDefaults.size,
    padding = patternSquaresDefaults.padding,
    stagger = patternSquaresDefaults.stagger,
}: PatternSquaresSpec) => {
    let fullSize = size + padding
    const halfPadding = padding / 2
    if (stagger === true) {
        fullSize = size * 2 + padding * 2
    }

    return (
        <pattern id={id} width={fullSize} height={fullSize} patternUnits="userSpaceOnUse">
            <rect width={fullSize} height={fullSize} fill={background} />
            <rect x={halfPadding} y={halfPadding} width={size} height={size} fill={color} />
            {stagger && (
                <rect
                    x={padding * 1.5 + size}
                    y={padding * 1.5 + size}
                    width={size}
                    height={size}
                    fill={color}
                />
            )}
        </pattern>
    )
}

export const patternSquaresDef = (
    id: PatternSquaresSpec['id'],
    options: Omit<PatternSquaresSpec, 'id' | 'type'> = {}
): PatternSquaresSpec => ({
    id,
    type: 'patternSquares',
    ...options,
})
