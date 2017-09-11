/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
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
import { computeNodePath } from '../../../lib/hierarchy'
import Container from '../Container'
import { getAccessorFor, getLabelGenerator } from '../../../lib/propertiesConverters'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { bubblePropTypes, bubbleDefaultProps } from './props'

const ignoreProps = [
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
]

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

class BubbleCanvas extends Component {
    componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    draw(props) {
        const {
            root,
            getIdentity,
            leavesOnly,

            pixelRatio,

            pack,

            // dimensions
            width,
            height,
            margin,
            outerWidth,
            outerHeight,

            // styling
            getColor,
            borderWidth,
            getBorderColor,

            // labels
            enableLabel,
            getLabel,
            labelSkipRadius,
            getLabelTextColor,
        } = props

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)

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

        this.ctx.translate(margin.left, margin.top)

        nodes.forEach(node => {
            this.ctx.save()

            if (borderWidth > 0) {
                this.ctx.strokeStyle = getBorderColor(node)
                this.ctx.lineWidth = borderWidth
            }

            this.ctx.beginPath()
            this.ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI)
            this.ctx.fillStyle = node.color
            this.ctx.fill()

            if (borderWidth > 0) {
                this.ctx.stroke()
            }
        })

        if (enableLabel) {
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'

            // draw labels on top
            nodes.filter(({ r }) => r > labelSkipRadius).forEach(node => {
                const label = getLabel(node)
                const labelTextColor = getLabelTextColor(node)

                this.ctx.fillStyle = labelTextColor
                this.ctx.fillText(label, node.x, node.y)
            })
        }
    }

    render() {
        const { outerWidth, outerHeight, pixelRatio, isInteractive, theme } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <canvas
                        ref={surface => {
                            this.surface = surface
                        }}
                        width={outerWidth * pixelRatio}
                        height={outerHeight * pixelRatio}
                        style={{
                            width: outerWidth,
                            height: outerHeight,
                        }}
                    />
                )}
            </Container>
        )
    }
}

/*
const BubbleCanvas = ({
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

    return null
}

BubbleCanvas.propTypes = _.omit(bubblePropTypes, ignoreProps)
*/

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
    withPropsOnChange(['label', 'labelFormat'], ({ label, labelFormat }) => ({
        getLabel: getLabelGenerator(label, labelFormat),
    })),
    withPropsOnChange(['borderColor'], ({ borderColor }) => ({
        getBorderColor: getInheritedColorGenerator(borderColor),
    })),
    withPropsOnChange(['labelTextColor'], ({ labelTextColor }) => ({
        getLabelTextColor: getInheritedColorGenerator(labelTextColor),
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

export default enhance(BubbleCanvas)
