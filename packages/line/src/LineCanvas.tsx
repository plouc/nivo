import {
    createElement,
    useRef,
    useEffect,
    useState,
    useCallback,
    forwardRef,
    ForwardedRef,
    MouseEvent,
    useMemo,
    ReactElement,
    Ref,
} from 'react'
import { useDimensions, getRelativeCursor, isCursorInRect, Container, mergeRefs } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { OrdinalColorScaleConfig, InheritedColorConfig } from '@nivo/colors'
import { useLine } from './hooks'
import {
    InferY,
    LineCanvasProps,
    LineLayerId,
    LineSeries,
    PointTooltipComponent,
    Point,
    LineCustomCanvasLayerProps,
    PointColorContext,
} from './types'
import { canvasDefaultProps } from './defaults'
import { AnyScale } from '@nivo/scales'

const InnerLineCanvas = <Series extends LineSeries>({
    width,
    height,
    margin: partialMargin,
    pixelRatio = canvasDefaultProps.pixelRatio,
    data,
    xScale: xScaleSpec = canvasDefaultProps.xScale,
    xFormat,
    yScale: yScaleSpec = canvasDefaultProps.yScale,
    yFormat,
    curve = canvasDefaultProps.curve,
    layers = canvasDefaultProps.layers as LineLayerId[],
    colors = canvasDefaultProps.colors as OrdinalColorScaleConfig<Series>,
    lineWidth = canvasDefaultProps.lineWidth,
    enableArea = canvasDefaultProps.enableArea,
    areaBaselineValue = canvasDefaultProps.areaBaselineValue as InferY<Series>,
    areaOpacity = canvasDefaultProps.areaOpacity,
    enablePoints = canvasDefaultProps.enablePoints,
    pointSize = canvasDefaultProps.pointSize,
    pointColor = canvasDefaultProps.pointColor as InheritedColorConfig<PointColorContext<Series>>,
    pointBorderWidth = canvasDefaultProps.pointBorderWidth,
    pointBorderColor = canvasDefaultProps.pointBorderColor as InheritedColorConfig<
        Omit<Point<Series>, 'borderColor'>
    >,
    enableGridX = canvasDefaultProps.enableGridX,
    gridXValues,
    enableGridY = canvasDefaultProps.enableGridY,
    gridYValues,
    axisTop,
    axisRight,
    axisBottom = canvasDefaultProps.axisBottom,
    axisLeft = canvasDefaultProps.axisLeft,
    legends = canvasDefaultProps.legends,
    isInteractive = canvasDefaultProps.isInteractive,
    debugMesh = canvasDefaultProps.debugMesh,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    tooltip = canvasDefaultProps.tooltip as PointTooltipComponent<Series>,
    role,
    forwardedRef,
}: Omit<LineCanvasProps<Series>, 'renderWrapper' | 'theme'> & {
    forwardedRef: Ref<HTMLCanvasElement>
}) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const theme = useTheme()
    const [currentPoint, setCurrentPoint] = useState<Point<Series> | null>(null)

    const { lineGenerator, areaGenerator, series, xScale, yScale, points } = useLine<Series>({
        data,
        xScale: xScaleSpec,
        xFormat,
        yScale: yScaleSpec,
        yFormat,
        width: innerWidth,
        height: innerHeight,
        colors,
        curve,
        areaBaselineValue,
        pointColor,
        pointBorderColor,
    })

    const customLayerProps: LineCustomCanvasLayerProps<Series> = useMemo(
        () => ({
            innerWidth,
            innerHeight,
            series,
            points,
            xScale,
            yScale,
            lineWidth,
            lineGenerator,
            areaGenerator,
            currentPoint,
            setCurrentPoint,
        }),
        [
            innerWidth,
            innerHeight,
            series,
            points,
            xScale,
            yScale,
            lineWidth,
            lineGenerator,
            areaGenerator,
            currentPoint,
            setCurrentPoint,
        ]
    )

    const { delaunay, voronoi } = useVoronoiMesh({
        points,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
    })

    useEffect(() => {
        if (canvasEl.current === null) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (typeof layer === 'function') {
                layer(ctx, customLayerProps)
            }

            const gridLineWidth = theme.grid.line.strokeWidth ?? 0
            if (layer === 'grid' && typeof gridLineWidth !== 'string' && gridLineWidth > 0) {
                ctx.lineWidth = gridLineWidth
                ctx.strokeStyle = theme.grid.line.stroke as string

                if (enableGridX) {
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: xScale as AnyScale,
                        axis: 'x',
                        values: gridXValues,
                    })
                }

                if (enableGridY) {
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: yScale as AnyScale,
                        axis: 'y',
                        values: gridYValues,
                    })
                }
            }

            if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale: xScale as AnyScale,
                    yScale: yScale as AnyScale,
                    width: innerWidth,
                    height: innerHeight,
                    top: axisTop,
                    right: axisRight,
                    bottom: axisBottom,
                    left: axisLeft,
                    theme,
                })
            }

            if (layer === 'areas' && enableArea === true) {
                ctx.save()
                ctx.globalAlpha = areaOpacity

                areaGenerator.context(ctx)
                for (let i = series.length - 1; i >= 0; i--) {
                    ctx.fillStyle = series[i].color
                    ctx.beginPath()
                    areaGenerator(series[i].data.map(d => d.position))
                    ctx.fill()
                }

                ctx.restore()
            }

            if (layer === 'lines') {
                lineGenerator.context(ctx)
                series.forEach(seriesItem => {
                    ctx.strokeStyle = seriesItem.color
                    ctx.lineWidth = lineWidth
                    ctx.beginPath()
                    lineGenerator(seriesItem.data.map(d => d.position))
                    ctx.stroke()
                })
            }

            if (layer === 'points' && enablePoints === true && pointSize > 0) {
                points.forEach(point => {
                    ctx.fillStyle = point.color
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, pointSize / 2, 0, 2 * Math.PI)
                    ctx.fill()

                    if (pointBorderWidth > 0) {
                        ctx.strokeStyle = point.borderColor
                        ctx.lineWidth = pointBorderWidth
                        ctx.stroke()
                    }
                })
            }

            if (layer === 'mesh' && debugMesh === true && voronoi !== undefined) {
                renderVoronoiToCanvas(ctx, voronoi)
                if (currentPoint) {
                    renderVoronoiCellToCanvas(ctx, voronoi, currentPoint.absIndex)
                }
            }

            if (layer === 'legends') {
                const legendData = series
                    .map(serie => ({
                        id: serie.id,
                        label: serie.id,
                        color: serie.color,
                    }))
                    .reverse()

                legends.forEach(legend => {
                    renderLegendToCanvas(ctx, {
                        ...legend,
                        data: legend.data || legendData,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        theme,
                    })
                })
            }
        })
    }, [
        canvasEl,
        innerWidth,
        outerWidth,
        innerHeight,
        outerHeight,
        margin.left,
        margin.top,
        pixelRatio,
        layers,
        theme,
        lineGenerator,
        series,
        xScale,
        yScale,
        enableGridX,
        gridXValues,
        enableGridY,
        gridYValues,
        axisTop,
        axisRight,
        axisBottom,
        axisLeft,
        legends,
        points,
        enablePoints,
        pointSize,
        pointBorderWidth,
        currentPoint,
        customLayerProps,
        debugMesh,
        enableArea,
        areaGenerator,
        areaOpacity,
        lineWidth,
        voronoi,
    ])

    const getPointFromMouseEvent = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (!canvasEl.current) return null

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) return null

            const pointIndex = delaunay.find(x - margin.left, y - margin.top)
            return points[pointIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay, points]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            const point = getPointFromMouseEvent(event)
            setCurrentPoint(point)

            if (point) {
                showTooltipFromEvent(createElement(tooltip, { point }), event)
            } else {
                hideTooltip()
            }
        },
        [getPointFromMouseEvent, setCurrentPoint, showTooltipFromEvent, hideTooltip, tooltip]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            hideTooltip()
            setCurrentPoint(null)
            if (currentPoint) onMouseLeave?.(currentPoint, event)
        },
        [hideTooltip, setCurrentPoint, onMouseLeave, currentPoint]
    )

    const handleMouseDown = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (onMouseDown) {
                const point = getPointFromMouseEvent(event)
                if (point) onMouseDown(point, event)
            }
        },
        [getPointFromMouseEvent, onMouseDown]
    )

    const handleMouseUp = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (onMouseUp) {
                const point = getPointFromMouseEvent(event)
                if (point) onMouseUp(point, event)
            }
        },
        [getPointFromMouseEvent, onMouseUp]
    )

    const handleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (onClick) {
                const point = getPointFromMouseEvent(event)
                if (point) onClick(point, event)
            }
        },
        [getPointFromMouseEvent, onClick]
    )

    const handleDoubleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (onDoubleClick) {
                const point = getPointFromMouseEvent(event)
                if (point) onDoubleClick(point, event)
            }
        },
        [getPointFromMouseEvent, onDoubleClick]
    )

    return (
        <canvas
            ref={mergeRefs<HTMLCanvasElement>(canvasEl, forwardedRef)}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onMouseDown={isInteractive ? handleMouseDown : undefined}
            onMouseUp={isInteractive ? handleMouseUp : undefined}
            onClick={isInteractive ? handleClick : undefined}
            onDoubleClick={isInteractive ? handleDoubleClick : undefined}
            role={role}
        />
    )
}

export const LineCanvas = forwardRef(
    <Series extends LineSeries>(
        { isInteractive, renderWrapper, theme, ...props }: LineCanvasProps<Series>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <Container {...{ isInteractive, renderWrapper, theme }} animate={false}>
            <InnerLineCanvas<Series> {...props} forwardedRef={ref} />
        </Container>
    )
) as <Series extends LineSeries>(
    props: LineCanvasProps<Series> & {
        ref?: ForwardedRef<HTMLCanvasElement>
    }
) => ReactElement
