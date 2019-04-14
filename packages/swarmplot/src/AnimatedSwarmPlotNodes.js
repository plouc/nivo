/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'

const willEnter = ({ style }) => ({
    x: style.x.val,
    y: style.y.val,
    size: style.size.val,
    colorR: style.colorR.val,
    colorG: style.colorG.val,
    colorB: style.colorB.val,
    scale: 0,
})

const willLeave = springConfig => ({ style }) => ({
    x: style.x,
    y: style.y,
    size: style.size,
    colorR: style.colorR,
    colorG: style.colorG,
    colorB: style.colorB,
    scale: spring(0, springConfig),
})

const AnimatedSwarmPlotNodes = memo(
    ({
        nodes,
        renderNode,
        getBorderWidth,
        getBorderColor,
        motionStiffness,
        motionDamping,
        isInteractive,
        onMouseEnter,
        onMouseMove,
        onMouseLeave,
        onClick,
    }) => {
        const springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

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
                        size: spring(node.size, springConfig),
                        ...interpolateColor(node.color, springConfig),
                        scale: spring(1, springConfig),
                    },
                }))}
            >
                {interpolatedStyles => (
                    <>
                        {interpolatedStyles.map(({ key, style, data: node }) => {
                            const color = getInterpolatedColor(style)

                            return (
                                <Fragment key={key}>
                                    {renderNode({
                                        node,
                                        x: style.x,
                                        y: style.y,
                                        size: style.size,
                                        scale: style.scale,
                                        color,
                                        borderWidth: getBorderWidth(node),
                                        borderColor: getBorderColor(node),
                                        isInteractive,
                                        onMouseEnter,
                                        onMouseMove,
                                        onMouseLeave,
                                        onClick,
                                    })}
                                </Fragment>
                            )
                        })}
                    </>
                )}
            </TransitionMotion>
        )
    }
)

AnimatedSwarmPlotNodes.displayName = 'AnimatedSwarmPlotNodes'
AnimatedSwarmPlotNodes.propTypes = {
    nodes: PropTypes.array.isRequired,
    renderNode: PropTypes.func.isRequired,
    getBorderWidth: PropTypes.func.isRequired,
    getBorderColor: PropTypes.func.isRequired,
    motionStiffness: PropTypes.number.isRequired,
    motionDamping: PropTypes.number.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
}

export default AnimatedSwarmPlotNodes
