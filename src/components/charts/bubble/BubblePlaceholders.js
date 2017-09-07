/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { merge } from 'lodash'
import { TransitionMotion, spring } from 'react-motion'
import _ from 'lodash'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withStateHandlers from 'recompose/withStateHandlers'
import pure from 'recompose/pure'
import { pack } from 'd3-hierarchy'
import { withHierarchy, withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import noop from '../../../lib/noop'
import { computeNodePath } from '../../../lib/hierarchy'
import Container from '../Container'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { bubblePropTypes, bubbleDefaultProps } from './props'

const ignoreProps = [
    'borderWidth',
    'borderColor',
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
]

const nodeWillEnter = ({ data }) => ({
    scale: 0,
    r: 0,
    x: data.x,
    y: data.y,
    ...colorMotionSpring(data.color),
})

const nodeWillLeave = springConfig => ({ data }) => ({
    scale: spring(0, springConfig),
    r: spring(0, springConfig),
    x: spring(data.x, springConfig),
    y: spring(data.y, springConfig),
    ...colorMotionSpring(data.color, springConfig),
})

const computeZoom = (nodes, currentNodePath, width, height) => {
    const currentNode = nodes.find(({ path }) => path === currentNodePath)
    if (currentNode) {
        const ratio = Math.min(width, height) / (currentNode.r * 2)
        const offsetX = width / 2 - currentNode.x * ratio
        const offsetY = height / 2 - currentNode.y * ratio
        nodes.forEach(node => {
            node.r = node.r * ratio
            node.x = node.x * ratio + offsetX
            node.y = node.y * ratio + offsetY
        })
    }
}

const BubblePlaceholders = ({
    root,
    getIdentity,

    leavesOnly,
    namespace,

    pack,

    // dimensions
    width,
    height,
    margin,
    outerWidth,
    outerHeight,

    // theming
    theme,
    getColor,

    // motion
    animate,
    motionStiffness,
    motionDamping,

    // interactivity
    isInteractive,
    onClick,

    children,

    // zooming
    isZoomable,
    zoomToNode,
    currentNodePath,
}) => {
    // assign a unique id depending on node path to each node
    root.each(node => {
        node.id = getIdentity(node.data)
        node.path = computeNodePath(node, getIdentity)
    })

    pack(root)

    let nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(node => {
        node.color = getColor({ ...node.data, depth: node.depth })

        return node
    })

    if (currentNodePath) computeZoom(nodes, currentNodePath, width, height)

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
        containerProps.style = Object.assign({}, margin, {
            position: 'absolute',
        })
    }

    let nodeOnClick = noop
    if (isInteractive) {
        if (isZoomable) {
            nodeOnClick = node => () => {
                onClick(node)
                zoomToNode(node.path)
            }
        } else {
            nodeOnClick = node => () => onClick(node)
        }
    }

    if (!animate) {
        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) =>
                    React.createElement(
                        wrapperTag,
                        wrapperProps,
                        React.createElement(
                            containerTag,
                            containerProps,
                            children(
                                nodes.map(node => ({
                                    key: node.path,
                                    data: node,
                                    style: _.pick(node, ['scale', 'r', 'x', 'y', 'color']),
                                    onClick: nodeOnClick(node),
                                })),
                                { showTooltip, hideTooltip, theme }
                            )
                        )
                    )}
            </Container>
        )
    }

    const springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) =>
                React.createElement(
                    wrapperTag,
                    wrapperProps,
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
                        {interpolatedStyles =>
                            React.createElement(
                                containerTag,
                                containerProps,
                                children(
                                    interpolatedStyles.map(interpolatedStyle => {
                                        interpolatedStyle.style.color = getInterpolatedColor(
                                            interpolatedStyle.style
                                        )
                                        interpolatedStyle.onClick = nodeOnClick(
                                            interpolatedStyle.data
                                        )

                                        return interpolatedStyle
                                    }),
                                    { showTooltip, hideTooltip, theme }
                                )
                            )}
                    </TransitionMotion>
                )}
        </Container>
    )
}

BubblePlaceholders.propTypes = _.omit(bubblePropTypes, ignoreProps)

const enhance = compose(
    defaultProps(_.omit(bubbleDefaultProps, ignoreProps)),
    withHierarchy(),
    withDimensions(),
    withTheme(),
    withMotion(),
    withColors({ defaultColorBy: 'depth' }),
    withPropsOnChange(['identity'], ({ identity }) => ({
        getIdentity: getAccessorFor(identity),
    })),
    withPropsOnChange(['width', 'height', 'padding'], ({ width, height, padding }) => ({
        pack: pack()
            .size([width, height])
            .padding(padding),
    })),
    withStateHandlers(
        ({ currentNodePath = null }) => ({
            currentNodePath,
        }),
        {
            zoomToNode: ({ currentNodePath }) => path => {
                if (path === currentNodePath) return { currentNodePath: null }
                return { currentNodePath: path }
            },
        }
    ),
    pure
)

export default enhance(BubblePlaceholders)
