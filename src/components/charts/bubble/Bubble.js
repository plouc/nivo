/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import pick from 'lodash/pick'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import Container from '../Container'
import enhance from './enhance'
import { nodeWillEnter, nodeWillLeave } from './motion'
import { getNodeHandlers } from './interactivity'
import SvgWrapper from '../SvgWrapper'

const Bubble = ({
    nodes,
    nodeComponent,

    // dimensions
    margin,
    outerWidth,
    outerHeight,

    // styling
    theme,
    borderWidth,
    getBorderColor,
    defs,

    // labels
    getLabelTextColor,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,
    tooltipFormat,
    isZoomable,
    zoomToNode,
}) => {
    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    const getHandlers = (node, showTooltip, hideTooltip) =>
        getNodeHandlers(node, {
            isInteractive,
            onClick,
            showTooltip,
            hideTooltip,
            isZoomable,
            zoomToNode,
            theme,
            tooltipFormat,
        })

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} defs={defs}>
                    {!animate && (
                        <g>
                            {nodes.map(node =>
                                React.createElement(nodeComponent, {
                                    key: node.path,
                                    node,
                                    style: {
                                        ...pick(node, ['scale', 'r', 'x', 'y', 'color']),
                                        fill: node.fill,
                                        borderWidth,
                                        borderColor: getBorderColor(node),
                                        labelTextColor: getLabelTextColor(node),
                                    },
                                    handlers: getHandlers(node, showTooltip, hideTooltip),
                                })
                            )}
                        </g>
                    )}
                    {animate && (
                        <TransitionMotion
                            willEnter={nodeWillEnter}
                            willLeave={nodeWillLeave(springConfig)}
                            styles={nodes.map(node => ({
                                key: node.path,
                                data: node,
                                style: {
                                    scale: spring(1, springConfig),
                                    r: spring(node.r, springConfig),
                                    x: spring(node.x, springConfig),
                                    y: spring(node.y, springConfig),
                                    opacity: spring(1, springConfig),
                                    ...colorMotionSpring(node.color, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ style, data: node }) => {
                                        style.color = getInterpolatedColor(style)

                                        return React.createElement(nodeComponent, {
                                            key: node.path,
                                            node,
                                            style: {
                                                ...style,
                                                fill: node.fill,
                                                borderWidth,
                                                borderColor: getBorderColor(style),
                                                labelTextColor: getLabelTextColor(style),
                                            },
                                            handlers: getHandlers(node, showTooltip, hideTooltip),
                                        })
                                    })}
                                </g>
                            )}
                        </TransitionMotion>
                    )}
                </SvgWrapper>
            )}
        </Container>
    )
}

Bubble.displayName = 'Bubble'

export default enhance(Bubble)
