import { useMemo } from 'react'
import { get } from 'lodash'
// @ts-ignore
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import {
    // @ts-ignore
    degreesToRadians,
    // @ts-ignore
    radiansToDegrees,
    // @ts-ignore
    useValueFormatter,
    // @ts-ignore
    computeArcBoundingBox,
    // @ts-ignore
    useTheme,
    // @ts-ignore
    positionFromAngle,
    // @ts-ignore
    midAngle,
    // @ts-ignore
    getLabelGenerator,
    // @ts-ignore
    absoluteAngleRadians,
    // @ts-ignore
    absoluteAngleDegrees,
} from '@nivo/core'
import {
    // @ts-ignore
    getOrdinalColorScale,
    // @ts-ignore
    useInheritedColor,
    OrdinalColorsInstruction,
    InheritedColorProp,
} from '@nivo/colors'
import { defaultProps } from './props'
import {
    CompletePieSvgProps,
    ComputedDatum,
    PieArc,
    PieArcGenerator,
    LabelAccessorFunction,
    PieCustomLayerProps,
    RadialLabelData,
    SliceLabelData,
} from './types'

interface MayHaveLabel {
    label?: string | number
}

/**
 * Format data so that we get a consistent data structure.
 * It will also add the `formattedValue` and `color` property.
 */
export const useNormalizedData = <RawDatum extends MayHaveLabel>({
    data,
    id = defaultProps.id,
    value = defaultProps.value,
    valueFormat,
    colors = defaultProps.colors as OrdinalColorsInstruction,
}: Pick<CompletePieSvgProps<RawDatum>, 'id' | 'value' | 'valueFormat' | 'colors'> & {
    data: RawDatum[]
}): Omit<ComputedDatum<RawDatum>, 'arc' | 'fill'>[] => {
    const getId = useMemo(() => (typeof id === 'function' ? id : (d: RawDatum) => get(d, id)), [id])
    const getValue = useMemo(
        () => (typeof value === 'function' ? value : (d: RawDatum) => get(d, value)),
        [value]
    )
    const formatValue = useValueFormatter(valueFormat as any)

    const getColor = useMemo(() => getOrdinalColorScale(colors, 'id'), [colors])

    return useMemo(
        () =>
            data.map(datum => {
                const datumId = getId(datum)
                const datumValue = getValue(datum)

                const normalizedDatum: Omit<ComputedDatum<RawDatum>, 'arc' | 'color' | 'fill'> = {
                    id: datumId,
                    label: datum.label ?? datumId,
                    value: datumValue,
                    formattedValue: formatValue(datumValue),
                    data: datum,
                }

                return {
                    ...normalizedDatum,
                    color: getColor(normalizedDatum),
                }
            }),
        [data, getId, getValue, formatValue, getColor]
    )
}

/**
 * Compute arcs, which don't depend yet on radius.
 */
export const usePieArcs = <RawDatum>({
    data,
    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    sortByValue = defaultProps.sortByValue,
}: {
    data: Omit<ComputedDatum<RawDatum>, 'arc' | 'fill'>[]
    startAngle: number
    endAngle: number
    padAngle: number
    sortByValue: boolean
}): Omit<ComputedDatum<RawDatum>, 'fill'>[] => {
    const pie = useMemo(() => {
        const innerPie = d3Pie()
            .value((d: Omit<ComputedDatum<RawDatum>, 'arc' | 'fill'>) => d.value)
            .padAngle(degreesToRadians(padAngle))
            .startAngle(degreesToRadians(startAngle))
            .endAngle(degreesToRadians(endAngle))

        if (sortByValue !== true) innerPie.sortValues(null)

        return innerPie
    }, [startAngle, endAngle, padAngle, sortByValue])

    return useMemo(
        () =>
            pie(data).map(
                (
                    arc: Omit<PieArc, 'angle' | 'angleDeg'> & {
                        data: Omit<ComputedDatum<RawDatum>, 'arc' | 'fill'>
                    }
                ) => {
                    const angle = Math.abs(arc.endAngle - arc.startAngle)

                    return {
                        ...arc.data,
                        arc: {
                            index: arc.index,
                            startAngle: arc.startAngle,
                            endAngle: arc.endAngle,
                            padAngle: arc.padAngle,
                            angle,
                            angleDeg: radiansToDegrees(angle),
                        },
                    }
                }
            ),

        [pie, data]
    )
}

