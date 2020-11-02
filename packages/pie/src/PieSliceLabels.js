/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { midAngle, positionFromAngle, useTheme } from '@nivo/core'
import { datumWithArcPropType } from './props'

const sliceStyle = {
    pointerEvents: 'none',
}

export const PieSliceLabels = ({
    dataWithArc,
    label,
    radius,
    radiusOffset,
    skipAngle,
    innerRadius,
    textColor,
}) => {
    const theme = useTheme()

    return dataWithArc
        .filter(datumWithArc => skipAngle === 0 || datumWithArc.arc.angleDeg > skipAngle)
        .map(datumWithArc => {
            const angle = midAngle(datumWithArc.arc) - Math.PI / 2
            const labelRadius = innerRadius + (radius - innerRadius) * radiusOffset
            const position = positionFromAngle(angle, labelRadius)

            return (
                <g
                    key={datumWithArc.id}
                    transform={`translate(${position.x}, ${position.y})`}
                    style={sliceStyle}
                >
                    <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                            ...theme.labels.text,
                            fill: textColor(datumWithArc, theme),
                        }}
                    >
                        {label(datumWithArc)}
                    </text>
                </g>
            )
        })
}

PieSliceLabels.propTypes = {
    dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radiusOffset: PropTypes.number.isRequired,
    skipAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    textColor: PropTypes.func.isRequired,
}
