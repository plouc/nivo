import React, { createElement, useEffect, useMemo, useRef } from 'react'
import {
    // @ts-ignore
    getRelativeCursor,
    useDimensions,
    useTheme,
    Container,
} from '@nivo/core'
// @ts-ignore
import { renderLegendToCanvas } from '@nivo/legends'
import { useInheritedColor, InheritedColorConfig } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import {
    Arc,
    findArcUnderCursor,
    useArcLabels,
    drawCanvasArcLabels,
    useArcLinkLabels,
    drawCanvasArcLinkLabels,
} from '@nivo/arcs'
import { useNormalizedData, usePieFromBox } from './hooks'
import { ComputedDatum, PieCanvasProps } from './types'
import { defaultProps } from './props'

const InnerPieCanvas = <RawDatum,>({
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
    activeInnerRadiusOffset = defaultProps.activeInnerRadiusOffset,
    activeOuterRadiusOffset = defaultProps.activeOuterRadiusOffset,

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

    const {
        dataWithArc,
        arcGenerator,
        centerX,
        centerY,
        radius,
        innerRadius,
        setActiveId,
    } = usePieFromBox<RawDatum>({
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
        activeInnerRadiusOffset,
        activeOuterRadiusOffset,
    })

    const getBorderColor = useInheritedColor<ComputedDatum<RawDatum>>(borderColor, theme)

    const radialLabels = useArcLinkLabels<ComputedDatum<RawDatum>>({
        data: dataWithArc,
        skipAngle: radialLabelsSkipAngle,
        offset: radialLabelsLinkOffset,
        diagonalLength: radialLabelsLinkDiagonalLength,
        straightLength: radialLabelsLinkHorizontalLength,
        label: radialLabel,
        linkColor: radialLabelsLinkColor,
        textOffset: radialLabelsTextXOffset,
        textColor: radialLabelsTextColor,
    })

    const sliceLabels = useArcLabels<ComputedDatum<RawDatum>>({
        data: dataWithArc,
        skipAngle: sliceLabelsSkipAngle,
        offset: sliceLabelsRadiusOffset,
        label: sliceLabel,
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
        ctx.translate(margin.left, margin.top)
        arcGenerator.context(ctx)

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
            drawCanvasArcLinkLabels<ComputedDatum<RawDatum>>(
                ctx,
                radialLabels,
                theme,
                radialLabelsLinkStrokeWidth
            )
        }

        if (enableSliceLabels === true) {
            drawCanvasArcLabels<ComputedDatum<RawDatum>>(ctx, sliceLabels, theme)
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

        const hoveredArc = findArcUnderCursor<Arc & { id: string | number }>(
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
            setActiveId(datum.id)
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
        } else {
            setActiveId(null)
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

export const PieCanvas = <RawDatum,>({
    isInteractive = defaultProps.isInteractive,
    theme,
    ...otherProps
}: PieCanvasProps<RawDatum>) => (
    <Container isInteractive={isInteractive} theme={theme}>
        <InnerPieCanvas<RawDatum> isInteractive={isInteractive} {...otherProps} />
    </Container>
)
