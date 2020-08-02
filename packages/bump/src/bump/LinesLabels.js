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
import { useTheme, useMotionConfig } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'
import { useSeriesLabels } from './hooks'

const LinesLabels = ({ series, getLabel, position, padding, color }) => {
    const theme = useTheme()
    const { animate, config: springConfig } = useMotionConfig()

    const labels = useSeriesLabels({
        series,
        getLabel,
        position,
        padding,
        color,
    })

    const springs = useSprings(
        labels.length,
        labels.map(label => ({
            x: label.x,
            y: label.y,
            opacity: label.opacity,
            config: springConfig,
            immediate: !animate,
        }))
    )

    return springs.map((animatedProps, index) => {
        const label = labels[index]

        return (
            <animated.text
                key={label.id}
                x={animatedProps.x}
                y={animatedProps.y}
                textAnchor={label.textAnchor}
                dominantBaseline="central"
                opacity={animatedProps.opacity}
                style={{
                    ...theme.labels.text,
                    fill: label.color,
                }}
            >
                {label.label}
            </animated.text>
        )
    })
}

LinesLabels.propTypes = {
    series: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                })
            ).isRequired,
        })
    ).isRequired,
    getLabel: PropTypes.oneOfType([PropTypes.oneOf([false]), PropTypes.string, PropTypes.func])
        .isRequired,
    position: PropTypes.oneOf(['start', 'end']).isRequired,
    padding: PropTypes.number.isRequired,
    color: inheritedColorPropType.isRequired,
}

export default memo(LinesLabels)
