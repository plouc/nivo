import { createElement, useRef, useEffect, useCallback, MouseEvent } from 'react'
import {
    useDimensions,
    // @ts-ignore
    midAngle,
    // @ts-ignore
    getPolarLabelProps,
    degreesToRadians,
    getRelativeCursor,
    Margin,
    Container,
} from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { findArcUnderCursor } from '@nivo/arcs'
import { useInheritedColor } from '@nivo/colors'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { setCanvasFont, drawCanvasText } from '@nivo/text'
import { useChord, useChordSelection, useCustomLayerProps } from './hooks'
import { ArcDatum, ChordCanvasProps } from './types'
import { canvasDefaultProps } from './defaults'

const getArcFromMouseEvent = ({
    event,
    canvasEl,
    center,
    margin,
    radius,
    innerRadius,
    arcs,
}: {
    event: MouseEvent
    canvasEl: HTMLCanvasElement
    center: [number, number]
    margin: Margin
    radius: number
    innerRadius: number
    arcs: ArcDatum[]
}) => {
    const [x, y] = getRelativeCursor(canvasEl, event)
    const centerX = margin.left + center[0]
    const centerY = margin.top + center[1]

    return findArcUnderCursor(centerX, centerY, radius, innerRadius, arcs as any[], x, y)
}

type InnerChordCanvasProps = Omit<ChordCanvasProps, 'renderWrapper' | 'theme'>

