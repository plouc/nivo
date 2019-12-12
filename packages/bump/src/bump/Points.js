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

const Points = ({ pointComponent, points }) => {
    const { animate, springConfig } = useMotionConfig()

    if (!animate) {
        return points.map(point => {
            return React.createElement(pointComponent, {
                key: point.id,
                x: point.x,
                y: point.y,
                size: point.style.size,
                color: point.color,
                borderColor: point.borderColor,
                borderWidth: point.style.borderWidth,
            })
        })
    }

    return (
        <TransitionMotion
            styles={points.map(point => ({
                key: point.id,
                data: point,
                style: {
                    x: spring(point.x, springConfig),
                    y: spring(point.y, springConfig),
                    size: spring(point.style.size, springConfig),
                    borderWidth: spring(point.style.borderWidth, springConfig),
                },
            }))}
        >
            {interpolated => (
                <>
                    {interpolated.map(({ key, style, data: point }) => {
                        return React.createElement(pointComponent, {
                            key,
                            x: style.x,
                            y: point.y,
                            size: Math.max(style.size, 0),
                            color: point.color,
                            borderColor: point.borderColor,
                            borderWidth: Math.max(style.borderWidth, 0),
                        })
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

Points.propTypes = {
    pointComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
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
