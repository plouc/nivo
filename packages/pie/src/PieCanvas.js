/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { createElement, useEffect, useMemo, useRef } from 'react'
import {
    getHoveredArc,
    getRelativeCursor,
    textPropsByEngine,
    useDimensions,
    useTheme,
    withContainer,
} from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { useInheritedColor } from '@nivo/colors'
import { useTooltip } from '@nivo/tooltip'
import { PieSvgDefaultProps, PieSvgPropTypes } from './props'
import { useNormalizedData, usePieFromBox, usePieRadialLabels, usePieSliceLabels } from './hooks'

const drawSliceLabels = (ctx, labels, theme) => {
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    labels.forEach(label => {
        ctx.save()
        ctx.translate(label.x, label.y)
        ctx.fillStyle = label.textColor
        ctx.fillText(label.label, 0, 0)
        ctx.restore()
    })
}

const drawRadialLabels = (ctx, labels, theme, linkStrokeWidth) => {
    ctx.textBaseline = 'middle'
    ctx.font = `${theme.labels.text.fontSize}px ${theme.labels.text.fontFamily}`

    labels.forEach(label => {
        ctx.save()
        ctx.translate(label.position.x, label.position.y)
        ctx.fillStyle = label.textColor
        ctx.textAlign = textPropsByEngine.canvas.align[label.align]
        ctx.fillText(label.text, 0, 0)
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

const PieCanvas = ({
    data,
    id,
    value,
    valueFormat,
    sortByValue,

    // layers,

    startAngle,
    endAngle,
    padAngle,
    fit,
    innerRadius: innerRadiusRatio,
    cornerRadius,

    width,
    height,
    margin: partialMargin,
    pixelRatio,

    colors,

    // border
    borderWidth,
    borderColor,

    // radial labels
    radialLabel,
    enableRadialLabels,
    radialLabelsSkipAngle,
    radialLabelsLinkOffset,
    radialLabelsLinkDiagonalLength,
    radialLabelsLinkHorizontalLength,
    radialLabelsLinkStrokeWidth,
    radialLabelsTextXOffset,
    radialLabelsTextColor,
    radialLabelsLinkColor,

    // slices labels
    sliceLabel,
    enableSliceLabels,
    sliceLabelsSkipAngle,
    sliceLabelsTextColor,
    sliceLabelsRadiusOffset,

    // interactivity
    isInteractive,
    onClick,
    onMouseMove,
    tooltip,

    legends,
}) => {
    const canvasEl = useRef(null)
    const theme = useTheme()

    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const normalizedData = useNormalizedData({
        data,
        id,
        value,
        valueFormat,
        colors,
    })

    const { dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius } = usePieFromBox({
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

    const getBorderColor = useInheritedColor(borderColor, theme)

    const radialLabels = usePieRadialLabels({
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

    const sliceLabels = usePieSliceLabels({
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
        canvasEl.current.width = outerWidth * pixelRatio
        canvasEl.current.height = outerHeight * pixelRatio

        const ctx = canvasEl.current.getContext('2d')

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

    const getArcFromMouse = event => {
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

    const handleMouseHover = event => {
        const datum = getArcFromMouse(event)
        if (datum) {
            onMouseMove && onMouseMove(datum, event)
            showTooltipFromEvent(createElement(tooltip, { datum }), event)
        } else {
            hideTooltip()
        }
    }

    const handleMouseLeave = () => {
        hideTooltip()
    }

    const handleClick = event => {
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

PieCanvas.displayName = 'PieCanvas'
PieCanvas.propTypes = PieSvgPropTypes
PieCanvas.defaultProps = PieSvgDefaultProps

export default withContainer(PieCanvas)
