/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useCallback, useEffect, useRef } from 'react'
import {
    degreesToRadians,
    getRelativeCursor,
    isCursorInRect,
    withContainer,
    useDimensions,
    useTheme,
} from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { TreeMapCanvasPropTypes, TreeMapCanvasDefaultProps } from './props'
import { useTreeMap } from './hooks'
import TreeMapNodeTooltip from './TreeMapNodeTooltip'

const findNodeUnderCursor = (nodes, margin, x, y) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

const TreeMapCanvas = ({
    data,
    identity,
    value,
    tile,
    valueFormat,
    innerPadding,
    outerPadding,
    leavesOnly,
    width,
    height,
    margin: partialMargin,
    colors,
    colorBy,
    nodeOpacity,
    borderWidth,
    borderColor,
    enableLabel,
    label,
    labelTextColor,
    orientLabel,
    labelSkipSize,
    isInteractive,
    onMouseMove,
    onClick,
    tooltip,
    pixelRatio,
}) => {
    const canvasEl = useRef(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes } = useTreeMap({
        data,
        identity,
        value,
        valueFormat,
        leavesOnly,
        width: innerWidth,
        height: innerHeight,
        tile,
        innerPadding,
        outerPadding,
        colors,
        colorBy,
        nodeOpacity,
        borderColor,
        label,
        labelTextColor,
        orientLabel,
        enableParentLabel: false,
    })

    const theme = useTheme()

    useEffect(() => {
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        nodes.forEach(node => {
            ctx.fillStyle = node.color
            ctx.fillRect(node.x, node.y, node.width, node.height)

            if (borderWidth > 0) {
                ctx.strokeStyle = node.borderColor
                ctx.lineWidth = borderWidth
                ctx.strokeRect(node.x, node.y, node.width, node.height)
            }
        })

        if (enableLabel) {
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            nodes.forEach(node => {
                const showLabel =
                    node.isLeaf &&
                    (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

                if (!showLabel) return

                const rotate = orientLabel && node.height > node.width

                ctx.save()
                ctx.translate(node.x + node.width / 2, node.y + node.height / 2)
                ctx.rotate(degreesToRadians(rotate ? -90 : 0))

                ctx.fillStyle = node.labelTextColor
                ctx.fillText(node.label, 0, 0)

                ctx.restore()
            })
        }
    }, [
        canvasEl,
        nodes,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        borderWidth,
        enableLabel,
        orientLabel,
        labelSkipSize,
        theme,
        pixelRatio,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        event => {
            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const node = findNodeUnderCursor(nodes, margin, x, y)

            if (node !== undefined) {
                showTooltipFromEvent(
                    <TreeMapNodeTooltip node={node} tooltip={tooltip} />,
                    event,
                    'left'
                )
                onMouseMove && onMouseMove(node, event)
            } else {
                hideTooltip()
            }
        },
        [canvasEl, nodes, margin, showTooltipFromEvent, hideTooltip, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const handleClick = useCallback(
        event => {
            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const node = findNodeUnderCursor(nodes, margin, x, y)

            if (node === undefined) return

            onClick && onClick(node, event)
        },
        [canvasEl, nodes, margin, onClick]
    )

    return (
        <canvas
            ref={canvasEl}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
            }}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

TreeMapCanvas.propTypes = TreeMapCanvasPropTypes

const WrappedTreeMapCanvas = withContainer(TreeMapCanvas)
WrappedTreeMapCanvas.defaultProps = TreeMapCanvasDefaultProps

export default WrappedTreeMapCanvas
