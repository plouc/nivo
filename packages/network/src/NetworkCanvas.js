/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useRef, useEffect } from 'react'
import { withContainer, useDimensions, useTheme } from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { NetworkCanvasPropTypes, NetworkCanvasDefaultProps } from './props'
import { useNetwork, useNodeColor, useLinkThickness } from './hooks'

const NetworkCanvas = props => {
    const {
        width,
        height,
        margin: partialMargin,
        pixelRatio,

        nodes: rawNodes,
        links: rawLinks,

        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,

        layers,

        nodeColor,
        nodeBorderWidth,
        nodeBorderColor,

        linkThickness,
        linkColor,

        isInteractive,
    } = props

    const canvasEl = useRef(null)
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const [nodes, links] = useNetwork({
        nodes: rawNodes,
        links: rawLinks,
        linkDistance,
        repulsivity,
        distanceMin,
        distanceMax,
        iterations,
        center: [innerWidth / 2, innerHeight / 2],
    })

    const theme = useTheme()
    const getNodeColor = useNodeColor(nodeColor)
    const getBorderColor = useInheritedColor(nodeBorderColor, theme)
    const getLinkThickness = useLinkThickness(linkThickness)
    const getLinkColor = useInheritedColor(linkColor, theme)

    useEffect(() => {
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'links') {
                links.forEach(link => {
                    ctx.strokeStyle = getLinkColor(link)
                    ctx.lineWidth = getLinkThickness(link)
                    ctx.beginPath()
                    ctx.moveTo(link.source.x, link.source.y)
                    ctx.lineTo(link.target.x, link.target.y)
                    ctx.stroke()
                })
            } else if (layer === 'nodes') {
                nodes.forEach(node => {
                    ctx.fillStyle = getNodeColor(node)
                    ctx.beginPath()
                    ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
                    ctx.fill()

                    if (nodeBorderWidth > 0) {
                        ctx.strokeStyle = getBorderColor(node)
                        ctx.lineWidth = nodeBorderWidth
                        ctx.stroke()
                    }
                })
            } else if (typeof layer === 'function') {
                layer(ctx, {
                    ...props,
                    nodes,
                    links,
                })
            }
        })
    }, [
        canvasEl,
        outerWidth,
        outerHeight,
        layers,
        theme,
        nodes,
        links,
        getNodeColor,
        nodeBorderWidth,
        getBorderColor,
        getLinkThickness,
        getLinkColor,
    ])

    return (
        <canvas
            ref={canvasEl}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
        />
    )
}

NetworkCanvas.propTypes = NetworkCanvasPropTypes
NetworkCanvas.defaultProps = NetworkCanvasDefaultProps

export default withContainer(NetworkCanvas)
