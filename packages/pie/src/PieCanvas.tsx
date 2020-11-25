import React, { createElement, useEffect, useMemo, useRef } from 'react'
import {
    // @ts-ignore
    getHoveredArc,
    // @ts-ignore
    getRelativeCursor,
    // @ts-ignore
    textPropsByEngine,
    useDimensions,
    useTheme,
    // @ts-ignore
    withContainer,
    Theme,
} from '@nivo/core'
// @ts-ignore
import { renderLegendToCanvas } from '@nivo/legends'
import { useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { useNormalizedData, usePieFromBox, usePieRadialLabels, usePieSliceLabels } from './hooks'
import { ComputedDatum, PieCanvasProps, RadialLabelData, SliceLabelData } from './types'
import { defaultProps } from './props'

const drawSliceLabels = <RawDatum,>(
    ctx: CanvasRenderingContext2D,
    labels: SliceLabelData<RawDatum>[],
    theme: Theme
) => {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels!.text!.fontSize}px ${theme.labels!.text!.fontFamily}`

    labels.forEach(label => {
        ctx.save()
        ctx.translate(label.x, label.y)
        ctx.fillStyle = label.textColor
        ctx.fillText(`${label.label}`, 0, 0)
        ctx.restore()
    })
}

// prettier-ignore
const drawRadialLabels = <RawDatum, >(
    ctx: CanvasRenderingContext2D,
    labels: RadialLabelData<RawDatum>[],
    theme: Theme,
    linkStrokeWidth: number
) => {
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels!.text!.fontSize}px ${theme.labels!.text!.fontFamily}`

    labels.forEach(label => {
        ctx.save()
        ctx.translate(label.position.x, label.position.y)
        ctx.fillStyle = label.textColor
        ctx.textAlign = textPropsByEngine.canvas.align[label.align]
        ctx.fillText(`${label.text}`, 0, 0)
        ctx.restore()

        ctx.beginPath()
        ctx.strokeStyle = label.linkColor
        ctx.lineWidth = linkStrokeWidth
        label.line.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        })
        if (linkStrokeWidth > 0) ctx.stroke()
    })
}

