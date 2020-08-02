/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
/* eslint-disable react/prop-types */
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import pick from 'lodash/pick'
import { Container } from '@nivo/core'
import { interpolateColor, getInterpolatedColor } from '@nivo/colors'
import enhance from './enhance'
import { nodeWillEnter, nodeWillLeave } from './motion'
import { getNodeHandlers } from './interactivity'

const BubbleHtml = ({
    nodes,
    nodeComponent,

    margin,
    outerWidth,
    outerHeight,

    theme,
    borderWidth,
    getBorderColor,

    getLabelTextColor,

    animate,
    motionStiffness,
    motionDamping,

    isInteractive,
    onClick,
    isZoomable,
    zoomToNode,
    tooltipFormat,
    tooltip,
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
            tooltip,
        })

    return (
        <Container
            isInteractive={isInteractive}
            theme={theme}
            animate={animate}
            motionStiffness={motionStiffness}
            motionDamping={motionDamping}
        >
            {({ showTooltip, hideTooltip }) => (
                <div
                    style={{
                        position: 'relative',
                        width: outerWidth,
                        height: outerHeight,
                    }}
                >
                    {!animate && (
                        <div style={{ position: 'absolute', top: margin.top, left: margin.left }}>
                            {nodes.map(node =>
                                React.createElement(nodeComponent, {
                                    key: node.path,
                                    node,
                                    style: {
                                        ...pick(node, ['scale', 'r', 'x', 'y', 'color']),
                                        borderWidth,
                                        borderColor: getBorderColor(node),
                                        labelTextColor: getLabelTextColor(node),
                                    },
                                    handlers: getHandlers(node, showTooltip, hideTooltip),
                                })
                            )}
                        </div>
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
                                    ...interpolateColor(node.color, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: margin.top,
                                        left: margin.left,
                                    }}
                                >
                                    {interpolatedStyles.map(({ style, data: node }) => {
                                        style.color = getInterpolatedColor(style)

                                        return React.createElement(nodeComponent, {
                                            key: node.path,
                                            node,
                                            style: {
                                                ...style,
                                                borderWidth,
                                                borderColor: getBorderColor(style),
                                                labelTextColor: getLabelTextColor(style),
                                            },
                                            handlers: getHandlers(node, showTooltip, hideTooltip),
                                        })
                                    })}
                                </div>
                            )}
                        </TransitionMotion>
                    )}
                </div>
            )}
        </Container>
    )
}

BubbleHtml.displayName = 'BubbleHtml'

const enhancedBubbleHtml = enhance(BubbleHtml)
enhancedBubbleHtml.displayName = 'BubbleHtml'

export default enhancedBubbleHtml
