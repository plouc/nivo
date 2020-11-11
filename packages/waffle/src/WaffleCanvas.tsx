import React, { useEffect, useRef } from 'react'
// @ts-ignore
import { withContainer, useDimensions, useTheme } from '@nivo/core'
// @ts-ignore
import { renderLegendToCanvas } from '@nivo/legends'
import { Datum, DefaultRawDatum, CanvasProps } from './types'
import { defaultProps } from './props'
import { useWaffle, useMergeCellsData } from './hooks'

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
            //onMouseEnter={isInteractive ? handleMouseHover : undefined}
            //onMouseMove={isInteractive ? handleMouseHover : undefined}
            //onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            //onClick={isInteractive ? handleClick : undefined}
            role={role}
        />
    )
}

export default withContainer(WaffleCanvas) as <RawDatum extends Datum = DefaultRawDatum>(
    props: CanvasProps<RawDatum>
) => JSX.Element

/*
import React, { Component } from 'react'
import range from 'lodash.range'
import setDisplayName from 'recompose/setDisplayName'
import { isCursorInRect, getRelativeCursor, Container } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import enhance from './enhance'
import { WaffleCanvasPropTypes } from './props'
import WaffleCellTooltip from './WaffleCellTooltip'

const findCellUnderCursor = (cells, cellSize, origin, margin, x, y) =>
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

class WaffleCanvas extends Component {
    draw(props) {
        const {
            pixelRatio,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            getColor,
            emptyColor,
            emptyOpacity,
            borderWidth,
            getBorderColor,

            cells,
            cellSize,
            origin,
            computedData,
            legendData,

            legends,

            theme,
        } = props
    }

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
