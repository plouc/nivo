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

export const PartLabel = ({ part }) => {
    const theme = useTheme()
    const { animate, config: motionConfig } = useMotionConfig()

    const animatedProps = useSpring({
        transform: `translate(${part.x}, ${part.y})`,
        color: part.labelColor,
        config: motionConfig,
        immediate: !animate,
    })

    return (
        <animated.g transform={animatedProps.transform}>
            <animated.text
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    ...theme.labels.text,
                    fill: animatedProps.color,
                    pointerEvents: 'none',
                }}
            >
                {part.formattedValue}
            </animated.text>
        </animated.g>
    )
}

PartLabel.propTypes = {
    part: PropTypes.shape({
        labelColor: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
}
