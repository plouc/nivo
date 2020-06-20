/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useEffect, useRef, useCallback } from 'react'
import {
    getRelativeCursor,
    isCursorInRect,
    useDimensions,
    useTheme,
    withContainer,
} from '@nivo/core'
import { renderAxesToCanvas } from '@nivo/axes'
import { useTooltip } from '@nivo/tooltip'
import { useHeatMap } from './hooks'
import { HeatMapDefaultProps, HeatMapPropTypes } from './props'
import { renderRect, renderCircle } from './canvas'
import HeatMapCellTooltip from './HeatMapCellTooltip'

const HeatMapCanvas = ({
    data,
    keys,
    indexBy,
    minValue,
    maxValue,
    width,
    height,
    margin: partialMargin,
    forceSquare,
    padding,
    sizeVariation,
    cellShape,
    cellOpacity,
    cellBorderColor,
    axisTop,
    axisRight,
    axisBottom,
    axisLeft,
    enableLabels,
    labelTextColor,
    colors,
    nanColor,
    isInteractive,
    onClick,
    hoverTarget,
    cellHoverOpacity,
    cellHoverOthersOpacity,
    tooltipFormat,
    tooltip,
    pixelRatio,
}) => {
    const canvasEl = useRef(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { cells, xScale, yScale, offsetX, offsetY, currentCellId, setCurrentCellId } = useHeatMap(
        {
            data,
            keys,
            indexBy,
            minValue,
            maxValue,
            width: innerWidth,
            height: innerHeight,
            padding,
            forceSquare,
            sizeVariation,
            colors,
            nanColor,
            cellOpacity,
            cellBorderColor,
            labelTextColor,
            hoverTarget,
            cellHoverOpacity,
            cellHoverOthersOpacity,
        }
    )

    const theme = useTheme()

    useEffect(() => {
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left + offsetX, margin.top + offsetY)

        renderAxesToCanvas(ctx, {
            xScale,
            yScale,
            width: innerWidth - offsetX * 2,
            height: innerHeight - offsetY * 2,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        let renderCell
        if (cellShape === 'rect') {
            renderCell = renderRect
        } else {
            renderCell = renderCircle
        }
        cells.forEach(cell => {
            renderCell(ctx, { enableLabels, theme }, cell)
        })
    }, [
        canvasEl,
        cells,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        offsetX,
        offsetY,
        cellShape,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        theme,
        enableLabels,
        pixelRatio,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        event => {
            const [x, y] = getRelativeCursor(canvasEl.current, event)

            const cell = cells.find(c =>
                isCursorInRect(
                    c.x + margin.left + offsetX - c.width / 2,
                    c.y + margin.top + offsetY - c.height / 2,
                    c.width,
                    c.height,
                    x,
                    y
                )
            )
            if (cell !== undefined) {
                setCurrentCellId(cell.id)
                showTooltipFromEvent(
                    <HeatMapCellTooltip cell={cell} tooltip={tooltip} format={tooltipFormat} />,
                    event
                )
            } else {
                setCurrentCellId(null)
                hideTooltip()
            }
        },
        [
            canvasEl,
            cells,
            margin,
            offsetX,
            offsetY,
            setCurrentCellId,
            showTooltipFromEvent,
            hideTooltip,
            tooltip,
        ]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrentCellId(null)
        hideTooltip()
    }, [setCurrentCellId, hideTooltip])

    const handleClick = useCallback(
        event => {
            if (currentCellId === null) return

            const currentCell = cells.find(cell => cell.id === currentCellId)
            currentCell && onClick(currentCell, event)
        },
        [cells, currentCellId, onClick]
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

HeatMapCanvas.propTypes = HeatMapPropTypes

const WrappedHeatMapCanvas = withContainer(HeatMapCanvas)
WrappedHeatMapCanvas.defaultProps = HeatMapDefaultProps

export default WrappedHeatMapCanvas
