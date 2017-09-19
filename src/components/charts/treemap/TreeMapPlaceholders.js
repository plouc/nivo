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
import { colorMotionSpring } from '../../../lib/colors'
import Container from '../Container'
import enhance from './enhance'

const nodeWillEnter = ({ data: node }) => {
    const width = node.x1 - node.x0
    const height = node.y1 - node.y0

    return {
        x: node.x0 + width / 2,
        y: node.y0 + height / 2,
        width: 0,
        height: 0,
        ...colorMotionSpring(node.color),
    }
}

const TreeMapPlaceholders = ({
    root,
    getIdentity,

    namespace,

    margin,
    outerWidth,
    outerHeight,

    treemap,
    leavesOnly,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // theming
    theme,
    getColor,

    // interactivity
    isInteractive,

    children,
}) => {
    let wrapperTag
    let containerTag

    const wrapperProps = {}
    const containerProps = {}

    if (namespace === 'svg') {
        wrapperTag = 'svg'
        containerTag = 'g'

        wrapperProps.width = outerWidth
        wrapperProps.height = outerHeight
        wrapperProps.xmlns = 'http://www.w3.org/2000/svg'
        containerProps.transform = `translate(${margin.left},${margin.top})`
    } else {
        wrapperTag = 'div'
        containerTag = 'div'

        wrapperProps.style = {
            position: 'relative',
            width: outerWidth,
            height: outerHeight,
        }
        containerProps.style = {
            position: 'absolute',
            top: margin.top,
            left: margin.left,
        }
    }

    treemap(root)

    let nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(d => {
        d.color = getColor({ ...d.data, depth: d.depth })

        d.data.id = getIdentity(d.data)
        d.data.value = d.value
        d.data.color = d.color
        d.data.key = d
            .ancestors()
            .map(a => getIdentity(a.data))
            .join('.')

        return d
    })

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => {
                if (animate === false) {
                    return React.createElement(
                        wrapperTag,
                        wrapperProps,
                        React.createElement(
                            containerTag,
                            containerProps,
                            children(
                                nodes.map(node => {
                                    return {
                                        key: node.data.key,
                                        data: node.data,
                                        style: {
                                            x: node.x0,
                                            y: node.y0,
                                            width: node.x1 - node.x0,
                                            height: node.y1 - node.y0,
                                            color: node.color,
                                        },
                                    }
                                }),
                                { showTooltip, hideTooltip, theme }
                            )
                        )
                    )
                }

                const springConfig = {
                    stiffness: motionStiffness,
                    damping: motionDamping,
                }

                return React.createElement(
                    wrapperTag,
                    wrapperProps,
                    <TransitionMotion
                        willEnter={nodeWillEnter}
                        styles={nodes.map(node => {
                            return {
                                key: node.data.key,
                                data: node.data,
                                style: {
                                    x: spring(node.x0, springConfig),
                                    y: spring(node.y0, springConfig),
                                    width: spring(node.x1 - node.x0, springConfig),
                                    height: spring(node.y1 - node.y0, springConfig),
                                    ...colorMotionSpring(node.color, springConfig),
                                },
                            }
                        })}
                    >
                        {interpolatedStyles =>
                            React.createElement(
                                containerTag,
                                containerProps,
                                children(
                                    interpolatedStyles.map(interpolatedStyle => {
                                        const {
                                            x,
                                            y,
                                            width,
                                            height,
                                            colorR,
                                            colorG,
                                            colorB,
                                        } = interpolatedStyle.style

                                        return {
                                            ...interpolatedStyle,
                                            style: {
                                                x,
                                                y,
                                                width: Math.max(0, width),
                                                height: Math.max(0, height),
                                                color: `rgb(${Math.round(colorR)},${Math.round(
                                                    colorG
                                                )},${Math.round(colorB)})`,
                                            },
                                        }
                                    }),
                                    { showTooltip, hideTooltip, theme }
                                )
                            )}
                    </TransitionMotion>
                )
            }}
        </Container>
    )
}

TreeMapPlaceholders.displayName = 'TreeMapPlaceholders'

export default enhance(TreeMapPlaceholders)
