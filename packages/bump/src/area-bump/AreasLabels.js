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
import { useTheme, useMotionConfig } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'
import { useSeriesLabels } from './hooks'

const AreasLabels = ({ series, position, padding, color }) => {
    const theme = useTheme()
    const { animate, springConfig } = useMotionConfig()
    const labels = useSeriesLabels({
        series,
        position,
        padding,
        color,
    })

    if (!animate) {
        return labels.map(label => {
            return (
                <text
                    key={label.id}
                    x={label.x}
                    y={label.y}
                    textAnchor={label.textAnchor}
                    dominantBaseline="central"
                    opacity={label.opacity}
                    style={{
                        ...theme.labels.text,
                        fill: label.color,
                    }}
                >
                    {label.id}
                </text>
            )
        })
    }

    return (
        <TransitionMotion
            styles={labels.map(label => ({
                key: label.id,
                data: label,
                style: {
                    x: spring(label.x, springConfig),
                    y: spring(label.y, springConfig),
                    opacity: spring(label.opacity, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: label }) => (
                        <text
                            key={key}
                            x={style.x}
                            y={style.y}
                            textAnchor={label.textAnchor}
                            dominantBaseline="central"
                            opacity={style.opacity}
                            style={{
                                ...theme.labels.text,
                                fill: label.color,
                            }}
                        >
                            {label.id}
                        </text>
                    ))}
                </>
            )}
        </TransitionMotion>
    )
}

AreasLabels.propTypes = {
    series: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    position: PropTypes.oneOf(['start', 'end']).isRequired,
    padding: PropTypes.number.isRequired,
    color: inheritedColorPropType.isRequired,
}

export default memo(AreasLabels)
