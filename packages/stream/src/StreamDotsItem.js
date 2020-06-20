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

const StreamDotsItem = ({ x, y, size, color, borderWidth, borderColor }) => {
    const { animate, config: springConfig } = useMotionConfig()
    const animatedProps = useSpring({
        x,
        y,
        radius: size * 0.5,
        color,
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.circle
            cx={animatedProps.x}
            cy={animatedProps.y}
            r={animatedProps.radius}
            fill={animatedProps.color}
            strokeWidth={borderWidth}
            stroke={borderColor}
        />
    )
}

StreamDotsItem.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
}

export default memo(StreamDotsItem)
