import React, { useEffect, useRef, useCallback } from 'react'
import {
    // @ts-ignore
    withContainer,
    useDimensions,
    // @ts-ignore
    useTheme,
    // @ts-ignore
    isCursorInRect,
    // @ts-ignore
    getRelativeCursor,
} from '@nivo/core'
// @ts-ignore
import { renderLegendToCanvas } from '@nivo/legends'
import { Datum, DefaultRawDatum, CanvasProps, Cell } from './types'
import { defaultProps } from './props'
import { useWaffle, useMergeCellsData } from './hooks'

const findCellUnderCursor = <RawDatum extends Datum>(
    cells: Cell<RawDatum>[],
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

const WaffleCanvas = <RawDatum extends Datum = DefaultRawDatum>({
    width,
    height,
    margin: partialMargin,
    data,
    total,
    rows,
    columns,
    fillDirection = defaultProps.fillDirection,
    padding = defaultProps.padding,
    colors = defaultProps.colors,
    emptyColor = defaultProps.emptyColor,
    // emptyOpacity = defaultProps.emptyOpacity,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
    isInteractive = defaultProps.isInteractive,
    onClick,
    legends = defaultProps.legends,
    role = defaultProps.role,
    pixelRatio = defaultProps.pixelRatio,
}: CanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()

    const { outerWidth, outerHeight, margin, innerWidth, innerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { grid, computedData, legendData, getBorderColor } = useWaffle<RawDatum>({
        width: innerWidth,
        height: innerHeight,
        data,
        total,
        rows,
        columns,
        fillDirection,
        padding,
        colors,
        emptyColor,
        borderColor,
    })

    const mergedCells = useMergeCellsData<RawDatum>(grid.cells, computedData)

    useEffect(() => {
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.translate(margin.left, margin.top)

        mergedCells.forEach(cell => {
            ctx.save()
            //ctx.globalAlpha = isCell ? 1 : emptyOpacity

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
                containerWidth: outerWidth,
                containerHeight: outerHeight,
                theme,
            })
        })
    }, [
        canvasEl,
        pixelRatio,
        theme,
        outerWidth,
        outerHeight,
        margin,
        legends,
        legendData,
        mergedCells,
        grid,
        borderWidth,
        getBorderColor,
    ])

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!isInteractive || !onClick) {
                return
            }

            const [x, y] = getRelativeCursor(canvasEl.current!, event)
            const cell = findCellUnderCursor(mergedCells, grid.cellSize, grid.origin, margin, x, y)
            if (cell) {
                onClick(cell, event)
            }
        },
        [isInteractive, canvasEl, mergedCells, grid.origin, grid.cellSize, margin]
    )

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
            //onMouseEnter={isInteractive ? handleMouseHover : undefined}
            //onMouseMove={isInteractive ? handleMouseHover : undefined}
            //onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
            role={role}
        />
    )
}

export default withContainer(WaffleCanvas) as <RawDatum extends Datum = DefaultRawDatum>(
    props: CanvasProps<RawDatum>
) => JSX.Element

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
