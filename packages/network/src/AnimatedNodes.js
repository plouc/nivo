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

const willEnter = ({ style }) => ({
    x: style.x.val,
    y: style.y.val,
    radius: style.radius.val,
    scale: 0,
})

const willLeave = springConfig => ({ style }) => ({
    x: style.x,
    y: style.y,
    radius: style.radius,
    scale: spring(0, springConfig),
})

const AnimatedNodes = ({ nodes, color, borderWidth, borderColor }) => {
    const { springConfig } = useMotionConfig()

    return (
        <TransitionMotion
            willEnter={willEnter}
            willLeave={willLeave(springConfig)}
            styles={nodes.map(node => ({
                key: node.id,
                data: node,
                style: {
                    x: spring(node.x, springConfig),
                    y: spring(node.y, springConfig),
                    radius: spring(node.radius, springConfig),
                    scale: spring(1, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: node }) => {
                        return (
                            <g
                                key={key}
                                transform={`translate(${style.x},${style.y}) scale(${Math.max(
                                    style.scale,
                                    0
                                )})`}
                            >
                                <circle
                                    r={Math.max(style.radius, 0)}
                                    fill={color(node)}
                                    strokeWidth={borderWidth}
                                    stroke={borderColor(node)}
                                />
                            </g>
                        )
                    })}
                </>
            )}
        </TransitionMotion>
    )
}

AnimatedNodes.propTypes = {
    nodes: PropTypes.array.isRequired,
    color: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.func.isRequired,
}

export default memo(AnimatedNodes)
