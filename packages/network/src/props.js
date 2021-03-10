/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { motionPropTypes } from '@nivo/core'
import { inheritedColorPropType } from '@nivo/colors'
import Node from './Node'

const commonPropTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            source: PropTypes.string.isRequired,
            target: PropTypes.string.isRequired,
        })
    ).isRequired,

    layers: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.oneOf(['links', 'nodes']), PropTypes.func])
    ).isRequired,

    linkDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.number])
        .isRequired,
    repulsivity: PropTypes.number.isRequired,
    distanceMin: PropTypes.number.isRequired,
    distanceMax: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,

    nodeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    nodeBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    nodeBorderColor: inheritedColorPropType.isRequired,

    linkThickness: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
    linkColor: inheritedColorPropType.isRequired,

    isInteractive: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

export const NetworkPropTypes = {
    ...commonPropTypes,
    role: PropTypes.string.isRequired,
    nodeComponent: PropTypes.func.isRequired,
    ...motionPropTypes,
}

export const NetworkCanvasPropTypes = {
    pixelRatio: PropTypes.number.isRequired,
    renderNode: PropTypes.func.isRequired,
    ...commonPropTypes,
}

const commonDefaultProps = {
    layers: ['links', 'nodes'],

    linkDistance: 30,
    repulsivity: 10,
    distanceMin: 1,
    distanceMax: Infinity,
    iterations: 90,

    nodeBorderWidth: 0,
    nodeBorderColor: { from: 'color' },

    linkThickness: 1,
    linkColor: { from: 'source.color' },

    isInteractive: true,
}

export const NetworkDefaultProps = {
    ...commonDefaultProps,
    nodeComponent: Node,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    role: 'img',
}

const renderCanvasNode = (ctx, props) => {
    const { node, getNodeColor, getBorderColor, nodeBorderWidth } = props

    ctx.fillStyle = getNodeColor(node)
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
    ctx.fill()

    if (nodeBorderWidth > 0) {
        ctx.strokeStyle = getBorderColor(node)
        ctx.lineWidth = nodeBorderWidth
        ctx.stroke()
    }
}

export const NetworkCanvasDefaultProps = {
    ...commonDefaultProps,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    renderNode: renderCanvasNode,
}
