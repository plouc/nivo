/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'

const willEnter = ({ style, ...rest }) => ({
    x: style.x.val,
    y: style.y.val,
    scale: 0,
    colorR: style.colorR.val,
    colorG: style.colorG.val,
    colorB: style.colorB.val,
})

const willLeave = springConfig => ({ style }) => ({
    x: style.x,
    y: style.y,
    scale: spring(0, springConfig),
    colorR: style.colorR,
    colorG: style.colorG,
    colorB: style.colorB,
})

const AnimatedSwarmPlotNodes = memo(({ nodes, nodeSize, motionStiffness, motionDamping }) => {
    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <TransitionMotion
            willEnter={willEnter}
            willLeave={willLeave(springConfig)}
            styles={nodes.map(node => ({
                key: node.uid,
                data: node,
                style: {
                    x: spring(node.x, springConfig),
                    y: spring(node.y, springConfig),
                    scale: spring(1, springConfig),
                    ...interpolateColor(node.color, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <g>
                    {interpolatedStyles.map(({ key, style, data: node }) => {
                        const color = getInterpolatedColor(style)

                        return (
                            <circle
                                key={key}
                                transform={`translate(${style.x}, ${style.y}) scale(${
                                    style.scale
                                })`}
                                r={nodeSize / 2}
                                fill={color}
                            />
                        )
                    })}
                </g>
            )}
        </TransitionMotion>
    )
})

AnimatedSwarmPlotNodes.displayName = 'AnimatedSwarmPlotNodes'

export default AnimatedSwarmPlotNodes