export const usePieArcGenerator = ({
    radius,
    innerRadius,
    cornerRadius = defaultProps.cornerRadius,
}: {
    radius: number
    innerRadius: number
    cornerRadius: number
}): PieArcGenerator =>
    useMemo(() => d3Arc().outerRadius(radius).innerRadius(innerRadius).cornerRadius(cornerRadius), [
        radius,
        innerRadius,
        cornerRadius,
    ])

/**
 * Compute pie layout using explicit radius/innerRadius,
 * expressed in pixels.
 */
export const usePie = <RawDatum>({
    data,
    radius,
    innerRadius,
    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    sortByValue = defaultProps.sortByValue,
    cornerRadius = defaultProps.cornerRadius,
}: Pick<
    CompletePieSvgProps<RawDatum>,
    'startAngle' | 'endAngle' | 'padAngle' | 'sortByValue' | 'cornerRadius'
> & {
    data: Omit<ComputedDatum<RawDatum>, 'arc'>[]
    radius: number
    innerRadius: number
}) => {
    const dataWithArc = usePieArcs({
        data,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
    })

    const arcGenerator = usePieArcGenerator({
        radius,
        innerRadius,
        cornerRadius,
    })

    return { dataWithArc, arcGenerator }
}

/**
 * Compute pie layout using a box to find radius/innerRadius,
 * expressed in ratio (0~1), can optionally use the `fit`
 * attribute to find the most space efficient layout.
 *
 * It also returns `centerX`/`centerY` as those can be altered
 * if `fit` is `true`.
 */
export const usePieFromBox = <RawDatum>({
    data,
    width,
    height,
    innerRadius: innerRadiusRatio = defaultProps.innerRadius,
    startAngle = defaultProps.startAngle,
    endAngle = defaultProps.endAngle,
    padAngle = defaultProps.padAngle,
    sortByValue = defaultProps.sortByValue,
    cornerRadius = defaultProps.cornerRadius,
    fit = defaultProps.fit,
}: Pick<
    CompletePieSvgProps<RawDatum>,
    | 'width'
    | 'height'
    | 'innerRadius'
    | 'startAngle'
    | 'endAngle'
    | 'padAngle'
    | 'sortByValue'
    | 'cornerRadius'
    | 'fit'
> & {
    data: Omit<ComputedDatum<RawDatum>, 'arc'>[]
}) => {
    const dataWithArc = usePieArcs({
        data,
        startAngle,
        endAngle,
        padAngle,
        sortByValue,
    })

    const computedProps = useMemo(() => {
        let radius = Math.min(width, height) / 2
        let innerRadius = radius * Math.min(innerRadiusRatio, 1)

        let centerX = width / 2
        let centerY = height / 2

        let boundingBox
        if (fit) {
            const { points, ...box } = computeArcBoundingBox(
                centerX,
                centerY,
                radius,
                startAngle - 90,
                endAngle - 90
            )
            const ratio = Math.min(width / box.width, height / box.height)

            const adjustedBox: {
                width: number
                height: number
                x?: number
                y?: number
            } = {
                width: box.width * ratio,
                height: box.height * ratio,
            }
            adjustedBox.x = (width - adjustedBox.width) / 2
            adjustedBox.y = (height - adjustedBox.height) / 2

            centerX = ((centerX - box.x) / box.width) * box.width * ratio + adjustedBox.x
            centerY = ((centerY - box.y) / box.height) * box.height * ratio + adjustedBox.y

            boundingBox = { box, ratio, points }

            radius = radius * ratio
            innerRadius = innerRadius * ratio
        }

        return {
            centerX,
            centerY,
            radius,
            innerRadius,
            debug: boundingBox,
        }
    }, [width, height, innerRadiusRatio, startAngle, endAngle, fit, cornerRadius])

    const arcGenerator = usePieArcGenerator({
        radius: computedProps.radius,
        innerRadius: computedProps.innerRadius,
        cornerRadius,
    })

    return {
        dataWithArc,
        arcGenerator,
        ...computedProps,
    }
}

