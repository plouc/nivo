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
import { colorMotionSpring, getInterpolatedColor } from '@nivo/core'
import { Container } from '@nivo/core'
import { TreeMapHtmlPropTypes } from './props'
import enhance from './enhance'
import { getNodeHandlers } from './interactivity'
import { nodeWillEnter, nodeWillLeave } from './motion'

const TreeMapHtml = ({
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

    // labels
    getLabelTextColor,
    orientLabel,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,
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
            theme,
            tooltipFormat,
            tooltip,
        })

    return (
        <Container theme={theme}>
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
                                        x: node.x,
                                        y: node.y,
                                        width: node.width,
                                        height: node.height,
                                        color: node.color,
                                        borderWidth,
                                        borderColor: getBorderColor(node),
                                        labelTextColor: getLabelTextColor(node),
                                        orientLabel,
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
                                    x: spring(node.x, springConfig),
                                    y: spring(node.y, springConfig),
                                    width: spring(node.width, springConfig),
                                    height: spring(node.height, springConfig),
                                    ...colorMotionSpring(node.color, springConfig),
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
                                                fill: node.fill,
                                                borderWidth,
                                                borderColor: getBorderColor(style),
                                                labelTextColor: getLabelTextColor(style),
                                                orientLabel,
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

TreeMapHtml.propTypes = TreeMapHtmlPropTypes
TreeMapHtml.displayName = 'TreeMapHtml'

const enhancedTreeMapHtml = enhance(TreeMapHtml)
enhancedTreeMapHtml.displayName = 'TreeMapHtml'

export default enhancedTreeMapHtml
