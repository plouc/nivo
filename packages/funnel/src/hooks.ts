import { createElement, useMemo, useState, MouseEvent } from 'react'
import { line, area, curveBasis, curveLinear } from 'd3-shape'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import { useTheme, useValueFormatter } from '@nivo/core'
import { useAnnotations } from '@nivo/annotations'
import { useTooltip, TooltipActionsContextData } from '@nivo/tooltip'
import { svgDefaultProps as defaults } from './props'
import { PartTooltip } from './PartTooltip'
import {
    FunnelDatum,
    FunnelCommonProps,
    FunnelDataProps,
    FunnelPart,
    SeparatorProps,
    FunnelCustomLayerProps,
    FunnelAreaGenerator,
    FunnelAreaPoint,
    FunnelBorderGenerator,
    Position,
} from './types'

export const computeShapeGenerators = <D extends FunnelDatum>(
    interpolation: FunnelCommonProps<D>['interpolation'],
    direction: FunnelCommonProps<D>['direction']
): [FunnelAreaGenerator, FunnelBorderGenerator] => {
    // area generator which is used to draw funnel chart parts
    const areaGenerator: FunnelAreaGenerator = area<FunnelAreaPoint>()
    if (direction === 'vertical') {
        areaGenerator
            .curve(interpolation === 'smooth' ? curveBasis : curveLinear)
            .x0(d => d.x0)
            .x1(d => d.x1)
            .y(d => d.y)
    } else {
        areaGenerator
            .curve(interpolation === 'smooth' ? curveBasis : curveLinear)
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
        line<Position | null>()
            .defined(d => d !== null)
            .x(d => d!.x)
            .y(d => d!.y)
            .curve(interpolation === 'smooth' ? curveBasis : curveLinear),
    ]
}

interface CustomBandScale {
    (index: number): number
    bandwidth: number
}

export const computeScales = <D extends FunnelDatum>({
    data,
    direction,
    width,
    height,
    spacing,
}: {
    data: FunnelDataProps<D>['data']
    direction: FunnelCommonProps<D>['direction']
    width: number
    height: number
    spacing: number
}): [CustomBandScale, ScaleLinear<number, number>] => {
    let bandScaleSize
    let linearScaleSize
    if (direction === 'vertical') {
        bandScaleSize = height
        linearScaleSize = width
    } else {
        bandScaleSize = width
        linearScaleSize = height
    }

    const bandwidth = (bandScaleSize - spacing * (data.length - 1)) / data.length

    // we're not using d3 band scale here to be able to get
    // the actual paddingInner value in pixels, required to
    // create centered separator lines between parts
    const bandScale = (index: number) => spacing * index + bandwidth * index
    bandScale.bandwidth = bandwidth

    const allValues = data.map(d => d.value)

    const linearScale = scaleLinear()
        .domain([0, Math.max(...allValues)])
        .range([0, linearScaleSize])

    return [bandScale, linearScale]
}

