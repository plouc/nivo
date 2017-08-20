/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

const BubbleNode = ({ radius, x, y, color, borderWidth, borderColor }) => {
    return (
        <circle
            r={radius}
            transform={`translate(${x},${y})`}
            //onMouseEnter={handleTooltip}
            //onMouseMove={handleTooltip}
            //onMouseLeave={hideTooltip}
            fill={color}
            strokeWidth={borderWidth}
            stroke={borderColor}
        />
    )
}

export default BubbleNode
