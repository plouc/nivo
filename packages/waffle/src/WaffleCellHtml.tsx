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

export const WaffleCellHtml = ({
    // position,
    size,
    x,
    y,
    color,
    opacity,
    borderWidth,
    borderColor,
    // data,
    // onHover,
    // onLeave,
    // onClick,
}: WaffleCellProps) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: size,
                height: size,
                background: color,
                opacity,
                boxSizing: 'content-box',
                borderStyle: 'solid',
                borderWidth: `${borderWidth}px`,
                borderColor,
            }}
            /*
            onMouseEnter={onHover}
            onMouseMove={onHover}
            onMouseLeave={onLeave}
            onClick={event => {
                onClick({ position, color, x, y, data }, event)
            }}
            */
        />
    )
}