export const computeSeparators = <D extends FunnelDatum>({
    parts,
    direction,
    width,
    height,
    spacing,
    enableBeforeSeparators,
    beforeSeparatorOffset,
    enableAfterSeparators,
    afterSeparatorOffset,
}: {
    parts: FunnelPart<D>[]
    direction: FunnelCommonProps<D>['direction']
    width: number
    height: number
    spacing: number
    enableBeforeSeparators: boolean
    beforeSeparatorOffset: number
    enableAfterSeparators: boolean
    afterSeparatorOffset: number
}) => {
    const beforeSeparators: SeparatorProps[] = []
    const afterSeparators: SeparatorProps[] = []
    const lastPart = parts[parts.length - 1]

    if (direction === 'vertical') {
        parts.forEach(part => {
            const y = part.y0 - spacing / 2

            if (enableBeforeSeparators) {
                beforeSeparators.push({
                    partId: part.data.id,
                    x0: 0,
                    x1: part.x0 - beforeSeparatorOffset,
                    y0: y,
                    y1: y,
                })
            }
            if (enableAfterSeparators) {
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
        if (enableBeforeSeparators) {
            beforeSeparators.push({
                ...beforeSeparators[beforeSeparators.length - 1],
                partId: 'none',
                y0: y,
                y1: y,
            })
        }
        if (enableAfterSeparators) {
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

export const computePartsHandlers = <D extends FunnelDatum>({
    parts,
    setCurrentPartId,
    isInteractive,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onClick,
    showTooltipFromEvent,
    hideTooltip,
}: {
    parts: FunnelPart<D>[]
    setCurrentPartId: (id: string | number | null) => void
    isInteractive: FunnelCommonProps<D>['isInteractive']
    onMouseEnter?: FunnelCommonProps<D>['onMouseEnter']
    onMouseLeave?: FunnelCommonProps<D>['onMouseLeave']
    onMouseMove?: FunnelCommonProps<D>['onMouseMove']
    onClick?: FunnelCommonProps<D>['onClick']
    showTooltipFromEvent: TooltipActionsContextData['showTooltipFromEvent']
    hideTooltip: () => void
}) => {
    if (!isInteractive) return parts

    return parts.map(part => {
        const boundOnMouseEnter = (event: MouseEvent) => {
            setCurrentPartId(part.data.id)
            showTooltipFromEvent(createElement(PartTooltip, { part }), event)
            onMouseEnter !== undefined && onMouseEnter(part, event)
        }

        const boundOnMouseLeave = (event: MouseEvent) => {
            setCurrentPartId(null)
            hideTooltip()
            onMouseLeave !== undefined && onMouseLeave(part, event)
        }

        const boundOnMouseMove = (event: MouseEvent) => {
            showTooltipFromEvent(createElement(PartTooltip, { part }), event)
            onMouseMove !== undefined && onMouseMove(part, event)
        }

        const boundOnClick =
            onClick !== undefined
                ? (event: MouseEvent) => {
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
export const useFunnel = <D extends FunnelDatum>({
    data,
    width,
    height,
    direction = defaults.direction,
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
}: {
    data: FunnelDataProps<D>['data']
    width: number
    height: number
    direction?: FunnelCommonProps<D>['direction']
    interpolation?: FunnelCommonProps<D>['interpolation']
    spacing?: FunnelCommonProps<D>['spacing']
    shapeBlending?: FunnelCommonProps<D>['shapeBlending']
    valueFormat?: FunnelCommonProps<D>['valueFormat']
    colors?: FunnelCommonProps<D>['colors']
    fillOpacity?: FunnelCommonProps<D>['fillOpacity']
    borderWidth?: FunnelCommonProps<D>['borderWidth']
    borderColor?: FunnelCommonProps<D>['borderColor']
    borderOpacity?: FunnelCommonProps<D>['borderOpacity']
    labelColor?: FunnelCommonProps<D>['labelColor']
    enableBeforeSeparators?: FunnelCommonProps<D>['enableBeforeSeparators']
    beforeSeparatorLength?: FunnelCommonProps<D>['beforeSeparatorLength']
    beforeSeparatorOffset?: FunnelCommonProps<D>['beforeSeparatorOffset']
    enableAfterSeparators?: FunnelCommonProps<D>['enableAfterSeparators']
    afterSeparatorLength?: FunnelCommonProps<D>['afterSeparatorLength']
    afterSeparatorOffset?: FunnelCommonProps<D>['afterSeparatorOffset']
    isInteractive?: FunnelCommonProps<D>['isInteractive']
    currentPartSizeExtension?: FunnelCommonProps<D>['currentPartSizeExtension']
    currentBorderWidth?: FunnelCommonProps<D>['currentBorderWidth']
    onMouseEnter?: FunnelCommonProps<D>['onMouseEnter']
    onMouseMove?: FunnelCommonProps<D>['onMouseMove']
    onMouseLeave?: FunnelCommonProps<D>['onMouseLeave']
    onClick?: FunnelCommonProps<D>['onClick']
}) => {
    const theme = useTheme()
    const getColor = useOrdinalColorScale<D>(colors, 'id')
    const getBorderColor = useInheritedColor(borderColor, theme)
    const getLabelColor = useInheritedColor(labelColor, theme)

    const formatValue = useValueFormatter<number>(valueFormat)

    const [areaGenerator, borderGenerator] = useMemo(
        () => computeShapeGenerators<D>(interpolation, direction),
        [interpolation, direction]
    )

    let innerWidth: number
    let innerHeight: number
    const paddingBefore = enableBeforeSeparators ? beforeSeparatorLength + beforeSeparatorOffset : 0
    const paddingAfter = enableAfterSeparators ? afterSeparatorLength + afterSeparatorOffset : 0
    if (direction === 'vertical') {
        innerWidth = width - paddingBefore - paddingAfter
        innerHeight = height
    } else {
        innerWidth = width
        innerHeight = height - paddingBefore - paddingAfter
    }

    const [bandScale, linearScale] = useMemo(
        () =>
            computeScales<D>({
                data,
                direction,
                width: innerWidth,
                height: innerHeight,
                spacing,
            }),
        [data, direction, innerWidth, innerHeight, spacing]
    )

    const [currentPartId, setCurrentPartId] = useState<string | number | null>(null)

    const parts: FunnelPart<D>[] = useMemo(() => {
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
            } else {
                partWidth = bandScale.bandwidth
                partHeight = linearScale(datum.value)
                x0 = bandScale(index)
                y0 = paddingBefore + (innerHeight - partHeight) * 0.5
            }

            const x1 = x0 + partWidth
            const x = x0 + partWidth * 0.5
            const y1 = y0 + partHeight
            const y = y0 + partHeight * 0.5

            const part: FunnelPart<D> = {
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
                borderColor: '',
                labelColor: '',
                points: [],
                areaPoints: [],
                borderPoints: [],
            }

            part.borderColor = getBorderColor(part)
            part.labelColor = getLabelColor(part)

            return part
        })

        const shapeBlending = rawShapeBlending / 2

        enhancedParts.forEach((part, index) => {
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
                if (part.isCurrent) {
                    part.points[0].x -= currentPartSizeExtension
                    part.points[1].x += currentPartSizeExtension
                    part.points[2].x += currentPartSizeExtension
                    part.points[3].x -= currentPartSizeExtension
                }

                part.areaPoints = [
                    {
                        x: 0,
                        x0: part.points[0].x,
                        x1: part.points[1].x,
                        y: part.y0,
                        y0: 0,
                        y1: 0,
                    },
                ]
                part.areaPoints.push({
                    ...part.areaPoints[0],
                    y: part.y0 + part.height * shapeBlending,
                })
                const lastAreaPoint = {
                    x: 0,
                    x0: part.points[3].x,
                    x1: part.points[2].x,
                    y: part.y1,
                    y0: 0,
                    y1: 0,
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
            } else {
                part.points.push({ x: part.x0, y: part.y0 })
                if (nextPart) {
                    part.points.push({ x: part.x1, y: nextPart.y0 })
                    part.points.push({ x: part.x1, y: nextPart.y1 })
                } else {
                    part.points.push({ x: part.x1, y: part.y0 })
                    part.points.push({ x: part.x1, y: part.y1 })
                }
                part.points.push({ x: part.x0, y: part.y1 })
                if (part.isCurrent) {
                    part.points[0].y -= currentPartSizeExtension
                    part.points[1].y -= currentPartSizeExtension
                    part.points[2].y += currentPartSizeExtension
                    part.points[3].y += currentPartSizeExtension
                }

                part.areaPoints = [
                    {
                        x: part.x0,
                        x0: 0,
                        x1: 0,
                        y: 0,
                        y0: part.points[0].y,
                        y1: part.points[3].y,
                    },
                ]
                part.areaPoints.push({
                    ...part.areaPoints[0],
                    x: part.x0 + part.width * shapeBlending,
                })
                const lastAreaPoint = {
                    x: part.x1,
                    x0: 0,
                    x1: 0,
                    y: 0,
                    y0: part.points[1].y,
                    y1: part.points[2].y,
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
            computePartsHandlers<D>({
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

    const customLayerProps: FunnelCustomLayerProps<D> = useMemo(
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

export const useFunnelAnnotations = <D extends FunnelDatum>(
    parts: FunnelPart<D>[],
    annotations: FunnelCommonProps<D>['annotations']
) =>
    useAnnotations<FunnelPart<D>>({
        data: parts,
        annotations,
        getPosition: part => ({
            x: part.x,
            y: part.y,
        }),
        getDimensions: (part: FunnelPart<D>) => {
            const width = part.width
            const height = part.height

            return { size: Math.max(width, height), width, height }
        },
    })