const InnerChordCanvas = ({
    pixelRatio = canvasDefaultProps.pixelRatio,
    margin: partialMargin,
    data,
    keys,
    width,
    height,
    label = canvasDefaultProps.label,
    valueFormat,
    innerRadiusRatio = canvasDefaultProps.innerRadiusRatio,
    innerRadiusOffset = canvasDefaultProps.innerRadiusOffset,
    padAngle = canvasDefaultProps.padAngle,
    layers = canvasDefaultProps.layers,
    colors = canvasDefaultProps.colors,
    arcBorderWidth = canvasDefaultProps.arcBorderWidth,
    arcBorderColor = canvasDefaultProps.arcBorderColor,
    arcOpacity = canvasDefaultProps.arcOpacity,
    activeArcOpacity = canvasDefaultProps.activeArcOpacity,
    inactiveArcOpacity = canvasDefaultProps.inactiveArcOpacity,
    arcTooltip = canvasDefaultProps.arcTooltip,
    ribbonBorderWidth = canvasDefaultProps.ribbonBorderWidth,
    ribbonBorderColor = canvasDefaultProps.ribbonBorderColor,
    ribbonOpacity = canvasDefaultProps.ribbonOpacity,
    activeRibbonOpacity = canvasDefaultProps.activeRibbonOpacity,
    inactiveRibbonOpacity = canvasDefaultProps.inactiveRibbonOpacity,
    enableLabel = canvasDefaultProps.enableLabel,
    labelOffset = canvasDefaultProps.labelOffset,
    labelRotation = canvasDefaultProps.labelRotation,
    labelTextColor = canvasDefaultProps.labelTextColor,
    isInteractive = canvasDefaultProps.isInteractive,
    onArcMouseEnter,
    onArcMouseMove,
    onArcMouseLeave,
    onArcClick,
    legends = canvasDefaultProps.legends,
}: InnerChordCanvasProps) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    const { innerWidth, innerHeight, outerWidth, outerHeight, margin } = useDimensions(
        width,
        height,
        partialMargin
    )

    const { center, radius, innerRadius, arcGenerator, ribbonGenerator, arcs, ribbons } = useChord({
        data,
        keys,
        label,
        valueFormat,
        width: innerWidth,
        height: innerHeight,
        innerRadiusRatio,
        innerRadiusOffset,
        padAngle,
        colors,
    })

    const { currentArc, setCurrentArc, getArcOpacity, getRibbonOpacity } = useChordSelection({
        arcOpacity,
        activeArcOpacity,
        inactiveArcOpacity,
        ribbons,
        ribbonOpacity,
        activeRibbonOpacity,
        inactiveRibbonOpacity,
    })

    const theme = useTheme()
    const getLabelTextColor = useInheritedColor(labelTextColor, theme)
    const getArcBorderColor = useInheritedColor(arcBorderColor, theme)
    const getRibbonBorderColor = useInheritedColor(ribbonBorderColor, theme)

    const layerContext = useCustomLayerProps({
        center,
        radius,
        arcs,
        arcGenerator,
        ribbons,
        ribbonGenerator,
    })

    useEffect(() => {
        if (canvasEl.current === null) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        if (radius <= 0) return

        layers.forEach(layer => {
            if (layer === 'ribbons') {
                ctx.save()
                ctx.translate(margin.left + center[0], margin.top + center[1])

                ribbonGenerator.context(ctx)
                ribbons.forEach(ribbon => {
                    ctx.save()

                    ctx.globalAlpha = getRibbonOpacity(ribbon)
                    ctx.fillStyle = ribbon.source.color
                    ctx.beginPath()
                    ribbonGenerator(ribbon)
                    ctx.fill()

                    if (ribbonBorderWidth > 0) {
                        ctx.strokeStyle = getRibbonBorderColor(ribbon.source)
                        ctx.lineWidth = ribbonBorderWidth
                        ctx.stroke()
                    }

                    ctx.restore()
                })

                ctx.restore()
            }

            if (layer === 'arcs') {
                ctx.save()
                ctx.translate(margin.left + center[0], margin.top + center[1])

                arcGenerator.context(ctx)
                arcs.forEach(arc => {
                    ctx.save()

                    ctx.globalAlpha = getArcOpacity(arc)
                    ctx.fillStyle = arc.color
                    ctx.beginPath()
                    arcGenerator(arc)
                    ctx.fill()

                    if (arcBorderWidth > 0) {
                        ctx.strokeStyle = getArcBorderColor(arc)
                        ctx.lineWidth = arcBorderWidth
                        ctx.stroke()
                    }

                    ctx.restore()
                })

                ctx.restore()
            }

            if (layer === 'labels' && enableLabel === true) {
                ctx.save()
                ctx.translate(margin.left + center[0], margin.top + center[1])

                setCanvasFont(ctx, theme.labels.text)

                arcs.forEach(arc => {
                    const angle = midAngle(arc)
                    const props = getPolarLabelProps(radius + labelOffset, angle, labelRotation)

                    ctx.save()
                    ctx.translate(props.x, props.y)
                    ctx.rotate(degreesToRadians(props.rotate))

                    ctx.textAlign = props.align
                    ctx.textBaseline = props.baseline
                    drawCanvasText(
                        ctx,
                        {
                            ...theme.labels.text,
                            fill: getLabelTextColor(arc),
                        },
                        arc.label
                    )

                    ctx.restore()
                })

                ctx.restore()
            }

            if (layer === 'legends') {
                ctx.save()
                ctx.translate(margin.left, margin.top)

                const legendData = arcs.map(arc => ({
                    id: arc.id,
                    label: arc.label,
                    color: arc.color,
                }))

                legends.forEach(legend => {
                    renderLegendToCanvas(ctx, {
                        ...legend,
                        data: legendData,
                        containerWidth: innerWidth,
                        containerHeight: innerHeight,
                        theme,
                    })
                })

                ctx.restore()
            }

            if (typeof layer === 'function') {
                layer(ctx, layerContext)
            }
        })
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin,
        pixelRatio,
        center,
        radius,
        theme,
        layers,
        arcs,
        arcGenerator,
        getArcOpacity,
        arcBorderWidth,
        getArcBorderColor,
        ribbons,
        ribbonGenerator,
        getRibbonOpacity,
        ribbonBorderWidth,
        getRibbonBorderColor,
        enableLabel,
        labelOffset,
        labelRotation,
        getLabelTextColor,
        legends,
        layerContext,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (canvasEl.current === null) return

            const arc = getArcFromMouseEvent({
                event,
                canvasEl: canvasEl.current,
                center,
                margin,
                radius,
                innerRadius,
                arcs,
            })

            if (arc) {
                setCurrentArc(arc)
                showTooltipFromEvent(createElement(arcTooltip, { arc }), event)
                !currentArc && onArcMouseEnter && onArcMouseEnter(arc, event)
                onArcMouseMove && onArcMouseMove(arc, event)
                currentArc &&
                    currentArc.id !== arc.id &&
                    onArcMouseLeave &&
                    onArcMouseLeave(arc, event)
            } else {
                setCurrentArc(null)
                hideTooltip()
                currentArc && onArcMouseLeave && onArcMouseLeave(currentArc, event)
            }
        },
        [
            canvasEl,
            center,
            margin,
            radius,
            innerRadius,
            arcs,
            setCurrentArc,
            currentArc,
            showTooltipFromEvent,
            hideTooltip,
            arcTooltip,
            onArcMouseEnter,
            onArcMouseMove,
            onArcMouseLeave,
        ]
    )

    const handleMouseLeave = useCallback(() => {
        setCurrentArc(null)
        hideTooltip()
    }, [setCurrentArc, hideTooltip])

    const handleClick = useCallback(
        (event: MouseEvent<HTMLCanvasElement>) => {
            if (canvasEl.current === null || !onArcClick) return

            const arc = getArcFromMouseEvent({
                event,
                canvasEl: canvasEl.current,
                center,
                margin,
                radius,
                innerRadius,
                arcs,
            })

            arc && onArcClick(arc, event)
        },
        [canvasEl, center, margin, radius, innerRadius, arcs, onArcClick]
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

export const ChordCanvas = ({
    theme,
    isInteractive = canvasDefaultProps.isInteractive,
    animate = canvasDefaultProps.animate,
    motionConfig = canvasDefaultProps.motionConfig,
    renderWrapper,
    ...otherProps
}: ChordCanvasProps) => (
    <Container {...{ isInteractive, animate, motionConfig, theme, renderWrapper }}>
        <InnerChordCanvas isInteractive={isInteractive} {...otherProps} />
    </Container>
)
