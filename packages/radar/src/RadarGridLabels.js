/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { useTheme, useMotionConfig, positionFromAngle, radiansToDegrees } from '@nivo/core'

const textAnchorFromAngle = _angle => {
    const angle = radiansToDegrees(_angle) + 90
    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) return 'middle'
    if (angle > 180) return 'end'
    return 'start'
}

const renderLabel = (label, theme, labelComponent) => {
    let labelNode
    if (labelComponent === undefined) {
        labelNode = (
            <text
                style={theme.axis.ticks.text}
                dominantBaseline="central"
                textAnchor={label.anchor}
            >
                {label.id}
            </text>
        )
    } else {
        labelNode = React.createElement(labelComponent, label)
    }

    return (
        <g key={label.id} transform={`translate(${label.x}, ${label.y})`}>
            {labelNode}
        </g>
    )
}

const RadarGridLabels = memo(({ radius, angles, indices, label: labelComponent, labelOffset }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()

    const labels = indices.map((index, i) => {
        const position = positionFromAngle(angles[i], radius + labelOffset)
        const textAnchor = textAnchorFromAngle(angles[i])

        return {
            id: index,
            angle: radiansToDegrees(angles[i]),
            anchor: textAnchor,
            ...position,
        }
    })

    if (animate !== true) {
        return <g>{labels.map(label => renderLabel(label, theme, labelComponent))}</g>
    }

    return (
        <TransitionMotion
            styles={labels.map(label => ({
                key: label.id,
                data: label,
                style: {
                    x: spring(label.x, springConfig),
                    y: spring(label.y, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ data }) => renderLabel(data, theme, labelComponent))}
                </g>
            )}
        </TransitionMotion>
    )
})

RadarGridLabels.displayName = 'RadarGridLabels'
RadarGridLabels.propTypes = {
    radius: PropTypes.number.isRequired,
    angles: PropTypes.arrayOf(PropTypes.number).isRequired,
    indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired,
    label: PropTypes.func,
    labelOffset: PropTypes.number.isRequired,
}

export default RadarGridLabels
