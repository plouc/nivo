import {
    BarCanvasCustomLayerProps,
    BarCanvasLayer,
    BarCanvasProps,
    BarCommonProps,
    BarDatum,
    ComputedBarDatum,
} from './types'
import {
    Container,
    Margin,
    TextStyle,
    getRelativeCursor,
    isCursorInRect,
    useDimensions,
    useTheme,
} from '@nivo/core'
import {
    ForwardedRef,
    createElement,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react'
import { canvasDefaultProps, defaultProps } from './props'
import {
    renderAnnotationsToCanvas,
    useAnnotations,
    useComputedAnnotations,
} from '@nivo/annotations'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useBar } from './hooks'
import {
    updateGreatestValueByIndex,
    updateNumberOfBarsByIndex,
    updateTotalsByIndex,
    updateTotalsPositivesByIndex,
} from './BarTotals'
import { AnyScale, ScaleBand } from '@nivo/scales'

type InnerBarCanvasProps<RawDatum extends BarDatum> = Omit<
    BarCanvasProps<RawDatum>,
    'renderWrapper' | 'theme'
> & {
    canvasRef: ForwardedRef<HTMLCanvasElement>
}

const findBarUnderCursor = <RawDatum,>(
    nodes: ComputedBarDatum<RawDatum>[],
    margin: Margin,
    x: number,
    y: number
) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

const isNumber = (value: unknown): value is number => typeof value === 'number'

function renderTotalsToCanvas<RawDatum extends BarDatum>(
    ctx: CanvasRenderingContext2D,
    bars: ComputedBarDatum<RawDatum>[],
    xScale: ScaleBand<string> | AnyScale,
    yScale: ScaleBand<string> | AnyScale,
    layout: BarCommonProps<RawDatum>['layout'] = defaultProps.layout,
    groupMode: BarCommonProps<RawDatum>['groupMode'] = defaultProps.groupMode,
    theme: TextStyle
) {
    if (bars.length === 0) return

    const totalsByIndex = new Map<string | number, number>()

    const barWidth = bars[0].width
    const barHeight = bars[0].height
    const yOffsetVertically = -10
    const xOffsetHorizontally = 20

    ctx.fillStyle = theme.fill
    ctx.font = `bold ${theme.fontSize}px sans-serif`
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    if (groupMode === 'stacked') {
        const totalsPositivesByIndex = new Map<string | number, number>()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateTotalsPositivesByIndex(totalsPositivesByIndex, indexValue, Number(value))
        })

        totalsPositivesByIndex.forEach((totalsPositive, indexValue) => {
            let xPosition: number
            let yPosition: number

            if (layout === 'vertical') {
                xPosition = xScale(indexValue)
                yPosition = yScale(totalsPositive)
            } else {
                xPosition = xScale(totalsPositive)
                yPosition = yScale(indexValue)
            }

            ctx.fillText(
                String(totalsByIndex.get(indexValue)),
                xPosition + (layout === 'vertical' ? barWidth / 2 : xOffsetHorizontally),
                yPosition + (layout === 'vertical' ? yOffsetVertically : barHeight / 2)
            )
        })
    }

    if (groupMode === 'grouped') {
        const greatestValueByIndex = new Map<string | number, number>()
        const numberOfBarsByIndex = new Map()

        bars.forEach(bar => {
            const { indexValue, value } = bar.data
            updateTotalsByIndex(totalsByIndex, indexValue, Number(value))
            updateGreatestValueByIndex(greatestValueByIndex, indexValue, Number(value))
            updateNumberOfBarsByIndex(numberOfBarsByIndex, indexValue)
        })

        greatestValueByIndex.forEach((greatestValue, indexValue) => {
            let xPosition: number
            let yPosition: number

            if (layout === 'vertical') {
                xPosition = xScale(indexValue)
                yPosition = yScale(greatestValue)
            } else {
                xPosition = xScale(greatestValue)
                yPosition = yScale(indexValue)
            }

            const indexBarsWidth = numberOfBarsByIndex.get(indexValue) * barWidth
            const indexBarsHeight = numberOfBarsByIndex.get(indexValue) * barHeight

            ctx.fillText(
                String(totalsByIndex.get(indexValue)),
                xPosition + (layout === 'vertical' ? indexBarsWidth / 2 : xOffsetHorizontally),
                yPosition + (layout === 'vertical' ? yOffsetVertically : indexBarsHeight / 2)
            )
        })
    }
}

