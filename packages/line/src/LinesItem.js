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

const LinesItem = ({ lineGenerator, points, color, thickness }) => {
    const { animate, config: springConfig } = useMotionConfig()

    const animatedProps = useSpring({
        path: lineGenerator(points),
        config: springConfig,
        immediate: !animate,
    })

    return (
        <animated.path d={animatedProps.path} fill="none" strokeWidth={thickness} stroke={color} />
    )
}

LinesItem.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    lineGenerator: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    thickness: PropTypes.number.isRequired,
}

export default memo(LinesItem)
