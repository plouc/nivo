import { createElement, MouseEvent, useCallback, useEffect, useRef } from 'react'
import {
    isCursorInRect,
    getRelativeCursor,
    Container,
    useDimensions,
    useTheme,
    Margin,
} from '@nivo/core'
import { roundedRect } from '@nivo/canvas'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { renderLegendToCanvas } from '@nivo/legends'
import { CanvasProps, Datum, isDataCell, TooltipComponent, Cell } from './types'
import { canvasDefaultProps } from './defaults'
import { useWaffle } from './hooks'

const findCellUnderCursor = <D extends Datum>(
    cells: Cell<D>[],
    margin: Margin,
    x: number,
    y: number
) =>
    cells.find(cell =>
        isCursorInRect(margin.left + cell.x, margin.top + cell.y, cell.width, cell.height, x, y)
    )

type InnerWaffleCanvasProps<D extends Datum> = Omit<CanvasProps<D>, 'renderWrapper' | 'theme'>

const InnerWaffleCanvas = <D extends Datum>({
    width,
    height,
    margin: partialMargin,
    data,
    valueFormat,
    total,
    rows,
    columns,
    fillDirection = canvasDefaultProps.fillDirection,
    hiddenIds = canvasDefaultProps.hiddenIds,
    padding = canvasDefaultProps.padding,
    colors = canvasDefaultProps.colors as OrdinalColorScaleConfig<D>,
    emptyColor = canvasDefaultProps.emptyColor,
    emptyOpacity = canvasDefaultProps.emptyOpacity,
    borderRadius = canvasDefaultProps.borderRadius,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor = canvasDefaultProps.borderColor,
    isInteractive = canvasDefaultProps.isInteractive,
    onMouseMove,
    onClick,
    tooltip = canvasDefaultProps.tooltip as TooltipComponent<D>,
    forwardLegendData,
    legends = canvasDefaultProps.legends,
    role = canvasDefaultProps.role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    pixelRatio = canvasDefaultProps.pixelRatio,
}: InnerWaffleCanvasProps<D>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { cells, legendData } = useWaffle<D>({
        width: innerWidth,
        height: innerHeight,
        data,
        hiddenIds,
        valueFormat,
        total,
        rows,
        columns,
        fillDirection,
        colors,
        emptyColor,
        emptyOpacity,
        borderColor,
        forwardLegendData,
    })

    const theme = useTheme()

    useEffect(() => {
        if (canvasEl.current === null) return

        const ctx = canvasEl.current.getContext('2d')
        if (ctx === null) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        cells.forEach(cell => {
            ctx.save()

            ctx.fillStyle = cell.color
            ctx.globalAlpha = cell.opacity

            const x = cell.x + padding / 2
            const y = cell.y + padding / 2
            const cellWidth = cell.width - padding
            const cellHeight = cell.height - padding

            ctx.beginPath()
            roundedRect(ctx, x, y, cellWidth, cellHeight, borderRadius)
            ctx.fill()

            if (borderWidth > 0) {
                ctx.strokeStyle = cell.borderColor
                ctx.lineWidth = borderWidth

                ctx.beginPath()
                roundedRect(ctx, x, y, cellWidth, cellHeight, borderRadius)
                ctx.stroke()
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
    }, [
        canvasEl,
        margin,
        outerWidth,
        outerHeight,
        cells,
        padding,
        borderRadius,
        borderWidth,
        theme,
        width,
        height,
        pixelRatio,
        legends,
        legendData,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const cell = findCellUnderCursor(cells, margin, x, y)

            if (cell !== undefined && isDataCell(cell)) {
                showTooltipFromEvent(createElement(tooltip, { data: cell.data }), event, 'top')
                onMouseMove?.(cell.data, event)
            } else {
                hideTooltip()
            }
        },
        [canvasEl, cells, margin, showTooltipFromEvent, hideTooltip, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const handleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (!onClick || canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const cell = findCellUnderCursor(cells, margin, x, y)

            if (cell !== undefined && isDataCell(cell)) {
                onClick(cell.data, event)
            }
        },
        [canvasEl, cells, margin, onClick]
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
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
        />
    )
}

export const WaffleCanvas = <D extends Datum = Datum>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: CanvasProps<D>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerWaffleCanvas<D> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