// prettier-ignore
const PieCanvas = <RawDatum, >({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    sortByValue = defaultProps.sortByValue,

    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    fit = defaultProps.fit,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    cornerRadius = defaultProps.cornerRadius,

    width,
    height,
    margin: partialMargin,
    pixelRatio = 1,

    colors = defaultProps.colors,

    // border
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor as InheritedColorConfig<ComputedDatum<RawDatum>>,

    // radial labels
    radialLabel = defaultProps.radialLabel,
    enableRadialLabels = defaultProps.enableRadialLabels,
    radialLabelsSkipAngle = defaultProps.radialLabelsSkipAngle,
    radialLabelsLinkOffset = defaultProps.radialLabelsLinkOffset,
    radialLabelsLinkDiagonalLength = defaultProps.radialLabelsLinkDiagonalLength,
    radialLabelsLinkHorizontalLength = defaultProps.radialLabelsLinkHorizontalLength,
    radialLabelsLinkStrokeWidth = defaultProps.radialLabelsLinkStrokeWidth,
    radialLabelsTextXOffset = defaultProps.radialLabelsTextXOffset,
    radialLabelsTextColor = defaultProps.radialLabelsTextColor,
    radialLabelsLinkColor = defaultProps.radialLabelsLinkColor,

    // slices labels
    sliceLabel = defaultProps.sliceLabel,
    enableSliceLabels = defaultProps.enableSliceLabels,
    sliceLabelsSkipAngle = defaultProps.sliceLabelsSkipAngle,
    sliceLabelsTextColor = defaultProps.sliceLabelsTextColor,
    sliceLabelsRadiusOffset = defaultProps.sliceLabelsRadiusOffset,

    // interactivity
    isInteractive = defaultProps.isInteractive,
    onClick,
    onMouseMove,
    tooltip = defaultProps.tooltip,

    legends = defaultProps.legends,
}: PieCanvasProps<RawDatum>) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)
    const theme = useTheme()

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData<RawDatum>({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius } = usePieFromBox<RawDatum>({
        data: normalizedData,
        width: innerWidth,
        height: innerHeight,
        fit,
        innerRadius: innerRadiusRatio,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
        cornerRadius,
    })

    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)

    const radialLabels = usePieRadialLabels<RawDatum>({
        enable: enableRadialLabels,
        dataWithArc,
        label: radialLabel,
        textXOffset: radialLabelsTextXOffset,
        textColor: radialLabelsTextColor,
        radius,
        skipAngle: radialLabelsSkipAngle,
        linkOffset: radialLabelsLinkOffset,
        linkDiagonalLength: radialLabelsLinkDiagonalLength,
        linkHorizontalLength: radialLabelsLinkHorizontalLength,
        linkColor: radialLabelsLinkColor,
    })

    const sliceLabels = usePieSliceLabels<RawDatum>({
        enable: enableSliceLabels,
        dataWithArc,
        label: sliceLabel,
        radius,
        innerRadius,
        radiusOffset: sliceLabelsRadiusOffset,
        skipAngle: sliceLabelsSkipAngle,
        textColor: sliceLabelsTextColor,
    })

    useEffect(() => {
        if (!canvasEl.current) return

        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')!

        ctx.scale(pixelRatio, pixelRatio)

        ctx.fillStyle = theme.background
        ctx.fillRect(0, 0, outerWidth, outerHeight)

        ctx.save()
        ctx.translate(margin.left, margin.top);

        (arcGenerator as any).context(ctx)

        ctx.save()
        ctx.translate(centerX, centerY)

        dataWithArc.forEach(arc => {
            ctx.beginPath()
            ctx.fillStyle = arc.color

            ctx.strokeStyle = getBorderColor(arc)
            ctx.lineWidth = borderWidth

            arcGenerator(arc.arc)

            ctx.fill()

            if (borderWidth > 0) {
                ctx.stroke()
            }
        })

        if (enableRadialLabels === true) {
            drawRadialLabels(ctx, radialLabels, theme, radialLabelsLinkStrokeWidth)
        }

        if (enableSliceLabels === true) {
            drawSliceLabels(ctx, sliceLabels, theme)
        }

        // legends assume a box rather than a center,
        // that's why we restore previously saved position here.
        ctx.restore()
        legends.forEach(legend => {
            renderLegendToCanvas(ctx, {
                ...legend,
                data: dataWithArc,
                containerWidth: innerWidth,
                containerHeight: innerHeight,
                theme,
            })
        })
    }, [
        canvasEl,
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        margin.top,
        margin.left,
        pixelRatio,
        centerX,
        centerY,
        arcGenerator,
        dataWithArc,
        getBorderColor,
        enableRadialLabels,
        radialLabels,
        enableSliceLabels,
        sliceLabels,
        legends,
        theme,
    ])

    const arcs = useMemo(
        () =>
            dataWithArc.map(datum => ({
                id: datum.id,
                ...datum.arc,
            })),
        [dataWithArc]
    )

    const getArcFromMouse = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const [x, y] = getRelativeCursor(canvasEl.current, event)

        const hoveredArc = getHoveredArc(
            margin.left + centerX,
            margin.top + centerY,
            radius,
            innerRadius,
            arcs,
            x,
            y
        )

        if (!hoveredArc) return null

        return dataWithArc.find(datum => datum.id === hoveredArc.id)
    }

    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseHover = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const datum = getArcFromMouse(event)
        if (datum) {
            onMouseMove?.(datum, event)
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
        } else {
            hideTooltip()
        }
    }

    const handleMouseLeave = () => {
        hideTooltip()
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if (!onClick) return

        const arc = getArcFromMouse(event)
        if (arc) {
            onClick(arc, event)
        }
    }

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

export default withContainer(PieCanvas) as <RawDatum>(
    props: PieCanvasProps<RawDatum>
) => JSX.Element