const InnerBarCanvas = <RawDatum extends BarDatum>({
    data,
    indexBy,
    keys,

    margin: partialMargin,
    width,
    height,

    groupMode,
    layout,
    reverse,
    minValue,
    maxValue,

    valueScale,
    indexScale,

    padding,
    innerPadding,

    axisTop,
    axisRight,
    axisBottom = canvasDefaultProps.axisBottom,
    axisLeft = canvasDefaultProps.axisLeft,
    enableGridX = canvasDefaultProps.enableGridX,
    enableGridY = canvasDefaultProps.enableGridY,
    gridXValues,
    gridYValues,

    layers = canvasDefaultProps.layers as BarCanvasLayer<RawDatum>[],
    renderBar = (
        ctx,
        {
            bar: { color, height, width, x, y },

            borderColor,
            borderRadius,
            borderWidth,
            label,
            labelColor,
            shouldRenderLabel,
        }
    ) => {
        ctx.fillStyle = color

        if (borderWidth > 0) {
            ctx.strokeStyle = borderColor
            ctx.lineWidth = borderWidth
        }

        ctx.beginPath()

        if (borderRadius > 0) {
            const radius = Math.min(borderRadius, height)

            ctx.moveTo(x + radius, y)
            ctx.lineTo(x + width - radius, y)
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
            ctx.lineTo(x + width, y + height - radius)
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
            ctx.lineTo(x + radius, y + height)
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
            ctx.lineTo(x, y + radius)
            ctx.quadraticCurveTo(x, y, x + radius, y)
            ctx.closePath()
        } else {
            ctx.rect(x, y, width, height)
        }

        ctx.fill()

        if (borderWidth > 0) {
            ctx.stroke()
        }

        if (shouldRenderLabel) {
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center'
            ctx.fillStyle = labelColor
            ctx.fillText(label, x + width / 2, y + height / 2)
        }
    },

    enableLabel = canvasDefaultProps.enableLabel,
    label,
    labelSkipWidth = canvasDefaultProps.labelSkipWidth,
    labelSkipHeight = canvasDefaultProps.labelSkipHeight,
    labelTextColor,

    colorBy,
    colors,
    borderRadius = canvasDefaultProps.borderRadius,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor,

    annotations = canvasDefaultProps.annotations,

    legendLabel,
    tooltipLabel,

    valueFormat,

    isInteractive = canvasDefaultProps.isInteractive,
    tooltip = canvasDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends,

    pixelRatio = canvasDefaultProps.pixelRatio,

    canvasRef,

    enableTotals = canvasDefaultProps.enableTotals,
}: InnerBarCanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const theme = useTheme()
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const {
        bars,
        barsWithValue,
        xScale,
        yScale,
        getLabel,
        getTooltipLabel,
        getBorderColor,
        getLabelColor,
        shouldRenderBarLabel,
        legendsWithData,
    } = useBar<RawDatum>({
        indexBy,
        label,
        tooltipLabel,
        valueFormat,
        colors,
        colorBy,
        borderColor,
        labelTextColor,
        groupMode,
        layout,
        reverse,
        data,
        keys,
        minValue,
        maxValue,
        margin,
        width: innerWidth,
        height: innerHeight,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        enableLabel,
        labelSkipWidth,
        labelSkipHeight,
        legends,
        legendLabel,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    // Using any because return type isn't correct
    const boundAnnotations: any = useComputedAnnotations({
        annotations: useAnnotations({
            data: bars,
            annotations,
            getPosition: node => ({
                x: node.x,
                y: node.y,
            }),
            getDimensions: ({ width, height }) => ({
                width,
                height,
                size: Math.max(width, height),
            }),
        }),
    })

    // We use `any` here until we can figure out the best way to type xScale/yScale
    const layerContext: BarCanvasCustomLayerProps<RawDatum> = useMemo(
        () => ({
            borderRadius,
            borderWidth,
            isInteractive,
            isFocusable: false,
            labelSkipWidth,
            labelSkipHeight,
            margin,
            width,
            height,
            innerWidth,
            innerHeight,
            bars,
            legendData: legendsWithData,
            enableLabel,
            xScale,
            yScale,
            tooltip,
            getTooltipLabel,
            onClick,
            onMouseEnter,
            onMouseLeave,
        }),
        [
            borderRadius,
            borderWidth,
            isInteractive,
            labelSkipWidth,
            labelSkipHeight,
            margin,
            width,
            height,
            innerWidth,
            innerHeight,
            bars,
            legendsWithData,
            enableLabel,
            xScale,
            yScale,
            tooltip,
            getTooltipLabel,
            onClick,
            onMouseEnter,
            onMouseLeave,
        ]
    )

    useEffect(() => {
        const ctx = canvasEl.current?.getContext('2d')

        if (!canvasEl.current) return
        if (!ctx) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)
        ctx.translate(margin.left, margin.top)

        layers.forEach(layer => {
            if (layer === 'grid') {
                if (isNumber(theme.grid.line.strokeWidth) && theme.grid.line.strokeWidth > 0) {
                    ctx.lineWidth = theme.grid.line.strokeWidth
                    ctx.strokeStyle = theme.grid.line.stroke as string

                    if (enableGridX) {
                        renderGridLinesToCanvas<string | number>(ctx, {
                            width,
                            height,
                            scale: xScale,
                            axis: 'x',
                            values: gridXValues,
                        })
                    }

                    if (enableGridY) {
                        renderGridLinesToCanvas<string | number>(ctx, {
                            width,
                            height,
                            scale: yScale,
                            axis: 'y',
                            values: gridYValues,
                        })
                    }
                }
            } else if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale: xScale,
                    yScale: yScale,
                    width: innerWidth,
                    height: innerHeight,
                    top: axisTop,
                    right: axisRight,
                    bottom: axisBottom,
                    left: axisLeft,
                    theme,
                })
            } else if (layer === 'bars') {
                barsWithValue.forEach(bar => {
                    renderBar(ctx, {
                        bar,
                        borderColor: getBorderColor(bar) as string,
                        borderRadius,
                        borderWidth,
                        label: getLabel(bar.data),
                        labelColor: getLabelColor(bar) as string,
                        shouldRenderLabel: shouldRenderBarLabel(bar),
                    })
                })
            } else if (layer === 'legends') {
                legendsWithData.forEach(([legend, data]) => {
                    renderLegendToCanvas(ctx, {
                        ...legend,
                        data,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        theme,
                    })
                })
            } else if (layer === 'annotations') {
                renderAnnotationsToCanvas(ctx, { annotations: boundAnnotations, theme })
            } else if (typeof layer === 'function') {
                layer(ctx, layerContext)
            }
        })

        if (enableTotals) {
            renderTotalsToCanvas(ctx, bars, xScale, yScale, layout, groupMode, theme.text)
        }

        ctx.save()
    }, [
        axisBottom,
        axisLeft,
        axisRight,
        axisTop,
        barsWithValue,
        borderRadius,
        borderWidth,
        boundAnnotations,
        enableGridX,
        enableGridY,
        getBorderColor,
        getLabel,
        getLabelColor,
        gridXValues,
        gridYValues,
        groupMode,
        height,
        innerHeight,
        innerWidth,
        layerContext,
        layers,
        layout,
        legendsWithData,
        margin.left,
        margin.top,
        outerHeight,
        outerWidth,
        pixelRatio,
        renderBar,
        xScale,
        yScale,
        reverse,
        shouldRenderBarLabel,
        theme,
        width,
        bars,
        enableTotals,
    ])

    const handleMouseHover = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!bars) return
            if (!canvasEl.current) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(bars, margin, x, y)

            if (bar !== undefined) {
                showTooltipFromEvent(
                    createElement(tooltip, {
                        ...bar.data,
                        color: bar.color,
                        label: bar.label,
                        value: Number(bar.data.value),
                    }),
                    event
                )

                if (event.type === 'mouseenter') {
                    onMouseEnter?.(bar.data, event)
                }
            } else {
                hideTooltip()
            }
        },
        [hideTooltip, margin, onMouseEnter, bars, showTooltipFromEvent, tooltip]
    )

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!bars) return
            if (!canvasEl.current) return

            hideTooltip()

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(bars, margin, x, y)

            if (bar) {
                onMouseLeave?.(bar.data, event)
            }
        },
        [hideTooltip, margin, onMouseLeave, bars]
    )

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!bars) return
            if (!canvasEl.current) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(bars, margin, x, y)

            if (bar !== undefined) {
                onClick?.({ ...bar.data, color: bar.color }, event)
            }
        },
        [margin, onClick, bars]
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

export const BarCanvas = forwardRef(
    <RawDatum extends BarDatum>(
        { isInteractive, renderWrapper, theme, ...props }: BarCanvasProps<RawDatum>,
        ref: ForwardedRef<HTMLCanvasElement>
    ) => (
        <Container {...{ isInteractive, renderWrapper, theme }} animate={false}>
            <InnerBarCanvas<RawDatum> {...props} canvasRef={ref} />
        </Container>
    )
)
