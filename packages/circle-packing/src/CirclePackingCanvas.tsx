import { useCallback, useEffect, useRef, createElement } from 'react'
import * as React from 'react'
import { useDimensions, useTheme, Container } from '@bitbloom/nivo-core'
import { InheritedColorConfig, OrdinalColorScaleConfig, useInheritedColor } from '@bitbloom/nivo-colors'
import { useTooltip } from '@bitbloom/nivo-tooltip'
import { CirclePackingCanvasProps, ComputedDatum } from './types'
import { defaultProps } from './props'
import {
    useCirclePacking,
    useCirclePackingZoom,
    useCirclePackingLabels,
    useMouseCircleDetection,
} from './hooks'

type InnerCirclePackingCanvasProps<RawDatum> = Partial<
    Omit<
        CirclePackingCanvasProps<RawDatum>,
        'data' | 'width' | 'height' | 'animate' | 'motionConfig'
    >
> &
    Pick<CirclePackingCanvasProps<RawDatum>, 'data' | 'width' | 'height'>

const InnerCirclePackingCanvas = <RawDatum,>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    width,
    height,
    margin: partialMargin,
    padding = defaultProps.padding,
    leavesOnly = defaultProps.leavesOnly,
    colors = defaultProps.colors as OrdinalColorScaleConfig<
        Omit<ComputedDatum<RawDatum>, 'color' | 'fill'>
    >,
    colorBy = defaultProps.colorBy,
    inheritColorFromParent = defaultProps.inheritColorFromParent,
    childColor = defaultProps.childColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    enableLabels = defaultProps.enableLabels,
    label = defaultProps.label,
    labelsFilter,
    labelsSkipRadius = defaultProps.labelsSkipRadius,
    labelTextColor = defaultProps.labelTextColor as InheritedColorConfig<ComputedDatum<RawDatum>>,
    isInteractive,
    onMouseMove,
    onClick,
    tooltip = defaultProps.tooltip,
    zoomedId,
    role = defaultProps.role,
    pixelRatio = defaultProps.pixelRatio,
}: InnerCirclePackingCanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const nodes = useCirclePacking<RawDatum>({
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

    const zoomedNodes = useCirclePackingZoom<RawDatum>(nodes, zoomedId, innerWidth, innerHeight)

    const labels = useCirclePackingLabels({
        nodes: zoomedNodes,
        label,
        filter: labelsFilter,
        skipRadius: labelsSkipRadius,
        textColor: labelTextColor,
    })

    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)

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

    const getNodeFromMouseEvent = useMouseCircleDetection<RawDatum>({
        nodes: zoomedNodes,
        canvasEl,
        margin,
    })

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
            const node = getNodeFromMouseEvent(event)
            if (node) {
                onMouseMove?.(node, event)
                showTooltipFromEvent(createElement(tooltip, node), event)
            } else {
                hideTooltip()
            }
        },
        [getNodeFromMouseEvent, showTooltipFromEvent, tooltip, hideTooltip]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLCanvasElement>) => {
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
            ref={canvasEl}
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

export const CirclePackingCanvas = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    theme,
    ...otherProps
}: Partial<Omit<CirclePackingCanvasProps<RawDatum>, 'data' | 'width' | 'height'>> &
    Pick<CirclePackingCanvasProps<RawDatum>, 'data' | 'width' | 'height'>) => (
    <Container isInteractive={isInteractive} theme={theme}>
        <InnerCirclePackingCanvas<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
