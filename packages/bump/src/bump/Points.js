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

const Points = ({ points, color, borderColor, getStyle }) => {
    const theme = useTheme()
    const getColor = useInheritedColor(color, theme)
    const getBorderColor = useInheritedColor(borderColor, theme)

    return points.map(point => {
        const { size, borderWidth } = getStyle(point)

        if (size <= 0) return null

        return (
            <circle
                style={{
                    pointerEvents: 'none'
                }}
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={size/ 2}
                strokeWidth={borderWidth}
                stroke={getBorderColor(point)}
                fill={getColor(point)}
            />
        )
    })
}

export default memo(Points)
