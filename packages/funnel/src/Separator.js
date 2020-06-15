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
import { useSpring, animated } from 'react-spring'
import { useTheme, useMotionConfig } from '@nivo/core'

export const Separator = ({ separator }) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        x1: separator.x0,
        x2: separator.x1,
        y1: separator.y0,
        y2: separator.y1,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.line
            x1={animatedProps.x1}
            x2={animatedProps.x2}
            y1={animatedProps.y1}
            y2={animatedProps.y2}
            fill="none"
            {...theme.grid.line}
        />
    )
}

Separator.propTypes = {
    separator: PropTypes.shape({
        x0: PropTypes.number.isRequired,
        x1: PropTypes.number.isRequired,
        y0: PropTypes.number.isRequired,
        y1: PropTypes.number.isRequired,
    }).isRequired,
}
