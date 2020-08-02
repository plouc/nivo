/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useRef, useEffect, useCallback } from 'react'
import { geoContains } from 'd3-geo'
import { getRelativeCursor, withContainer, useDimensions, useTheme } from '@nivo/core'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { ChoroplethCanvasDefaultProps, ChoroplethCanvasPropTypes } from './props'
import { useGeoMap, useChoropleth } from './hooks'

const getFeatureFromMouseEvent = (event, el, features, projection) => {
    const [x, y] = getRelativeCursor(el, event)

    return features.find(f => geoContains(f, projection.invert([x, y])))
}

const ChoroplethCanvas = memo(
    ({
        width,
        height,
        margin: partialMargin,
        pixelRatio,
        features,
        data,
        match,
        label,
        value,
        valueFormat,
        projectionType,
        projectionScale,
        projectionTranslation,
        projectionRotation,
        colors,
        domain,
        unknownColor,
        borderWidth,
        borderColor,
        enableGraticule,
        graticuleLineWidth,
        graticuleLineColor,
        layers,
        legends,
        isInteractive,
        onClick,
        onMouseMove,
        tooltip: Tooltip,
    }) => {
        const canvasEl = useRef(null)
        const theme = useTheme()
        const { margin, outerWidth, outerHeight } = useDimensions(width, height, partialMargin)
        const { projection, graticule, path, getBorderWidth, getBorderColor } = useGeoMap({
            width,
            height,
            projectionType,
            projectionScale,
            projectionTranslation,
            projectionRotation,
            fillColor: () => {},
            borderWidth,
            borderColor,
        })
        const { getFillColor, boundFeatures, legendData } = useChoropleth({
            features,
            data,
            match,
            label,
            value,
            valueFormat,
            colors,
            unknownColor,
            domain,
        })

        useEffect(() => {
            if (!canvasEl) return

            canvasEl.current.width = outerWidth * pixelRatio
            canvasEl.current.height = outerHeight * pixelRatio

            const ctx = canvasEl.current.getContext('2d')

            ctx.scale(pixelRatio, pixelRatio)

            ctx.fillStyle = theme.background
            ctx.fillRect(0, 0, outerWidth, outerHeight)
            ctx.translate(margin.left, margin.top)

            path.context(ctx)

            layers.forEach(layer => {
                if (layer === 'graticule') {
                    if (enableGraticule === true) {
                        ctx.lineWidth = graticuleLineWidth
                        ctx.strokeStyle = graticuleLineColor
                        ctx.beginPath()
                        path(graticule())
                        ctx.stroke()
                    }
                } else if (layer === 'features') {
                    boundFeatures.forEach(feature => {
                        ctx.beginPath()
                        path(feature)
                        ctx.fillStyle = getFillColor(feature)
                        ctx.fill()

                        const borderWidth = getBorderWidth(feature)
                        if (borderWidth > 0) {
                            ctx.strokeStyle = getBorderColor(feature)
                            ctx.lineWidth = borderWidth
                            ctx.stroke()
                        }
                    })
                } else if (layer === 'legends') {
                    legends.forEach(legend => {
                        renderLegendToCanvas(ctx, {
                            ...legend,
                            data: legendData,
                            containerWidth: width,
                            containerHeight: height,
                            theme,
                        })
                    })
                } else {
                    // layer(ctx, {})
                }
            })
        }, [
            canvasEl,
            outerWidth,
            outerHeight,
            margin,
            pixelRatio,
            theme,
            path,
            graticule,
            getFillColor,
            getBorderWidth,
            getBorderColor,
            boundFeatures,
            legends,
            layers,
        ])

        const { showTooltipFromEvent, hideTooltip } = useTooltip()
        const handleMouseMove = useCallback(() => {
            if (!isInteractive || !Tooltip) return

            const feature = getFeatureFromMouseEvent(
                event,
                canvasEl.current,
                boundFeatures,
                projection
            )
            if (feature) {
                showTooltipFromEvent(<Tooltip feature={feature} />, event)
            } else {
                hideTooltip()
            }
            onMouseMove && onMouseMove(feature || null, event)
        }, [
            showTooltipFromEvent,
            hideTooltip,
            isInteractive,
            Tooltip,
            canvasEl,
            boundFeatures,
            projection,
        ])
        const handleMouseLeave = useCallback(() => isInteractive && hideTooltip(), [
            isInteractive,
            hideTooltip,
        ])
        const handleClick = useCallback(() => {
            if (!isInteractive || !onClick) return

            const feature = getFeatureFromMouseEvent(
                event,
                canvasEl.current,
                boundFeatures,
                projection
            )
            if (feature) {
                onClick(feature, event)
            }
        }, [isInteractive, canvasEl, boundFeatures, projection, onClick])

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
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            />
        )
    }
)

ChoroplethCanvas.displayName = 'ChoroplethCanvas'
ChoroplethCanvas.propTypes = ChoroplethCanvasPropTypes
ChoroplethCanvas.defaultProps = ChoroplethCanvasDefaultProps

export default withContainer(ChoroplethCanvas)
