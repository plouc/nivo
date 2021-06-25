import { BarCanvasProps, BarDatum, ComputedBarDatum } from './types'
import {
    Container,
    Margin,
    getRelativeCursor,
    isCursorInRect,
    useDimensions,
    usePropertyAccessor,
    useTheme,
    useValueFormatter,
} from '@nivo/core'
import {
    ForwardedRef,
    createElement,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { canvasDefaultProps } from './props'
import { generateGroupedBars, generateStackedBars, getLegendData } from './compute'
import { renderAxesToCanvas, renderGridLinesToCanvas } from '@nivo/axes'
import { renderLegendToCanvas } from '@nivo/legends'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'

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

const InnerBarCanvas = <RawDatum extends BarDatum>({
    data,
    indexBy = canvasDefaultProps.indexBy,
    keys = canvasDefaultProps.keys,

    margin: partialMargin,
    width,
    height,

    groupMode = canvasDefaultProps.groupMode,
    layout = canvasDefaultProps.layout,
    reverse = canvasDefaultProps.reverse,
    minValue = canvasDefaultProps.minValue,
    maxValue = canvasDefaultProps.maxValue,

    valueScale = canvasDefaultProps.valueScale,
    indexScale = canvasDefaultProps.indexScale,

    padding = canvasDefaultProps.padding,
    innerPadding = canvasDefaultProps.innerPadding,

    axisTop,
    axisRight,
    axisBottom = canvasDefaultProps.axisBottom,
    axisLeft = canvasDefaultProps.axisLeft,
    enableGridX = canvasDefaultProps.enableGridX,
    enableGridY = canvasDefaultProps.enableGridY,
    gridXValues,
    gridYValues,

    // barComponent = canvasDefaultProps.barComponent,

    // enableLabel = canvasDefaultProps.enableLabel,
    // label = canvasDefaultProps.label,
    // labelSkipWidth = canvasDefaultProps.labelSkipWidth,
    // labelSkipHeight = canvasDefaultProps.labelSkipHeight,
    // labelTextColor = canvasDefaultProps.labelTextColor,

    // markers,

    colorBy = canvasDefaultProps.colorBy,
    colors = canvasDefaultProps.colors,
    // borderRadius = canvasDefaultProps.borderRadius,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor = canvasDefaultProps.borderColor,

    // annotations = canvasDefaultProps.annotations,

    legendLabel,
    tooltipLabel = canvasDefaultProps.tooltipLabel,

    valueFormat,

    isInteractive = canvasDefaultProps.isInteractive,
    tooltip = canvasDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends = canvasDefaultProps.legends,

    pixelRatio = canvasDefaultProps.pixelRatio,

    canvasRef,
}: InnerBarCanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const [hiddenIds] = useState<string[]>([])
    // const toggleSerie = useCallback(id => {
    //     setHiddenIds(state =>
    //         state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
    //     )
    // }, [])

    const theme = useTheme()
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const formatValue = useValueFormatter(valueFormat)
    const getBorderColor = useInheritedColor<ComputedBarDatum<RawDatum>>(borderColor, theme)
    const getColor = useOrdinalColorScale(colors, colorBy)
    const getIndex = usePropertyAccessor(indexBy)
    // const getLabel = usePropertyAccessor(label)
    // const getLabelColor = useInheritedColor<ComputedBarDatum<RawDatum>>(labelTextColor, theme)
    const getTooltipLabel = usePropertyAccessor(tooltipLabel)

    const options = {
        layout,
        reverse,
        data,
        getIndex,
        keys,
        minValue,
        maxValue,
        width: innerWidth,
        height: innerHeight,
        getColor,
        padding,
        innerPadding,
        valueScale,
        indexScale,
        hiddenIds,
        formatValue,
    }

    const result =
        groupMode === 'grouped' ? generateGroupedBars(options) : generateStackedBars(options)

    const legendData = useMemo(
        () =>
            keys.map(key => {
                const bar = result.bars.find(bar => bar.data.id === key)

                return { ...bar, data: { id: key, ...bar?.data, hidden: hiddenIds.includes(key) } }
            }),
        [hiddenIds, keys, result.bars]
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

        if (theme.grid.line?.strokeWidth !== undefined) {
            ctx.lineWidth = theme.grid.line.strokeWidth as any
            ctx.strokeStyle = theme.grid.line.stroke as any

            if (enableGridX) {
                renderGridLinesToCanvas<string | number>(ctx, {
                    width,
                    height,
                    scale: result.xScale as any,
                    axis: 'x',
                    values: gridXValues,
                })
            }

            if (enableGridY) {
                renderGridLinesToCanvas<string | number>(ctx, {
                    width,
                    height,
                    scale: result.yScale as any,
                    axis: 'y',
                    values: gridYValues,
                })
            }
        }

        ctx.save()

        ctx.strokeStyle = '#dddddd'

        legends.forEach(legend => {
            const data = getLegendData({
                bars: legendData,
                direction: legend.direction,
                from: legend.dataFrom,
                groupMode,
                layout,
                legendLabel,
                reverse,
            })

            renderLegendToCanvas(ctx, {
                ...legend,
                data,
                containerWidth: innerWidth,
                containerHeight: innerHeight,
                theme,
            })
        })

        renderAxesToCanvas(ctx, {
            xScale: result.xScale as any,
            yScale: result.yScale as any,
            width: innerWidth,
            height: innerHeight,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
            theme,
        })

        result.bars.forEach(bar => {
            const { x, y, color, width, height } = bar

            ctx.fillStyle = color

            if (borderWidth > 0) {
                ctx.strokeStyle = getBorderColor(bar)
                ctx.lineWidth = borderWidth
            }

            ctx.beginPath()
            ctx.rect(x, y, width, height)
            ctx.fill()

            if (borderWidth > 0) {
                ctx.stroke()
            }
        })

        ctx.save()
    }, [
        axisBottom,
        axisLeft,
        axisRight,
        axisTop,
        borderWidth,
        enableGridX,
        enableGridY,
        getBorderColor,
        gridXValues,
        gridYValues,
        groupMode,
        height,
        innerHeight,
        innerWidth,
        layout,
        legendData,
        legendLabel,
        legends,
        margin.left,
        margin.top,
        outerHeight,
        outerWidth,
        pixelRatio,
        result.bars,
        result.xScale,
        result.yScale,
        reverse,
        theme,
        width,
    ])

    const handleMouseHover = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!result.bars) return
            if (!canvasEl.current) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(result.bars, margin, x, y)

            if (bar !== undefined) {
                showTooltipFromEvent(
                    createElement(tooltip, {
                        ...bar.data,
                        value: Number(bar.data.value),
                        color: bar.color,
                        getTooltipLabel,
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
        [
            getTooltipLabel,
            hideTooltip,
            margin,
            onMouseEnter,
            result.bars,
            showTooltipFromEvent,
            tooltip,
        ]
    )

    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!result.bars) return
            if (!canvasEl.current) return

            hideTooltip()

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(result.bars, margin, x, y)

            if (bar) {
                onMouseLeave?.(bar.data, event)
            }
        },
        [hideTooltip, margin, onMouseLeave, result.bars]
    )

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            if (!result.bars) return
            if (!canvasEl.current) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const bar = findBarUnderCursor(result.bars, margin, x, y)

            if (bar !== undefined) {
                onClick?.({ ...bar.data, color: bar.color }, event)
            }
        },
        [margin, onClick, result.bars]
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
            <InnerBarCanvas {...props} canvasRef={ref} />
        </Container>
    )
)
