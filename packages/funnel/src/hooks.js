import React, { useMemo, useState } from 'react'
import { line, area, curveBasis, curveLinear } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTheme, useValueFormatter } from '@nivo/core'
import { useAnnotations } from '@nivo/annotations'
import { useTooltip } from '@nivo/tooltip'
import { FunnelDefaultProps as defaults } from './props'
import PartTooltip from './PartTooltip'

export const computeShapeGenerators = (interpolation, direction) => {
    // area generator which is used to draw funnel chart parts.
    const areaGenerator = area().curve(interpolation === 'smooth' ? curveBasis : curveLinear)

    if (direction === 'vertical') {
        areaGenerator
            .x0(d => d.x0)
            .x1(d => d.x1)
            .y(d => d.y)
    } else if (direction === 'horizontal') {
        areaGenerator
            .y0(d => d.y0)
            .y1(d => d.y1)
            .x(d => d.x)
    }

    return [
        areaGenerator,
        // we're using a different line generator to draw borders, this way
        // we we don't have borders joining each side of the parts.
        // it's important to have an empty point when defining the points
        // to be used along with this, otherwise we'll get a line between both sides.
        line()
            .defined(d => d !== null)
            .x(d => d.x)
            .y(d => d.y)
            .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
    ]
}

export const computeScales = ({ data, direction, width, height, spacing }) => {
    let bandScaleSize
    let linearScaleSize
    if (direction === 'vertical') {
        bandScaleSize = height
        linearScaleSize = width
    } else if (direction === 'horizontal') {
        bandScaleSize = width
        linearScaleSize = height
    }

    const bandwidth = (bandScaleSize - spacing * (data.length - 1)) / data.length

    // we're not using d3 band scale here to be able to get
    // the actual paddingInner value in pixels, required to
    // create centered separator lines between parts
    const bandScale = index => spacing * index + bandwidth * index
    bandScale.bandwidth = bandwidth

    const allValues = data.map(d => d.value)

    const linearScale = scaleLinear()
        .domain([0, Math.max(...allValues)])
        .range([0, linearScaleSize])

    return [bandScale, linearScale]
}

export const computeSeparators = ({
    parts,
    direction,
    width,
    height,
    spacing,
    enableBeforeSeparators,
    beforeSeparatorOffset,
    enableAfterSeparators,
    afterSeparatorOffset,
}) => {
    const beforeSeparators = []
    const afterSeparators = []
    const lastPart = parts[parts.length - 1]

    if (direction === 'vertical') {
        parts.forEach(part => {
            const y = part.y0 - spacing / 2

            if (enableBeforeSeparators === true) {
                beforeSeparators.push({
                    partId: part.data.id,
                    x0: 0,
                    x1: part.x0 - beforeSeparatorOffset,
                    y0: y,
                    y1: y,
                })
            }
            if (enableAfterSeparators === true) {
                afterSeparators.push({
                    partId: part.data.id,
                    x0: part.x1 + afterSeparatorOffset,
                    x1: width,
                    y0: y,
                    y1: y,
                })
            }
        })

        const y = lastPart.y1
        if (enableBeforeSeparators === true) {
            beforeSeparators.push({
                ...beforeSeparators[beforeSeparators.length - 1],
                partId: 'none',
                y0: y,
                y1: y,
            })
        }
        if (enableAfterSeparators === true) {
            afterSeparators.push({
                ...afterSeparators[afterSeparators.length - 1],
                partId: 'none',
                y0: y,
                y1: y,
            })
        }
    } else if (direction === 'horizontal') {
        parts.forEach(part => {
            const x = part.x0 - spacing / 2

            beforeSeparators.push({
                partId: part.data.id,
                x0: x,
                x1: x,
                y0: 0,
                y1: part.y0 - beforeSeparatorOffset,
            })
            afterSeparators.push({
                partId: part.data.id,
                x0: x,
                x1: x,
                y0: part.y1 + afterSeparatorOffset,
                y1: height,
            })
        })

        const x = lastPart.x1
        beforeSeparators.push({
            ...beforeSeparators[beforeSeparators.length - 1],
            partId: 'none',
            x0: x,
            x1: x,
        })
        afterSeparators.push({
            ...afterSeparators[afterSeparators.length - 1],
            partId: 'none',
            x0: x,
            x1: x,
        })
    }

    return [beforeSeparators, afterSeparators]
}

export const computePartsHandlers = ({
    parts,
    setCurrentPartId,
    isInteractive,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    showTooltipFromEvent,
    hideTooltip,
}) => {
    if (!isInteractive) return parts

    return parts.map(part => {
        const boundOnMouseEnter = event => {
            setCurrentPartId(part.data.id)
            showTooltipFromEvent(React.createElement(PartTooltip, { part }), event)
            onMouseEnter !== undefined && onMouseEnter(part, event)
        }

        const boundOnMouseLeave = event => {
            setCurrentPartId(null)
            hideTooltip()
            onMouseLeave !== undefined && onMouseLeave(part, event)
        }

        const boundOnMouseMove = event => {
            showTooltipFromEvent(React.createElement(PartTooltip, { part }), event)
            onMouseMove !== undefined && onMouseMove(part, event)
        }

        const boundOnClick =
            onClick !== undefined
                ? event => {
                      onClick(part, event)
                  }
                : undefined

        return {
            ...part,
            onMouseEnter: boundOnMouseEnter,
            onMouseLeave: boundOnMouseLeave,
            onMouseMove: boundOnMouseMove,
            onClick: boundOnClick,
        }
    })
}

