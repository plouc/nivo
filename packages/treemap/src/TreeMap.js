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
import { Container, SvgWrapper } from '@nivo/core'
import { TreeMapPropTypes } from './props'
import enhance from './enhance'
import { nodeWillEnter, nodeWillLeave } from './motion'
import { getNodeHandlers } from './interactivity'

const TreeMap = ({
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
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper
                    width={outerWidth}
                    height={outerHeight}
                    margin={margin}
                    defs={defs}
                    theme={theme}
                >
                    {!animate && (
                        <g>
                            {nodes.map(node =>
                                React.createElement(nodeComponent, {
                                    key: node.path,
                                    node,
                                    style: {
                                        fill: node.fill,
                                        x: node.x0,
                                        y: node.y0,
                                        width: node.width,
                                        height: node.height,
                                        color: node.color,
                                        borderWidth,
                                        borderColor: getBorderColor(node),
                                        labelTextColor: getLabelTextColor(node),
                                        orientLabel,
                                    },
                                    handlers: getHandlers(node, showTooltip, hideTooltip),
                                    theme,
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
                                    x: spring(node.x, springConfig),
                                    y: spring(node.y, springConfig),
                                    width: spring(node.width, springConfig),
                                    height: spring(node.height, springConfig),
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
                                                orientLabel,
                                            },
                                            handlers: getHandlers(node, showTooltip, hideTooltip),
                                            theme,
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

TreeMap.propTypes = TreeMapPropTypes
TreeMap.displayName = 'TreeMap'

const enhancedTreeMap = enhance(TreeMap)
enhancedTreeMap.displayName = 'TreeMap'

export default enhancedTreeMap