export const usePieSliceLabels = <RawDatum>({
    enable,
    dataWithArc,
    skipAngle,
    radius,
    innerRadius,
    radiusOffset,
    label,
    textColor,
}: {
    enable: boolean
    dataWithArc: ComputedDatum<RawDatum>[]
    skipAngle: number
    radius: number
    innerRadius: number
    radiusOffset: number
    label: string | LabelAccessorFunction<RawDatum>
    textColor: InheritedColorProp<ComputedDatum<RawDatum>>
}): SliceLabelData<RawDatum>[] => {
    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)
    const getLabel = useMemo(() => getLabelGenerator(label), [label])

    return useMemo(() => {
        if (!enable) return []

        return dataWithArc
            .filter(datumWithArc => skipAngle === 0 || datumWithArc.arc.angleDeg > skipAngle)
            .map(datumWithArc => {
                const angle = midAngle(datumWithArc.arc) - Math.PI / 2
                const labelRadius = innerRadius + (radius - innerRadius) * radiusOffset
                const position = positionFromAngle(angle, labelRadius)
                const datumTextColor = getTextColor(datumWithArc)

                return {
                    ...position,
                    label: getLabel(datumWithArc),
                    textColor: datumTextColor,
                    datum: datumWithArc,
                }
            })
    }, [enable, dataWithArc, skipAngle, radius, innerRadius, radiusOffset, getLabel, getTextColor])
}

export const usePieRadialLabels = <RawDatum>({
    enable,
    dataWithArc,
    label,
    textXOffset,
    textColor,
    radius,
    skipAngle,
    linkOffset,
    linkDiagonalLength,
    linkHorizontalLength,
    linkColor,
}: {
    enable: boolean
    dataWithArc: ComputedDatum<RawDatum>[]
    label: string | LabelAccessorFunction<RawDatum>
    textXOffset: number
    textColor: InheritedColorProp<ComputedDatum<RawDatum>>
    radius: number
    skipAngle: number
    linkOffset: number
    linkDiagonalLength: number
    linkHorizontalLength: number
    linkColor: InheritedColorProp<ComputedDatum<RawDatum>>
}): RadialLabelData<RawDatum>[] => {
    const getLabel = useMemo(() => getLabelGenerator(label), [label])

    const theme = useTheme()
    const getTextColor = useInheritedColor(textColor, theme)
    const getLinkColor = useInheritedColor(linkColor, theme)

    return useMemo(() => {
        if (!enable) return []

        return dataWithArc
            .filter(datum => skipAngle === 0 || datum.arc.angleDeg > skipAngle)
            .map(datum => {
                const angle = absoluteAngleRadians(midAngle(datum.arc) - Math.PI / 2)
                const positionA = positionFromAngle(angle, radius + linkOffset)
                const positionB = positionFromAngle(angle, radius + linkOffset + linkDiagonalLength)

                let positionC
                let labelPosition
                let textAlign

                if (
                    absoluteAngleDegrees(radiansToDegrees(angle)) < 90 ||
                    absoluteAngleDegrees(radiansToDegrees(angle)) >= 270
                ) {
                    positionC = { x: positionB.x + linkHorizontalLength, y: positionB.y }
                    labelPosition = {
                        x: positionB.x + linkHorizontalLength + textXOffset,
                        y: positionB.y,
                    }
                    textAlign = 'left'
                } else {
                    positionC = { x: positionB.x - linkHorizontalLength, y: positionB.y }
                    labelPosition = {
                        x: positionB.x - linkHorizontalLength - textXOffset,
                        y: positionB.y,
                    }
                    textAlign = 'right'
                }

                return {
                    text: getLabel(datum),
                    textColor: getTextColor(datum),
                    position: labelPosition,
                    align: textAlign,
                    line: [positionA, positionB, positionC],
                    linkColor: getLinkColor(datum),
                    datum,
                }
            })
    }, [
        dataWithArc,
        skipAngle,
        radius,
        linkOffset,
        linkDiagonalLength,
        linkHorizontalLength,
        textXOffset,
        getLabel,
        getTextColor,
        getLinkColor,
    ])
}

/**
 * Memoize the context to pass to custom layers.
 */
export const usePieLayerContext = <RawDatum>({
    dataWithArc,
    arcGenerator,
    centerX,
    centerY,
    radius,
    innerRadius,
}: {
    dataWithArc: ComputedDatum<RawDatum>[]
    arcGenerator: PieArcGenerator
    centerX: number
    centerY: number
    radius: number
    innerRadius: number
}): PieCustomLayerProps<RawDatum> =>
    useMemo(
        () => ({
            dataWithArc,
            arcGenerator,
            centerX,
            centerY,
            radius,
            innerRadius,
        }),
        [dataWithArc, arcGenerator, centerX, centerY, radius, innerRadius]
    )
