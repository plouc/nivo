/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { WaffleCellProps } from './props'

export const WaffleCell = ({
    // position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    // onMouseHover,
    // onMouseLeave,
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
            // onMouseEnter={onHover}
            // onMouseMove={onHover}
            // onMouseLeave={onLeave}
            /*
            onClick={event => {
                onClick({ position, color, x, y, data }, event)
            }}
             */
        />
    )
}
