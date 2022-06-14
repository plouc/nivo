import { createElement, useCallback, useEffect, useRef, MouseEvent } from 'react'
import {
    degreesToRadians,
    getRelativeCursor,
    isCursorInRect,
    Container,
    useDimensions,
    useTheme,
    Margin,
} from '@nivo/core'
import { useTooltip } from '@nivo/tooltip'
import { useTreeMap } from './hooks'
import { ComputedNode, DefaultTreeMapDatum, TreeMapCanvasProps, TreeMapCommonProps } from './types'
import { canvasDefaultProps } from './defaults'

const findNodeUnderCursor = <Datum extends object>(
    nodes: ComputedNode<Datum>[],
    margin: Margin,
    x: number,
    y: number
) =>
    nodes.find(node =>
        isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y)
    )

type InnerTreeMapCanvasProps<Datum extends object> = Omit<
    TreeMapCanvasProps<Datum>,
    'renderWrapper' | 'theme'
>

const InnerTreeMapCanvas = <Datum extends object>({
    data,
    identity = canvasDefaultProps.identity as TreeMapCommonProps<Datum>['identity'],
    value = canvasDefaultProps.identity as TreeMapCommonProps<Datum>['value'],
    tile = canvasDefaultProps.tile,
    valueFormat,
    innerPadding = canvasDefaultProps.innerPadding,
    outerPadding = canvasDefaultProps.outerPadding,
    leavesOnly = canvasDefaultProps.leavesOnly,
    width,
    height,
    margin: partialMargin,
    colors = canvasDefaultProps.colors as TreeMapCommonProps<Datum>['colors'],
    colorBy = canvasDefaultProps.colorBy as TreeMapCommonProps<Datum>['colorBy'],
    nodeOpacity = canvasDefaultProps.nodeOpacity,
    borderWidth = canvasDefaultProps.borderWidth,
    borderColor = canvasDefaultProps.borderColor as TreeMapCommonProps<Datum>['borderColor'],
    enableLabel = canvasDefaultProps.enableLabel,
    label = canvasDefaultProps.label as TreeMapCommonProps<Datum>['label'],
    labelTextColor = canvasDefaultProps.labelTextColor as TreeMapCommonProps<Datum>['labelTextColor'],
    orientLabel = canvasDefaultProps.orientLabel,
    labelSkipSize = canvasDefaultProps.labelSkipSize,
    isInteractive = canvasDefaultProps.isInteractive,
    onMouseMove,
    onClick,
    tooltip = canvasDefaultProps.tooltip as TreeMapCommonProps<Datum>['tooltip'],
    pixelRatio = canvasDefaultProps.pixelRatio,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}: InnerTreeMapCanvasProps<Datum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { nodes } = useTreeMap<Datum>({
        data,
        identity,
        value,
        valueFormat,
        leavesOnly,
        width: innerWidth,
        height: innerHeight,
        tile,
        innerPadding,
        outerPadding,
        colors,
        colorBy,
        nodeOpacity,
        borderColor,
        label,
        labelTextColor,
        orientLabel,
        enableParentLabel: false,
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

        nodes.forEach(node => {
            ctx.fillStyle = node.color
            ctx.fillRect(node.x, node.y, node.width, node.height)

            if (borderWidth > 0) {
                ctx.strokeStyle = node.borderColor
                ctx.lineWidth = borderWidth
                ctx.strokeRect(node.x, node.y, node.width, node.height)
            }
        })

        if (enableLabel) {
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

            nodes.forEach(node => {
                const showLabel =
                    node.isLeaf &&
                    (labelSkipSize === 0 || Math.min(node.width, node.height) > labelSkipSize)

                if (!showLabel) return

                const rotate = orientLabel && node.height > node.width

                ctx.save()
                ctx.translate(node.x + node.width / 2, node.y + node.height / 2)
                ctx.rotate(degreesToRadians(rotate ? -90 : 0))

                ctx.fillStyle = node.labelTextColor
                ctx.fillText(`${node.label}`, 0, 0)

                ctx.restore()
            })
        }
    }, [
        canvasEl,
        nodes,
        outerWidth,
        outerHeight,
        innerWidth,
        innerHeight,
        margin,
        borderWidth,
        enableLabel,
        orientLabel,
        labelSkipSize,
        theme,
        pixelRatio,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent) => {
            if (canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const node = findNodeUnderCursor(nodes, margin, x, y)

            if (node !== undefined) {
                showTooltipFromEvent(createElement(tooltip, { node }), event, 'left')
                onMouseMove?.(node, event)
            } else {
                hideTooltip()
            }
        },
        [canvasEl, nodes, margin, showTooltipFromEvent, hideTooltip, tooltip, onMouseMove]
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (canvasEl.current === null) return

            const [x, y] = getRelativeCursor(canvasEl.current, event)
            const node = findNodeUnderCursor(nodes, margin, x, y)

            if (node === undefined) return

            onClick?.(node, event)
        },
        [canvasEl, nodes, margin, onClick]
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

export const TreeMapCanvas = <Datum extends object = DefaultTreeMapDatum>({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: TreeMapCanvasProps<Datum>) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerTreeMapCanvas<Datum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
