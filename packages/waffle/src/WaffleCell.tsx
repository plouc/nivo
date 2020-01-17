/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { MouseEvent } from 'react'
import { EnhancedWaffleDatum } from './hooks'

export interface WaffleCellProps {
    position: number
    size: number
    x: number
    y: number
    color: string
    fill?: string
    opacity: number
    borderWidth: number
    borderColor: string
    data?: EnhancedWaffleDatum
    onHover: (event: MouseEvent) => void
    onLeave: (event: MouseEvent) => void
    // onClick: PropTypes.func.isRequired,
}

export const WaffleCell = ({
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    onHover,
    onLeave,
    // onClick,
    data,
}: WaffleCellProps) => {
    return (
        <rect
            width={size}
            height={size}
            x={x}
            y={y}
            fill={fill || color}
            strokeWidth={borderWidth}
            stroke={borderColor}
            opacity={opacity}
            onMouseEnter={onHover}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            /*
            onClick={event => {
                onClick({ position, color, x, y, data }, event)
            }}
             */
        />
    )
}
