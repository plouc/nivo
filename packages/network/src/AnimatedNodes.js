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
import Node from './Node'

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

const AnimatedNodes = ({
    nodes,
    color,
    borderWidth,
    borderColor,
    handleNodeHover,
    handleNodeLeave,
}) => {
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
                            <Node
                                key={key}
                                node={node}
                                x={style.x}
                                y={style.y}
                                radius={Math.max(style.radius, 0)}
                                color={color(node)}
                                borderWidth={borderWidth}
                                borderColor={borderColor(node)}
                                scale={Math.max(style.scale, 0)}
                                handleNodeHover={handleNodeHover}
                                handleNodeLeave={handleNodeLeave}
                            />
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
    handleNodeHover: PropTypes.func.isRequired,
    handleNodeLeave: PropTypes.func.isRequired,
}

export default memo(AnimatedNodes)
