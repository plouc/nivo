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
import { useMotionConfig, blendModePropType } from '@nivo/core'
import { NodePropType } from './props'
import NodeWrapper from './NodeWrapper'

const AnimatedNodes = ({
    nodes,
    renderNode,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip,
    blendMode,
}) => {
    const { springConfig } = useMotionConfig()

    return (
        <TransitionMotion
            styles={nodes.map(node => ({
                key: node.id,
                data: node,
                style: {
                    x: spring(node.x, springConfig),
                    y: spring(node.y, springConfig),
                    size: spring(node.size, springConfig),
                },
            }))}
        >
            {interpolatedStyles => (
                <>
                    {interpolatedStyles.map(({ key, style, data: node }) => (
                        <NodeWrapper
                            key={key}
                            node={node}
                            renderNode={renderNode}
                            x={style.x}
                            y={style.y}
                            size={style.size}
                            color={node.style.color}
                            isInteractive={isInteractive}
                            onMouseEnter={onMouseEnter}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            onClick={onClick}
                            tooltip={tooltip}
                            blendMode={blendMode}
                        />
                    ))}
                </>
            )}
        </TransitionMotion>
    )
}

AnimatedNodes.propTypes = {
    nodes: PropTypes.arrayOf(NodePropType).isRequired,
    renderNode: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,

    blendMode: blendModePropType.isRequired,
}

export default memo(AnimatedNodes)
