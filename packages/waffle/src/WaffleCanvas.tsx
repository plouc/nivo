/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, {
    ComponentProps,
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    MouseEvent,
} from 'react'
import {
    Container,
    withContainer,
    useDimensions,
    useTheme,
    getRelativeCursor,
    isCursorInRect,
} from '@nivo/core'
import { InheritedColor, OrdinalColorScale } from '@nivo/colors'
import { renderLegendToCanvas, LegendProp } from '@nivo/legends'
// import WaffleCellTooltip from './WaffleCellTooltip'
import { isWaffleDataCell, WaffleCell, WaffleDataCell } from './compute'
import { useWaffle, WaffleDatum, WaffleFillDirection, useMergedCellData } from './hooks'
import { waffleDefaults } from './Waffle'

const findCellUnderCursor = (
    cells: Array<WaffleCell | WaffleDataCell>,
    cellSize: number,
    origin: {
        x: number
        y: number
    },
    margin: {
        top: number
        right: number
        bottom: number
        left: number
    },
    x: number,
    y: number
) =>
    cells.find(cell =>
        isCursorInRect(
            cell.x + origin.x + margin.left,
            cell.y + origin.y + margin.top,
            cellSize,
            cellSize,
            x,
            y
        )
    )

export interface WaffleCanvasProps extends ComponentProps<typeof Container> {
    pixelRatio: number
    width: number
    height: number
    margin?: {
        top?: number
        right?: number
        bottom?: number
        left?: number
    }
    data: WaffleDatum[]
    total: number
    hiddenIds: Array<string | number>
    rows: number
    columns: number
    fillDirection?: WaffleFillDirection
    padding?: number
    colors?: OrdinalColorScale<WaffleDatum>
    emptyColor?: string
    emptyOpacity: number
    borderWidth?: number
    borderColor?: InheritedColor
    // tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // tooltip: PropTypes.func,
    cellComponent?: FunctionComponent<any>
    legends?: LegendProp[]
    onClick?: (cell: WaffleCell | WaffleDataCell, event: MouseEvent) => void
}

const WaffleCanvas = ({
    pixelRatio = 1,
    width,
    height,
    margin: partialMargin,
    data,
    total,
    hiddenIds,
    rows,
    columns,
    fillDirection,
    padding,
    colors,
    emptyColor,
    emptyOpacity = waffleDefaults.emptyOpacity,
    borderWidth = waffleDefaults.borderWidth,
    borderColor,
    legends = waffleDefaults.legends,
    isInteractive,
    onClick,
}: WaffleCanvasProps) => {
    const canvasEl = useRef<HTMLCanvasElement>(null)
    const { innerWidth, innerHeight, outerWidth, outerHeight, margin } = useDimensions(
        width,
        height,
        partialMargin
    )
    const theme = useTheme()

    const { grid, computedData, getBorderColor, legendData /*, setCurrentCell*/ } = useWaffle({
        width: innerWidth,
        height: innerHeight,
        data,
        total,
        hiddenIds,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const cells = useMergedCellData(grid.cells, computedData)

    useEffect(() => {
        if (canvasEl.current !== null) {
            canvasEl.current.width = outerWidth * pixelRatio
            canvasEl.current.height = outerHeight * pixelRatio

            const ctx = canvasEl.current.getContext('2d') as CanvasRenderingContext2D

            ctx.scale(pixelRatio, pixelRatio)
            ctx.fillStyle = theme.background
            ctx.fillRect(0, 0, outerWidth, outerHeight)
            ctx.translate(margin.left, margin.top)

            cells.forEach(cell => {
                ctx.save()
                ctx.globalAlpha = isWaffleDataCell(cell) ? 1 : emptyOpacity

                ctx.fillStyle = cell.color
                ctx.fillRect(
                    cell.x + grid.origin.x,
                    cell.y + grid.origin.y,
                    grid.cellSize,
                    grid.cellSize
                )

                if (borderWidth > 0) {
                    ctx.strokeStyle = getBorderColor(cell)
                    ctx.lineWidth = borderWidth
                    ctx.strokeRect(
                        cell.x + grid.origin.x,
                        cell.y + grid.origin.y,
                        grid.cellSize,
                        grid.cellSize
                    )
                }

                ctx.restore()
            })

            legends.forEach(legend => {
                renderLegendToCanvas(ctx, {
                    ...legend,
                    data: legendData,
                    containerWidth: width,
                    containerHeight: height,
                    theme,
                })
            })
        }
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin,
        pixelRatio,
        theme,
        grid,
        cells,
        emptyOpacity,
        borderWidth,
        getBorderColor,
        legends,
        legendData,
    ])

    /*
    handleMouseHover = (showTooltip, hideTooltip) => event => {
        const {
            isInteractive,
            margin,
            theme,
            cells,
            cellSize,
            origin,
            tooltipFormat,
            tooltip,
        } = this.props

        if (!isInteractive || !cells) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y)

        if (cell !== undefined && cell.data) {
            showTooltip(
                <WaffleCellTooltip
                    position={cell.position}
                    row={cell.row}
                    column={cell.column}
                    color={cell.color}
                    data={cell.data}
                    theme={theme}
                    tooltipFormat={tooltipFormat}
                    tooltip={tooltip}
                />,
                event
            )
        } else {
            hideTooltip()
        }
    }

    handleMouseLeave = hideTooltip => () => {
        if (this.props.isInteractive !== true) return

        hideTooltip()
    }

    handleClick = event => {
        const { isInteractive, margin, onClick, cells, cellSize, origin } = this.props

        if (!isInteractive || !cells) return

        const [x, y] = getRelativeCursor(this.surface, event)
        const cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y)
        if (cell !== undefined) onClick(cell, event)
    }
     */

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!isInteractive || !onClick) {
                return
            }

            const [x, y] = getRelativeCursor(canvasEl.current!, event)
            const cell = findCellUnderCursor(cells, grid.cellSize, grid.origin, margin, x, y)
            if (cell) {
                onClick(cell, event)
            }
        },
        [isInteractive, canvasEl, cells, grid.origin, grid.cellSize, margin]
    )

    return (
        <canvas
            ref={canvasEl}
            style={{
                width: outerWidth,
                height: outerHeight,
            }}
            // onMouseEnter={isInteractive ? handleMouseHover : undefined}
            // onMouseMove={isInteractive ? handleMouseHover : undefined}
            // onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

export default withContainer(WaffleCanvas)
