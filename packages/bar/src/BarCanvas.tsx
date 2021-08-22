import { BarCanvasLayer, BarCanvasProps, BarDatum, ComputedBarDatum } from './types'
import {
    Container,
    Margin,
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
import { canvasDefaultProps } from './props'
import {
    renderAnnotationsToCanvas,
    useAnnotations,
    useComputedAnnotations,
} from '@nivo/annotations'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useBar } from './hooks'

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/ban-types
    function forwardRef<T, P = {}>(
        render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

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

    enableLabel,
    label,
    labelSkipWidth,
    labelSkipHeight,
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
    const layerContext: any = useMemo(
        () => ({
            borderRadius,
            borderWidth,
            enableLabel,
            isInteractive,
            labelSkipWidth,
            labelSkipHeight,
            onClick,
            onMouseEnter,
            onMouseLeave,
            getTooltipLabel,
            tooltip,
            margin,
            innerWidth,
            innerHeight,
            width,
            height,
            bars,
            xScale,
            yScale,
        }),
        [
            borderRadius,
            borderWidth,
            enableLabel,
            getTooltipLabel,
            height,
            innerHeight,
            innerWidth,
            isInteractive,
            labelSkipHeight,
            labelSkipWidth,
            margin,
            onClick,
            onMouseEnter,
            onMouseLeave,
            bars,
            xScale,
            yScale,
            tooltip,
            width,
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
                            scale: xScale as any,
                            axis: 'x',
                            values: gridXValues,
                        })
                    }

                    if (enableGridY) {
                        renderGridLinesToCanvas<string | number>(ctx, {
                            width,
                            height,
                            scale: yScale as any,
                            axis: 'y',
                            values: gridYValues,
                        })
                    }
                }
            } else if (layer === 'axes') {
                renderAxesToCanvas(ctx, {
                    xScale: xScale as any,
                    yScale: yScale as any,
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
