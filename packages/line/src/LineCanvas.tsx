import {
    createElement,
    useRef,
    useEffect,
    useState,
    useCallback,
    forwardRef,
    MouseEvent,
    ForwardedRef,
} from 'react'
import { useDimensions, useTheme, getRelativeCursor, isCursorInRect, Container } from '@nivo/core'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { useLine } from './hooks'
import { canvasDefaultProps } from './props'
import { LineCanvasProps, LineSeries, PointDatum } from './types'

const isNumber = (value: unknown): value is number => typeof value === 'number'

type InnerLineCanvasProps<Series extends LineSeries> = Omit<
    LineCanvasProps<Series>,
    'renderWrapper' | 'theme'
> & {
    canvasRef: ForwardedRef<HTMLCanvasElement>
}

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

    layers = canvasDefaultProps.layers,

    colors = canvasDefaultProps.colors,
    lineWidth = canvasDefaultProps.lineWidth,

    enableArea = canvasDefaultProps.enableArea,
    areaBaselineValue = canvasDefaultProps.areaBaselineValue as Exclude<
        Series['data'][0]['y'],
        null | undefined
    >,
    areaOpacity = canvasDefaultProps.areaOpacity,

    enablePoints = canvasDefaultProps.enablePoints,
    pointSize = canvasDefaultProps.pointSize,
    pointColor,
    pointBorderWidth = canvasDefaultProps.pointBorderWidth,
    pointBorderColor,

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
    //onMouseEnter,
    //onMouseMove,
    onMouseLeave,
    onClick,
    tooltip = canvasDefaultProps.tooltip,

    canvasRef,
}: InnerLineCanvasProps<Series>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const theme = useTheme()
    const [currentPoint, setCurrentPoint] = useState<PointDatum<Series['data'][0]> | null>(null)

    const { lineGenerator, areaGenerator, series, xScale, yScale, points, legendData } =
        useLine<Series>({
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

    const { delaunay, voronoi } = useVoronoiMesh({
        points,
        width: innerWidth,
        height: innerHeight,
        debug: debugMesh,
    })

    useEffect(() => {
        if (!canvasEl.current) return

        const ctx = canvasEl.current?.getContext('2d')
        if (!ctx) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (typeof layer === 'function') {
                layer({
                    ctx,
                    innerWidth,
                    innerHeight,
                    series,
                    points,
                    xScale,
                    yScale,
                    lineWidth,
                    lineGenerator,
                    areaGenerator,
                    // currentPoint,
                    // setCurrentPoint,
                })
            }

            if (layer === 'grid') {
                if (isNumber(theme.grid.line.strokeWidth) && theme.grid.line.strokeWidth > 0) {
                    ctx.lineWidth = theme.grid.line.strokeWidth
                    ctx.strokeStyle = theme.grid.line.stroke as string

                    if (enableGridX) {
                        renderGridLinesToCanvas(ctx, {
                            width: innerWidth,
                            height: innerHeight,
                            scale: xScale,
                            axis: 'x',
                            values: gridXValues,
                        })
                    }

                    if (enableGridY) {
                        renderGridLinesToCanvas(ctx, {
                            width: innerWidth,
                            height: innerHeight,
                            scale: yScale,
                            axis: 'y',
                            values: gridYValues,
                        })
                    }
                }
            }

            if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale,
                    yScale,
                    width: innerWidth,
                    height: innerHeight,
                    top: axisTop,
                    right: axisRight,
                    bottom: axisBottom,
                    left: axisLeft,
                    theme,
                })
            }

            if (layer === 'areas' && enableArea) {
                ctx.save()
                ctx.globalAlpha = areaOpacity

                areaGenerator.context(ctx)
                series.forEach(serie => {
                    ctx.fillStyle = serie.color
                    ctx.beginPath()
                    areaGenerator(serie.data.map(d => d.position))
                    ctx.fill()
                })

                ctx.restore()
            }

            if (layer === 'lines') {
                lineGenerator.context(ctx)
                series.forEach(serie => {
                    ctx.strokeStyle = serie.color
                    ctx.lineWidth = lineWidth
                    ctx.beginPath()
                    lineGenerator(serie.data.map(d => d.position))
                    ctx.stroke()
                })
            }

            if (layer === 'points' && enablePoints && pointSize > 0) {
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

            if (layer === 'mesh' && debugMesh && voronoi) {
                renderVoronoiToCanvas(ctx, voronoi)

                if (currentPoint) {
                    renderVoronoiCellToCanvas(ctx, voronoi, currentPoint.index)
                }
            }

            if (layer === 'legends') {
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
        outerWidth,
        outerHeight,
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
        legendData,
        points,
        enablePoints,
        pointSize,
        currentPoint,
    ])

    const getPointFromMouseEvent = useCallback(
        (event: MouseEvent) => {
            if (canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) return null

            const pointIndex = delaunay.find(x - margin.left, y - margin.top)
            return points[pointIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent) => {
            const point = getPointFromMouseEvent(event)
            setCurrentPoint(point || null)

            if (point) {
                showTooltipFromEvent(createElement(tooltip, { point }), event)
            } else {
                hideTooltip()
            }
        },
        [getPointFromMouseEvent, setCurrentPoint, showTooltipFromEvent, hideTooltip, tooltip]
    )

    const handleMouseLeave = useCallback(
        (event: MouseEvent) => {
            hideTooltip()
            setCurrentPoint(null)
            currentPoint && onMouseLeave && onMouseLeave(currentPoint, event)
        },
        [hideTooltip, setCurrentPoint, onMouseLeave]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (onClick) {
                const point = getPointFromMouseEvent(event)
                point && onClick(point, event)
            }
        },
        [getPointFromMouseEvent, onClick]
    )

    return (
        <canvas
            ref={canvas => {
                canvasEl.current = canvas
                if (canvasRef && 'current' in canvasRef) canvasRef.current = canvas
            }}
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
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

const LineCanvasWithRef = <Series extends LineSeries>(
    { isInteractive, renderWrapper, theme, ...innerProps }: LineCanvasProps<Series>,
    ref: ForwardedRef<HTMLCanvasElement>
) => (
    <Container {...{ isInteractive, renderWrapper, theme }} animate={false}>
        <InnerLineCanvas<Series> {...innerProps} canvasRef={ref} />
    </Container>
)

export const LineCanvas = forwardRef(LineCanvasWithRef) as <Series extends LineSeries>(
    props: LineCanvasProps<Series> & { ref?: ForwardedRef<HTMLCanvasElement> }
) => ReturnType<typeof LineCanvasWithRef>
