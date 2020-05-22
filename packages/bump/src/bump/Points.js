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
import { useMotionConfig } from '@nivo/core'

const pointStyle = { pointerEvents: 'none' }

const Points = ({ points }) => {
    const { animate, springConfig } = useMotionConfig()

    if (!animate) {
        return points.map(point => (
            <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={point.style.size / 2}
                strokeWidth={point.style.borderWidth}
                stroke={point.borderColor}
                fill={point.color}
                style={pointStyle}
            />
        ))
    }

    return (
        <TransitionMotion
            styles={points.map(point => ({
                key: point.id,
                data: point,
                style: {
                    x: spring(point.x, springConfig),
                    y: spring(point.y, springConfig),
                    r: spring(point.style.size / 2, springConfig),
                    strokeWidth: spring(point.style.borderWidth, springConfig),
                },
            }))}
        >
            {interpolated => (
                <>
                    {interpolated.map(({ key, style, data: point }) => (
                        <circle
                            key={key}
                            cx={style.x}
                            cy={style.y}
                            r={Math.max(style.r, 0)}
                            strokeWidth={Math.max(style.strokeWidth, 0)}
                            stroke={point.borderColor}
                            fill={point.color}
                            style={pointStyle}
                        />
                    ))}
                </>
            )}
        </TransitionMotion>
    )
}

Points.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
            borderColor: PropTypes.string.isRequired,
            style: PropTypes.shape({
                size: PropTypes.number.isRequired,
                borderWidth: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
}

export default memo(Points)
