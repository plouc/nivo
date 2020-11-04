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
import { useTheme } from '@nivo/core'
import { datumWithArcPropType, PiePropTypes } from './props'
import { usePieSliceLabels } from './hooks'

const sliceStyle = {
    pointerEvents: 'none',
}

export const SliceLabels = ({
    dataWithArc,
    label,
    radius,
    innerRadius,
    radiusOffset,
    skipAngle,
    textColor,
}) => {
    const theme = useTheme()

    const labels = usePieSliceLabels({
        enable: true,
        dataWithArc,
        skipAngle,
        radius,
        innerRadius,
        radiusOffset,
        label,
        textColor,
    })

    return (
        <>
            {labels.map(label => {
                return (
                    <g
                        key={label.datum.id}
                        transform={`translate(${label.x}, ${label.y})`}
                        style={sliceStyle}
                    >
                        <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                                ...theme.labels.text,
                                fill: label.textColor,
                            }}
                        >
                            {label.label}
                        </text>
                    </g>
                )
            })}
        </>
    )
}

SliceLabels.propTypes = {
    dataWithArc: PropTypes.arrayOf(datumWithArcPropType).isRequired,
    label: PiePropTypes.sliceLabel,
    radiusOffset: PiePropTypes.sliceLabelsRadiusOffset,
    radius: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    skipAngle: PiePropTypes.sliceLabelsSkipAngle,
    textColor: PiePropTypes.sliceLabelsTextColor,
}
