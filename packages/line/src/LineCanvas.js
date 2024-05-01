import { createElement, useRef, useEffect, useState, useCallback, forwardRef } from 'react'
import {
    withContainer,
    useDimensions,
    useTheme,
    getRelativeCursor,
    isCursorInRect,
} from '@nivo/core'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useVoronoiMesh, renderVoronoiToCanvas, renderVoronoiCellToCanvas } from '@nivo/voronoi'
import { useLine } from './hooks'
import PointTooltip from './PointTooltip'

const LineCanvas = props => {
    const canvasEl = useRef(null)
    const {
        width,
        height,
        margin: partialMargin,
        pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,

        data,
        xScale: xScaleSpec = { type: 'point' },
        xFormat,
        yScale: yScaleSpec = {
            type: 'linear',
            min: 0,
            max: 'auto',
        },
        yFormat,
        curve = 'linear',

        layers = [
            'grid',
            'markers',
            'axes',
            'areas',
            'crosshair',
            'lines',
            'points',
            'slices',
            'mesh',
            'legends',
        ],

        colors = { scheme: 'nivo' },
        lineWidth = 2,

        enableArea = false,
        areaBaselineValue = 0,
        areaOpacity = 0.2,

        enablePoints = true,
        pointSize = 6,
        pointColor = { from: 'color' },
        pointBorderWidth = 0,
        pointBorderColor = { theme: 'background' },

        enableGridX = true,
        gridXValues,
        enableGridY = true,
        gridYValues,
        axisTop,
        axisRight,
        axisBottom = {},
        axisLeft = {},

        legends = [],

        isInteractive = true,
        debugMesh = false,
        //onMouseEnter,
        //onMouseMove,
        onMouseLeave,
        onClick,
        tooltip = PointTooltip,
        canvasRef,
    } = props
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const theme = useTheme()
    const [currentPoint, setCurrentPoint] = useState(null)

    const { lineGenerator, areaGenerator, series, xScale, yScale, points } = useLine({
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
        if (canvasRef) {
            canvasRef.current = canvasEl.current
        }

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

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
                    currentPoint,
                    setCurrentPoint,
                })
            }

            if (layer === 'grid' && theme.grid.line.strokeWidth > 0) {
                ctx.lineWidth = theme.grid.line.strokeWidth
                ctx.strokeStyle = theme.grid.line.stroke

                enableGridX &&
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: xScale,
                        axis: 'x',
                        values: gridXValues,
                    })

                enableGridY &&
                    renderGridLinesToCanvas(ctx, {
                        width: innerWidth,
                        height: innerHeight,
                        scale: yScale,
                        axis: 'y',
                        values: gridYValues,
                    })
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
                series.forEach(serie => {
                    ctx.strokeStyle = serie.color
                    ctx.lineWidth = lineWidth
                    ctx.beginPath()
                    lineGenerator(serie.data.map(d => d.position))
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

            if (layer === 'mesh' && debugMesh === true) {
                renderVoronoiToCanvas(ctx, voronoi)
                if (currentPoint) {
                    renderVoronoiCellToCanvas(ctx, voronoi, currentPoint.index)
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
        points,
        enablePoints,
        pointSize,
        currentPoint,
    ])

    const getPointFromMouseEvent = useCallback(
        event => {
            const [x, y] = getRelativeCursor(canvasEl.current, event)
            if (!isCursorInRect(margin.left, margin.top, innerWidth, innerHeight, x, y)) return null

            const pointIndex = delaunay.find(x - margin.left, y - margin.top)
            return points[pointIndex]
        },
        [canvasEl, margin, innerWidth, innerHeight, delaunay]
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        event => {
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
        event => {
            hideTooltip()
            setCurrentPoint(null)
            currentPoint && onMouseLeave && onMouseLeave(currentPoint, event)
        },
        [hideTooltip, setCurrentPoint, onMouseLeave]
    )

    const handleClick = useCallback(
        event => {
            if (onClick) {
                const point = getPointFromMouseEvent(event)
                point && onClick(point, event)
            }
        },
        [getPointFromMouseEvent, onClick]
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
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

const LineCanvasWithContainer = withContainer(LineCanvas)

export default forwardRef((props, ref) => <LineCanvasWithContainer {...props} canvasRef={ref} />)
