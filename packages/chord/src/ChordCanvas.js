/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo, useRef, useEffect, useCallback } from 'react'
import {
    withContainer,
    useDimensions,
    useTheme,
    midAngle,
    getPolarLabelProps,
    degreesToRadians,
    getRelativeCursor,
    getHoveredArc,
} from '@nivo/core'
import { useInheritedColor } from '@nivo/colors'
import { renderLegendToCanvas } from '@nivo/legends'
import { useTooltip } from '@nivo/tooltip'
import { useChord, useChordSelection, useChordLayerContext } from './hooks'
import { ChordCanvasPropTypes, ChordCanvasDefaultProps } from './props'

const getArcFromMouseEvent = ({ event, canvasEl, center, margin, radius, innerRadius, arcs }) => {
    const [x, y] = getRelativeCursor(canvasEl, event)
    const centerX = margin.left + center[0]
    const centerY = margin.top + center[1]

    return getHoveredArc(centerX, centerY, radius, innerRadius, arcs, x, y)
}

const ChordCanvas = memo(
    ({
        pixelRatio,
        margin: partialMargin,
        width,
        height,
        keys,
        matrix,
        label,
        valueFormat,
        innerRadiusRatio,
        innerRadiusOffset,
        padAngle,
        layers,
        colors,
        arcBorderWidth,
        arcBorderColor,
        arcOpacity,
        arcHoverOpacity,
        arcHoverOthersOpacity,
        arcTooltip,
        ribbonBorderWidth,
        ribbonBorderColor,
        ribbonOpacity,
        ribbonHoverOpacity,
        ribbonHoverOthersOpacity,
        enableLabel,
        labelOffset,
        labelRotation,
        labelTextColor,
        isInteractive,
        onArcMouseEnter,
        onArcMouseMove,
        onArcMouseLeave,
        onArcClick,
        legends,
    }) => {
        const canvasEl = useRef(null)
        const { innerWidth, innerHeight, outerWidth, outerHeight, margin } = useDimensions(
            width,
            height,
            partialMargin
        )

        const {
            center,
            radius,
            innerRadius,
            arcGenerator,
            ribbonGenerator,
            arcs,
            ribbons,
        } = useChord({
            keys,
            matrix,
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
            arcs,
            arcOpacity,
            arcHoverOpacity,
            arcHoverOthersOpacity,
            ribbons,
            ribbonOpacity,
            ribbonHoverOpacity,
            ribbonHoverOthersOpacity,
        })

        const theme = useTheme()
        const getLabelTextColor = useInheritedColor(labelTextColor, theme)
        const getArcBorderColor = useInheritedColor(arcBorderColor, theme)
        const getRibbonBorderColor = useInheritedColor(ribbonBorderColor, theme)

        const layerContext = useChordLayerContext({
            center,
            radius,
            arcs,
            arcGenerator,
            ribbons,
            ribbonGenerator,
        })

        useEffect(() => {
            canvasEl.current.width = outerWidth * pixelRatio
            canvasEl.current.height = outerHeight * pixelRatio

            const ctx = canvasEl.current.getContext('2d')

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
                            ctx.strokeStyle = getRibbonBorderColor({
                                ...ribbon,
                                color: ribbon.source.color,
                            })
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

                    ctx.font = `${theme.labels.text.fontSize}px ${
                        theme.labels.text.fontFamily || 'sans-serif'
                    }`

                    arcs.forEach(arc => {
                        const angle = midAngle(arc)
                        const props = getPolarLabelProps(radius + labelOffset, angle, labelRotation)

                        ctx.save()
                        ctx.translate(props.x, props.y)
                        ctx.rotate(degreesToRadians(props.rotate))

                        ctx.textAlign = props.align
                        ctx.textBaseline = props.baseline
                        ctx.fillStyle = getLabelTextColor(arc, theme)
                        ctx.fillText(arc.label, 0, 0)

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
            event => {
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
                    showTooltipFromEvent(React.createElement(arcTooltip, { arc }), event)
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
                showTooltipFromEvent,
                hideTooltip,
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
            event => {
                if (!onArcClick) return

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
)

ChordCanvas.propTypes = ChordCanvasPropTypes
ChordCanvas.defaultProps = ChordCanvasDefaultProps

export default withContainer(ChordCanvas)
