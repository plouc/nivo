import {
    useCallback,
    useEffect,
    useRef,
    createElement,
    MouseEvent,
    forwardRef,
    ReactElement,
    Ref,
} from 'react'
import { useDimensions, Container, mergeRefs, WithChartRef } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { InheritedColorConfig, OrdinalColorScaleConfig, useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { CirclePackingCanvasProps, ComputedDatum } from './types'
import { canvasDefaultProps } from './defaults'
import {
    useCirclePacking,
    useCirclePackingZoom,
    useCirclePackingLabels,
    useMouseCircleDetection,
} from './hooks'

type InnerCirclePackingCanvasProps<Datum> = Omit<
    CirclePackingCanvasProps<Datum>,
    'animate' | 'motionConfig'
> & {
    forwardedRef: Ref<HTMLCanvasElement>
}

const InnerCirclePackingCanvas = <Datum,>({
    data,
    id = canvasDefaultProps.id,
    value = canvasDefaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = canvasDefaultProps.padding,
    leavesOnly = canvasDefaultProps.leavesOnly,
    colors = canvasDefaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<Datum>, 'color' | 'fill'>
    >,
    colorBy = canvasDefaultProps.colorBy,
    inheritColorFromParent = canvasDefaultProps.inheritColorFromParent,
    childColor = canvasDefaultProps.childColor as InheritedColorConfig<ComputedDatum<Datum>>,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor = canvasDefaultProps.borderColor as InheritedColorConfig<ComputedDatum<Datum>>,
    enableLabels = canvasDefaultProps.enableLabels,
    label = canvasDefaultProps.label,
    labelsFilter,
    labelsSkipRadius = canvasDefaultProps.labelsSkipRadius,
    labelTextColor = canvasDefaultProps.labelTextColor as InheritedColorConfig<
        ComputedDatum<Datum>
    >,
    isInteractive = canvasDefaultProps.isInteractive,
    onMouseMove,
    onClick,
    tooltip = canvasDefaultProps.tooltip,
    zoomedId,
    role = canvasDefaultProps.role,
    pixelRatio = canvasDefaultProps.pixelRatio,
    forwardedRef,
}: InnerCirclePackingCanvasProps<Datum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const nodes = useCirclePacking<Datum>({
        data,
        id,
        value,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        padding,
        leavesOnly,
        colors,
        colorBy,
        inheritColorFromParent,
        childColor,
    })

    const zoomedNodes = useCirclePackingZoom<Datum>(nodes, zoomedId, innerWidth, innerHeight)

    const labels = useCirclePackingLabels({
        nodes: zoomedNodes,
        label,
        filter: labelsFilter,
        skipRadius: labelsSkipRadius,
        textColor: labelTextColor,
    })

    const getBorderColor = useInheritedColor<ComputedDatum<Datum>>(borderColor, theme)

    useEffect(() => {
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.save()
        ctx.translate(margin.left, margin.top)

        zoomedNodes.forEach(node => {
            if (borderWidth > 0) {
                ctx.strokeStyle = getBorderColor(node)
                ctx.lineWidth = borderWidth
            }

            ctx.beginPath()
            ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI)
            ctx.fillStyle = node.color
            ctx.fill()

            if (borderWidth > 0) {
                ctx.stroke()
            }
        })

        if (enableLabels) {
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            labels.forEach(label => {
                ctx.fillStyle = label.textColor
                ctx.fillText(`${label.label}`, label.node.x, label.node.y)
            })
        }
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin.top,
        margin.left,
        theme,
        pixelRatio,
        zoomedNodes,
        enableLabels,
        labels,
        borderWidth,
        getBorderColor,
    ])

    const getNodeFromMouseEvent = useMouseCircleDetection<Datum>({
        nodes: zoomedNodes,
        canvasEl,
        margin,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            const node = getNodeFromMouseEvent(event)
            if (node) {
                onMouseMove?.(node, event)
                showTooltipFromEvent(createElement(tooltip, node), event)
            } else {
                hideTooltip()
            }
        },
        [getNodeFromMouseEvent, showTooltipFromEvent, tooltip, hideTooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const handleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (!onClick) return

            const node = getNodeFromMouseEvent(event)
            if (node) {
                onClick(node, event)
            }
        },
        [getNodeFromMouseEvent, onClick]
    )

    return (
        <canvas
            ref={mergeRefs(canvasEl, forwardedRef)}
            width={outerWidth * pixelRatio}
            height={outerHeight * pixelRatio}
            style={{
                width: outerWidth,
                height: outerHeight,
                cursor: isInteractive ? 'auto' : 'normal',
            }}
            role={role}
            onMouseEnter={isInteractive ? handleMouseHover : undefined}
            onMouseMove={isInteractive ? handleMouseHover : undefined}
            onMouseLeave={isInteractive ? handleMouseLeave : undefined}
            onClick={isInteractive ? handleClick : undefined}
        />
    )
}

export const CirclePackingCanvas = forwardRef(
    <Datum,>(
        {
            isInteractive = canvasDefaultProps.isInteractive,
            theme,
            ...otherProps
        }: CirclePackingCanvasProps<Datum>,
        ref: Ref<HTMLCanvasElement>
    ) => (
        <Container isInteractive={isInteractive} theme={theme}>
            <InnerCirclePackingCanvas<Datum>
                isInteractive={isInteractive}
                {...otherProps}
                forwardedRef={ref}
            />
        </Container>
    )
) as <Datum>(
    props: WithChartRef<CirclePackingCanvasProps<Datum>, HTMLCanvasElement>
) => ReactElement
