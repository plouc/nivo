/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'

const Points = ({ points, color, getSize }) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)

    return points.map(point => {
        return (
            <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={getSize(point) / 2}
                fill={getColor(point)}
            />
        )
    })
}

export default memo(Points)
