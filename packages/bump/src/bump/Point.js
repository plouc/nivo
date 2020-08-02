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
import { useSpring, animated } from 'react-spring'
import { useMotionConfig } from '@nivo/core'

const pointStyle = { pointerEvents: 'none' }

const Point = ({ x, y, size, color, borderColor, borderWidth }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x,
        y,
        radius: size / 2,
        color,
        borderWidth,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            cx={animatedProps.x}
            cy={animatedProps.y}
            r={animatedProps.radius.interpolate(v => Math.max(v, 0))}
            fill={animatedProps.color}
            strokeWidth={animatedProps.borderWidth}
            stroke={borderColor}
            style={pointStyle}
        />
    )
}

Point.propTypes = {
    data: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isInactive: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
}

export default memo(Point)
