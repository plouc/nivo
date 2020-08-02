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
import { useSprings, animated } from 'react-spring'
import { useTheme, useMotionConfig, positionFromAngle, radiansToDegrees } from '@nivo/core'

const textAnchorFromAngle = _angle => {
    const angle = radiansToDegrees(_angle) + 90
    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) return 'middle'
    if (angle > 180) return 'end'
    return 'start'
}

const renderLabel = (label, theme, labelComponent) => {
    if (labelComponent === undefined) {
        return (
            <text
                style={theme.axis.ticks.text}
                dominantBaseline="central"
                textAnchor={label.anchor}
            >
                {label.id}
            </text>
        )
    }

    return React.createElement(labelComponent, label)
}

const RadarGridLabels = memo(({ radius, angles, indices, label: labelComponent, labelOffset }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

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

    const springs = useSprings(
        labels.length,
        labels.map(label => ({
            transform: `translate(${label.x}, ${label.y})`,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return springs.map((animatedProps, index) => {
        const label = labels[index]

        return (
            <animated.g key={label.id} transform={animatedProps.transform}>
                {renderLabel(label, theme, labelComponent)}
            </animated.g>
        )
    })
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
