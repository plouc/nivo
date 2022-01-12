import { useEffect, useRef, useCallback, createElement, useMemo } from 'react'
import { getRelativeCursor, isCursorInRect, useDimensions, useTheme, Container } from '@nivo/core'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { useTooltip } from '@nivo/tooltip'
import { renderContinuousColorLegendToCanvas } from '@nivo/legends'
import { renderAnnotationsToCanvas, useComputedAnnotations } from '@nivo/annotations'
import { useHeatMap, useCellAnnotations } from './hooks'
import { renderRect, renderCircle } from './canvas'
import { canvasDefaultProps } from './defaults'
import {
    CellCanvasRenderer,
    DefaultHeatMapDatum,
    HeatMapCanvasProps,
    HeatMapCommonProps,
    HeatMapDatum,
    CellShape,
    CustomLayerProps,
} from './types'

type InnerNetworkCanvasProps<Datum extends HeatMapDatum, ExtraProps extends object> = Omit<
    HeatMapCanvasProps<Datum, ExtraProps>,
    'renderWrapper' | 'theme'
>

const InnerHeatMapCanvas = <Datum extends HeatMapDatum, ExtraProps extends object>({
    data,
    layers = canvasDefaultProps.layers,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    xInnerPadding = canvasDefaultProps.xInnerPadding,
    xOuterPadding = canvasDefaultProps.xOuterPadding,
    yInnerPadding = canvasDefaultProps.yInnerPadding,
    yOuterPadding = canvasDefaultProps.yOuterPadding,
    forceSquare = canvasDefaultProps.forceSquare,
    sizeVariation = canvasDefaultProps.sizeVariation,
    renderCell: _renderCell = canvasDefaultProps.renderCell as CellShape,
    opacity = canvasDefaultProps.opacity,
    activeOpacity = canvasDefaultProps.activeOpacity,
    inactiveOpacity = canvasDefaultProps.inactiveOpacity,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor = canvasDefaultProps.borderColor as HeatMapCommonProps<Datum>['borderColor'],
    enableGridX = canvasDefaultProps.enableGridX,
    enableGridY = canvasDefaultProps.enableGridY,
    axisTop = canvasDefaultProps.axisTop,
    axisRight = canvasDefaultProps.axisRight,
    axisBottom = canvasDefaultProps.axisBottom,
    axisLeft = canvasDefaultProps.axisLeft,
    enableLabels = canvasDefaultProps.enableLabels,
    label = canvasDefaultProps.label as HeatMapCommonProps<Datum>['label'],
    labelTextColor = canvasDefaultProps.labelTextColor as HeatMapCommonProps<Datum>['labelTextColor'],
    colors = canvasDefaultProps.colors as HeatMapCommonProps<Datum>['colors'],
    emptyColor = canvasDefaultProps.emptyColor,
    legends = canvasDefaultProps.legends,
    annotations = canvasDefaultProps.annotations as HeatMapCommonProps<Datum>['annotations'],
    isInteractive = canvasDefaultProps.isInteractive,
    onClick,
    hoverTarget = canvasDefaultProps.hoverTarget,
    tooltip = canvasDefaultProps.tooltip as HeatMapCommonProps<Datum>['tooltip'],
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    pixelRatio = canvasDefaultProps.pixelRatio,
}: InnerNetworkCanvasProps<Datum, ExtraProps>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const {
        margin: _margin,
        innerWidth: _innerWidth,
        innerHeight: _innerHeight,
        outerWidth,
        outerHeight,
    } = useDimensions(width, height, partialMargin)

    const {
        width: innerWidth,
        height: innerHeight,
        offsetX,
        offsetY,
        xScale,
        yScale,
        cells,
        colorScale,
        activeCell,
        setActiveCell,
    } = useHeatMap<Datum, ExtraProps>({
        data,
        valueFormat,
        width: _innerWidth,
        height: _innerHeight,
        xInnerPadding,
        xOuterPadding,
        yInnerPadding,
        yOuterPadding,
        forceSquare,
        sizeVariation,
        colors,
        emptyColor,
        opacity,
        activeOpacity,
        inactiveOpacity,
        borderColor,
        label,
        labelTextColor,
        hoverTarget,
    })

    const margin = useMemo(
        () => ({
            ..._margin,
            top: _margin.top + offsetY,
            left: _margin.left + offsetX,
        }),
        [_margin, offsetX, offsetY]
    )

    const boundAnnotations = useCellAnnotations(cells, annotations)
    const computedAnnotations = useComputedAnnotations({
        annotations: boundAnnotations,
    })

    let renderCell: CellCanvasRenderer<Datum>
    if (typeof _renderCell === 'function') {
        renderCell = _renderCell
    } else if (_renderCell === 'circle') {
        renderCell = renderCircle
    } else {
        renderCell = renderRect
    }

    const theme = useTheme()

    const customLayerProps: CustomLayerProps<Datum> = useMemo(
        () => ({
            cells,
            activeCell,
            setActiveCell,
        }),
        [cells, activeCell, setActiveCell]
    )

    useEffect(() => {
        if (canvasEl.current === null) return

        const ctx = canvasEl.current.getContext('2d')
        if (!ctx) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top) // + offsetX, margin.top + offsetY)

        layers.forEach(layer => {
            if (layer === 'grid') {
                ctx.lineWidth = theme.grid.line.strokeWidth as number
                ctx.strokeStyle = theme.grid.line.stroke as string

                if (enableGridX) {
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: xScale,
                        axis: 'x',
                    })
                }
                if (enableGridY) {
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: yScale,
                        axis: 'y',
                    })
                }
            } else if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale,
                    yScale,
                    width: innerWidth, // - offsetX * 2,
                    height: innerHeight, // - offsetY * 2,
                    top: axisTop,
                    right: axisRight,
                    bottom: axisBottom,
                    left: axisLeft,
                    theme,
                })
            } else if (layer === 'cells') {
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'

                cells.forEach(cell => {
                    renderCell(ctx, { cell, borderWidth, enableLabels, theme })
                })
            } else if (layer === 'legends' && colorScale !== null) {
                legends.forEach(legend => {
                    renderContinuousColorLegendToCanvas(ctx, {
                        ...legend,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        scale: colorScale,
                        theme,
                    })
                })
            } else if (layer === 'annotations') {
                renderAnnotationsToCanvas(ctx, {
                    annotations: computedAnnotations,
                    theme,
                })
            } else if (typeof layer === 'function') {
                layer(ctx, customLayerProps)
            }
        })
    }, [
        canvasEl,
        pixelRatio,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        layers,
        customLayerProps,
        cells,
        renderCell,
        enableGridX,
        enableGridY,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        xScale,
        yScale,
        theme,
        borderWidth,
        enableLabels,
        colorScale,
        legends,
        computedAnnotations,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        event => {
            if (canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)

            const cell = cells.find(c =>
                isCursorInRect(
                    c.x + margin.left - c.width / 2, // + offsetX - c.width / 2,
                    c.y + margin.top - c.height / 2, //+ offsetY - c.height / 2,
                    c.width,
                    c.height,
                    x,
                    y
                )
            )
            if (cell !== undefined) {
                setActiveCell(cell)
                showTooltipFromEvent(createElement(tooltip, { cell }), event)
            } else {
                setActiveCell(null)
                hideTooltip()
            }
        },
        [
            canvasEl,
            cells,
            margin,
            // offsetX,
            // offsetY,
            setActiveCell,
            showTooltipFromEvent,
            hideTooltip,
            tooltip,
        ]
    )

    const handleMouseLeave = useCallback(() => {
        setActiveCell(null)
        hideTooltip()
    }, [setActiveCell, hideTooltip])

    const handleClick = useCallback(
        event => {
            if (activeCell === null) return

            onClick?.(activeCell, event)
        },
        [activeCell, onClick]
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

export const HeatMapCanvas = <
    Datum extends HeatMapDatum = DefaultHeatMapDatum,
    ExtraProps extends object = Record<string, never>
>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: HeatMapCanvasProps<Datum, ExtraProps>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerHeatMapCanvas<Datum, ExtraProps> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