/**
 * Creates required layout to generate a funnel chart,
 * it uses almost the same parameters as the Funnel component.
 *
 * For purpose/constrains on the parameters, please have a look
 * at the component's props.
 */
export const useFunnel = ({
    data,
    width,
    height,
    direction,
    interpolation = defaults.interpolation,
    spacing = defaults.spacing,
    shapeBlending: rawShapeBlending = defaults.shapeBlending,
    valueFormat,
    colors = defaults.colors,
    fillOpacity = defaults.fillOpacity,
    borderWidth = defaults.borderWidth,
    borderColor = defaults.borderColor,
    borderOpacity = defaults.borderOpacity,
    labelColor = defaults.labelColor,
    enableBeforeSeparators = defaults.enableBeforeSeparators,
    beforeSeparatorLength = defaults.beforeSeparatorLength,
    beforeSeparatorOffset = defaults.beforeSeparatorOffset,
    enableAfterSeparators = defaults.enableAfterSeparators,
    afterSeparatorLength = defaults.afterSeparatorLength,
    afterSeparatorOffset = defaults.afterSeparatorOffset,
    isInteractive = defaults.isInteractive,
    currentPartSizeExtension = defaults.currentPartSizeExtension,
    currentBorderWidth,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'id')
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelColor = useInheritedColor(labelColor, theme)

    const formatValue = useValueFormatter(valueFormat)

    const [areaGenerator, borderGenerator] = useMemo(
        () => computeShapeGenerators(interpolation, direction),
        [interpolation, direction]
    )

    let innerWidth
    let innerHeight
    const paddingBefore = enableBeforeSeparators ? beforeSeparatorLength + beforeSeparatorOffset : 0
    const paddingAfter = enableAfterSeparators ? afterSeparatorLength + afterSeparatorOffset : 0
    if (direction === 'vertical') {
        innerWidth = width - paddingBefore - paddingAfter
        innerHeight = height
    } else if (direction === 'horizontal') {
        innerWidth = width
        innerHeight = height - paddingBefore - paddingAfter
    }

    const [bandScale, linearScale] = useMemo(
        () =>
            computeScales({
                data,
                direction,
                width: innerWidth,
                height: innerHeight,
                spacing,
            }),
        [data, direction, innerWidth, innerHeight, spacing]
    )

    const [currentPartId, setCurrentPartId] = useState(null)

    const parts = useMemo(() => {
        const enhancedParts = data.map((datum, index) => {
            const isCurrent = datum.id === currentPartId

            let partWidth
            let partHeight
            let y0, x0

            if (direction === 'vertical') {
                partWidth = linearScale(datum.value)
                partHeight = bandScale.bandwidth
                x0 = paddingBefore + (innerWidth - partWidth) * 0.5
                y0 = bandScale(index)
            } else if (direction === 'horizontal') {
                partWidth = bandScale.bandwidth
                partHeight = linearScale(datum.value)
                x0 = bandScale(index)
                y0 = paddingBefore + (innerHeight - partHeight) * 0.5
            }

            const x1 = x0 + partWidth
            const x = x0 + partWidth * 0.5
            const y1 = y0 + partHeight
            const y = y0 + partHeight * 0.5

            const part = {
                data: datum,
                width: partWidth,
                height: partHeight,
                color: getColor(datum),
                fillOpacity,
                borderWidth:
                    isCurrent && currentBorderWidth !== undefined
                        ? currentBorderWidth
                        : borderWidth,
                borderOpacity,
                formattedValue: formatValue(datum.value),
                isCurrent,
                x,
                x0,
                x1,
                y,
                y0,
                y1,
            }

            part.borderColor = getBorderColor(part)
            part.labelColor = getLabelColor(part)

            return part
        })

        const shapeBlending = rawShapeBlending / 2

        enhancedParts.forEach((part, index) => {
            part.points = []
            part.borderPoints = []

            const nextPart = enhancedParts[index + 1]

            if (direction === 'vertical') {
                part.points.push({ x: part.x0, y: part.y0 })
                part.points.push({ x: part.x1, y: part.y0 })
                if (nextPart) {
                    part.points.push({ x: nextPart.x1, y: part.y1 })
                    part.points.push({ x: nextPart.x0, y: part.y1 })
                } else {
                    part.points.push({ x: part.points[1].x, y: part.y1 })
                    part.points.push({ x: part.points[0].x, y: part.y1 })
                }
                if (part.isCurrent === true) {
                    part.points[0].x -= currentPartSizeExtension
                    part.points[1].x += currentPartSizeExtension
                    part.points[2].x += currentPartSizeExtension
                    part.points[3].x -= currentPartSizeExtension
                }

                part.areaPoints = [
                    {
                        x0: part.points[0].x,
                        x1: part.points[1].x,
                        y: part.y0,
                    },
                ]
                part.areaPoints.push({
                    ...part.areaPoints[0],
                    y: part.y0 + part.height * shapeBlending,
                })
                const lastAreaPoint = {
                    x0: part.points[3].x,
                    x1: part.points[2].x,
                    y: part.y1,
                }
                part.areaPoints.push({
                    ...lastAreaPoint,
                    y: part.y1 - part.height * shapeBlending,
                })
                part.areaPoints.push(lastAreaPoint)
                ;[0, 1, 2, 3].map(index => {
                    part.borderPoints.push({
                        x: part.areaPoints[index].x0,
                        y: part.areaPoints[index].y,
                    })
                })
                part.borderPoints.push(null)
                ;[3, 2, 1, 0].map(index => {
                    part.borderPoints.push({
                        x: part.areaPoints[index].x1,
                        y: part.areaPoints[index].y,
                    })
                })
            } else if (direction === 'horizontal') {
                part.points.push({ x: part.x0, y: part.y0 })
                if (nextPart) {
                    part.points.push({ x: part.x1, y: nextPart.y0 })
                    part.points.push({ x: part.x1, y: nextPart.y1 })
                } else {
                    part.points.push({ x: part.x1, y: part.y0 })
                    part.points.push({ x: part.x1, y: part.y1 })
                }
                part.points.push({ x: part.x0, y: part.y1 })
                if (part.isCurrent === true) {
                    part.points[0].y -= currentPartSizeExtension
                    part.points[1].y -= currentPartSizeExtension
                    part.points[2].y += currentPartSizeExtension
                    part.points[3].y += currentPartSizeExtension
                }

                part.areaPoints = [
                    {
                        y0: part.points[0].y,
                        y1: part.points[3].y,
                        x: part.x0,
                    },
                ]
                part.areaPoints.push({
                    ...part.areaPoints[0],
                    x: part.x0 + part.width * shapeBlending,
                })
                const lastAreaPoint = {
                    y0: part.points[1].y,
                    y1: part.points[2].y,
                    x: part.x1,
                }
                part.areaPoints.push({
                    ...lastAreaPoint,
                    x: part.x1 - part.width * shapeBlending,
                })
                part.areaPoints.push(lastAreaPoint)
                ;[0, 1, 2, 3].map(index => {
                    part.borderPoints.push({
                        x: part.areaPoints[index].x,
                        y: part.areaPoints[index].y0,
                    })
                })
                part.borderPoints.push(null)
                ;[3, 2, 1, 0].map(index => {
                    part.borderPoints.push({
                        x: part.areaPoints[index].x,
                        y: part.areaPoints[index].y1,
                    })
                })
            }
        })

        return enhancedParts
    }, [
        data,
        direction,
        linearScale,
        bandScale,
        innerWidth,
        innerHeight,
        paddingBefore,
        paddingAfter,
        rawShapeBlending,
        getColor,
        formatValue,
        getBorderColor,
        getLabelColor,
        currentPartId,
    ])

    const { showTooltipFromEvent, hideTooltip } = useTooltip()
    const partsWithHandlers = useMemo(
        () =>
            computePartsHandlers({
                parts,
                setCurrentPartId,
                isInteractive,
                onMouseEnter,
                onMouseLeave,
                onMouseMove,
                onClick,
                showTooltipFromEvent,
                hideTooltip,
            }),
        [
            parts,
            setCurrentPartId,
            isInteractive,
            onMouseEnter,
            onMouseLeave,
            onMouseMove,
            onClick,
            showTooltipFromEvent,
            hideTooltip,
        ]
    )

    const [beforeSeparators, afterSeparators] = useMemo(
        () =>
            computeSeparators({
                parts,
                direction,
                width,
                height,
                spacing,
                enableBeforeSeparators,
                beforeSeparatorOffset,
                enableAfterSeparators,
                afterSeparatorOffset,
            }),
        [
            parts,
            direction,
            width,
            height,
            spacing,
            enableBeforeSeparators,
            beforeSeparatorOffset,
            enableAfterSeparators,
            afterSeparatorOffset,
        ]
    )

    const customLayerProps = useMemo(
        () => ({
            width,
            height,
            parts: partsWithHandlers,
            areaGenerator,
            borderGenerator,
            beforeSeparators,
            afterSeparators,
            setCurrentPartId,
        }),
        [
            width,
            height,
            partsWithHandlers,
            areaGenerator,
            borderGenerator,
            beforeSeparators,
            afterSeparators,
            setCurrentPartId,
        ]
    )

    return {
        parts: partsWithHandlers,
        areaGenerator,
        borderGenerator,
        beforeSeparators,
        afterSeparators,
        setCurrentPartId,
        currentPartId,
        customLayerProps,
    }
}

export const useFunnelAnnotations = (parts, annotations) => {
    if (annotations.length === 0) return []

    return useAnnotations({
        items: parts,
        annotations,
        getDimensions: (part, offset) => {
            const width = part.width + offset * 2
            const height = part.height + offset * 2

            return { size: Math.max(width, height), width, height }
        },
    })
}
