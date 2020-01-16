/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

export interface PatternDotsSpec {
    id: string
    type: 'patternDots'
    background?: string
    color?: string
    size?: number
    padding?: number
    stagger?: boolean
}

export const patternDotsDefaults = {
    background: '#ffffff',
    color: '#000000',
    size: 4,
    padding: 4,
    stagger: false,
}

export const PatternDots = ({
    id,
    background = patternDotsDefaults.background,
    color = patternDotsDefaults.color,
    size = patternDotsDefaults.size,
    padding = patternDotsDefaults.padding,
    stagger = patternDotsDefaults.stagger,
}: PatternDotsSpec) => {
    let fullSize = size + padding
    const radius = size / 2
    const halfPadding = padding / 2
    if (stagger === true) {
        fullSize = size * 2 + padding * 2
    }

    return (
        <pattern id={id} width={fullSize} height={fullSize} patternUnits="userSpaceOnUse">
            <rect width={fullSize} height={fullSize} fill={background} />
            <circle cx={halfPadding + radius} cy={halfPadding + radius} r={radius} fill={color} />
            {stagger && (
                <circle
                    cx={padding * 1.5 + size + radius}
                    cy={padding * 1.5 + size + radius}
                    r={radius}
                    fill={color}
                />
            )}
        </pattern>
    )
}

export const patternDotsDef = (
    id: PatternDotsSpec['id'],
    options: Omit<PatternDotsSpec, 'id' | 'type'> = {}
): PatternDotsSpec => ({
    id,
    type: 'patternDots',
    ...options,
})
