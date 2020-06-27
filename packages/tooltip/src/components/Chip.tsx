/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, CSSProperties } from 'react'

interface ChipProps {
    size?: number
    color: string
    style?: CSSProperties
}

export const Chip = memo(({ size = 12, color, style = {} }: ChipProps) => (
    <span style={{ display: 'block', width: size, height: size, background: color, ...style }} />
))

Chip.displayName = 'Chip'
