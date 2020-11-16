import { useMemo } from 'react'
import { get } from 'lodash'
import { stack as d3Stack, Stack, Series } from 'd3-shape'
import { ScaleLinear, scaleLinear } from 'd3-scale'
import {
    // @ts-ignore
    useValueFormatter,
    useTheme,
} from '@nivo/core'
import { InheritedColorConfig, useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import {
    NormalizedDatum,
    ComputedDatum,
    DataProps,
    DatumPropertyAccessor,
    Layout,
    DimensionDatum,
    CommonProps,
    CustomLayerProps,
    BarDatum,
    OffsetId,
    offsetById,
} from './types'

// d3 stack does not support defining `.keys()` using
// a mix of keys and custom value accessors, so we're
// building a map of accessors in any case, we're gonna
// use it later for `stack.value()`.
export const useDataDimensions = <RawDatum>(rawDimensions: DataProps<RawDatum>['dimensions']) =>
    useMemo(() => {
        const dimensions: Record<string, (datum: RawDatum) => number> = {}
        const dimensionIds: string[] = []
        rawDimensions.forEach(dimension => {
            dimensionIds.push(dimension.id)
            dimensions[dimension.id] =
                typeof dimension.value === 'function'
                    ? dimension.value
                    : (datum: RawDatum) => get(datum, dimension.value as string, 0)
        })

        return { dimensionIds, dimensions }
    }, [rawDimensions])

export const useStack = <RawDatum>(
    dimensionIds: string[],
    dimensions: Record<string, (datum: RawDatum) => number>,
    offset: OffsetId
) =>
    useMemo(() => {
        const offsetFunction = offsetById[offset]

        return d3Stack<RawDatum>()
            .keys(dimensionIds)
            .value((datum, key) => dimensions[key](datum))
            .offset(offsetFunction)
    }, [dimensionIds, dimensions, offset])

export const useStackedData = <RawDatum>(
    stack: Stack<any, RawDatum, string>,
    data: DataProps<RawDatum>['data']
) =>
    useMemo(() => {
        const stacked = stack(data)

        const allValues: number[] = []
        stacked.forEach(dimension => {
            dimension.forEach(datum => {
                allValues.push(datum[0])
                allValues.push(datum[1])
            })
        })

        const min = Math.min(...allValues)
        const max = Math.max(...allValues)

        return {
            stacked,
            min,
            max,
        }
    }, [stack, data])

export const useDimensionsScale = (
    min: number,
    max: number,
    width: number,
    height: number,
    layout: Layout
) =>
    useMemo(() => {
        if (layout === 'vertical') {
            return scaleLinear().domain([max, min]).range([0, height])
        }

        return scaleLinear().domain([min, max]).range([0, width])
    }, [min, max, width, height, layout])

export const useNormalizedData = <RawDatum>(
    data: DataProps<RawDatum>['data'],
    id: DataProps<RawDatum>['id'],
    value: DataProps<RawDatum>['value']
) => {
    const getId: DatumPropertyAccessor<RawDatum, string | number> =
        typeof id === 'function' ? id : (datum: RawDatum) => get(datum, id)
    const getValue: DatumPropertyAccessor<RawDatum, number> =
        typeof value === 'function' ? value : (datum: RawDatum) => get(datum, value, 0)

    return useMemo(() => {
        const normalized: NormalizedDatum<RawDatum>[] = []
        data.forEach((datum, index) => {
            const datumId = getId(datum)
            const datumValue = getValue(datum)

            normalized.push({
                index,
                id: datumId,
                value: datumValue,
                data: datum,
            })
        })

        return normalized
    }, [data, getId, getValue])
}

export const useThicknessScale = <RawDatum>({
    data,
    width,
    height,
    layout,
    outerPadding,
    innerPadding,
}: {
    data: NormalizedDatum<RawDatum>[]
    width: number
    height: number
    layout: Layout
    outerPadding: number
    innerPadding: number
}) =>
    useMemo(() => {
        const totalValue = data.reduce((acc, datum) => acc + datum.value, 0)

        const thicknessScale = scaleLinear().domain([0, totalValue])

        const totalPadding = 2 * outerPadding + (data.length - 1) * innerPadding

        if (layout === 'vertical') {
            thicknessScale.range([0, width - totalPadding])
        } else {
            thicknessScale.range([0, height - totalPadding])
        }

        return thicknessScale
    }, [data, width, height, layout])

export const useComputedData = <RawDatum>({
    data,
    stacked,
    dimensionIds,
    valueFormat,
    thicknessScale,
    dimensionsScale,
    colors,
    layout,
    outerPadding,
    innerPadding,
}: {
    data: NormalizedDatum<RawDatum>[]
    stacked: Series<RawDatum, string>[]
    dimensionIds: string[]
    valueFormat: DataProps<RawDatum>['valueFormat']
    thicknessScale: ScaleLinear<number, number>
    dimensionsScale: ScaleLinear<number, number>
    colors: CommonProps<RawDatum>['colors']
    layout: Layout
    outerPadding: number
    innerPadding: number
}) => {
    const getColor = useOrdinalColorScale<Omit<DimensionDatum<RawDatum>, 'color'>>(colors, 'id')

    const formatValue = useValueFormatter(valueFormat)

    return useMemo(() => {
        const computedData: ComputedDatum<RawDatum>[] = []

        let position = outerPadding

        data.forEach(datum => {
            const thickness = thicknessScale(datum.value)

            const computedDatum: ComputedDatum<RawDatum> = {
                ...datum,
                x: layout === 'vertical' ? position : 0,
                y: layout === 'vertical' ? 0 : position,
                width: layout === 'vertical' ? thickness : 0,
                height: layout === 'vertical' ? 0 : thickness,
                dimensions: [],
            }

            const allPositions: number[] = []
            let totalSize = 0

            position += thickness + innerPadding

            dimensionIds.forEach(dimensionId => {
                const dimension = stacked.find(stack => stack.key === dimensionId)
                if (dimension) {
                    const dimensionPoint = dimension[datum.index]
                    const dimensionDatum: DimensionDatum<RawDatum> = {
                        id: dimensionId,
                        datum: computedDatum,
                        value: dimensionPoint[1] - dimensionPoint[0],
                        formattedValue: formatValue(dimensionPoint[1] - dimensionPoint[0]),
                        color: 'rgba(0, 0, 0, 0)',
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    }

                    const position0 = dimensionsScale(dimensionPoint[0])
                    const position1 = dimensionsScale(dimensionPoint[1])

                    if (layout === 'vertical') {
                        dimensionDatum.x = computedDatum.x
                        dimensionDatum.y = Math.min(position0, position1)
                        dimensionDatum.width = computedDatum.width
                        dimensionDatum.height = Math.max(position0, position1) - dimensionDatum.y

                        allPositions.push(dimensionDatum.y)
                        totalSize += dimensionDatum.height
                    } else {
                        dimensionDatum.x = Math.min(position0, position1)
                        dimensionDatum.y = computedDatum.y
                        dimensionDatum.width = Math.max(position0, position1) - dimensionDatum.x
                        dimensionDatum.height = computedDatum.height

                        allPositions.push(dimensionDatum.x)
                        totalSize += dimensionDatum.width
                    }

                    dimensionDatum.color = getColor(dimensionDatum)

                    computedDatum.dimensions.push(dimensionDatum)
                }

                if (layout === 'vertical') {
                    computedDatum.y = Math.min(...allPositions)
                    computedDatum.height = totalSize
                } else {
                    computedDatum.x = Math.min(...allPositions)
                    computedDatum.width = totalSize
                }
            })

            computedData.push(computedDatum)
        })

        return computedData
    }, [
        data,
        stacked,
        dimensionIds,
        thicknessScale,
        dimensionsScale,
        layout,
        outerPadding,
        innerPadding,
        getColor,
        formatValue,
    ])
}

export const useBars = <RawDatum>(
    data: ComputedDatum<RawDatum>[],
    borderColor: InheritedColorConfig<DimensionDatum<RawDatum>>,
    borderWidth: number
) => {
    const theme = useTheme()
    const getBorderColor = useInheritedColor<DimensionDatum<RawDatum>>(borderColor, theme)

    return useMemo(() => {
        const all: BarDatum<RawDatum>[] = []
        data.forEach(datum => {
            datum.dimensions.forEach(dimension => {
                all.push({
                    key: `${datum.id}-${dimension.id}`,
                    ...dimension,
                    borderColor: getBorderColor(dimension),
                    borderWidth,
                })
            })
        })

        return all
    }, [data, borderWidth, getBorderColor])
}

export const useMarimekko = <RawDatum>({
    data,
    id,
    value,
    valueFormat,
    dimensions: rawDimensions,
    layout,
    offset,
    outerPadding,
    innerPadding,
    colors,
    borderColor,
    borderWidth,
    width,
    height,
}: {
    data: DataProps<RawDatum>['data']
    id: DataProps<RawDatum>['id']
    value: DataProps<RawDatum>['value']
    valueFormat: DataProps<RawDatum>['valueFormat']
    dimensions: DataProps<RawDatum>['dimensions']
    layout: Layout
    offset: OffsetId
    outerPadding: number
    innerPadding: number
    colors: CommonProps<RawDatum>['colors']
    borderColor: InheritedColorConfig<DimensionDatum<RawDatum>>
    borderWidth: number
    width: number
    height: number
}) => {
    const { dimensionIds, dimensions } = useDataDimensions<RawDatum>(rawDimensions)
    const stack = useStack<RawDatum>(dimensionIds, dimensions, offset)
    const { stacked, min, max } = useStackedData<RawDatum>(stack, data)
    const normalizedData = useNormalizedData<RawDatum>(data, id, value)
    const thicknessScale = useThicknessScale({
        data: normalizedData,
        width,
        height,
        layout,
        outerPadding,
        innerPadding,
    })
    const dimensionsScale = useDimensionsScale(min, max, width, height, layout)
    const computedData = useComputedData<RawDatum>({
        data: normalizedData,
        stacked,
        dimensionIds,
        valueFormat,
        thicknessScale,
        dimensionsScale,
        colors,
        layout,
        outerPadding,
        innerPadding,
    })
    const bars = useBars<RawDatum>(computedData, borderColor, borderWidth)

    return {
        computedData,
        bars,
        thicknessScale,
        dimensionsScale,
        dimensionIds,
    }
}

export const useLayerContext = <RawDatum>({
    data,
    bars,
    thicknessScale,
    dimensionsScale,
}: {
    data: ComputedDatum<RawDatum>[]
    bars: BarDatum<RawDatum>[]
    thicknessScale: ScaleLinear<number, number>
    dimensionsScale: ScaleLinear<number, number>
}): CustomLayerProps<RawDatum> =>
    useMemo(
        () => ({
            data,
            bars,
            thicknessScale,
            dimensionsScale,
        }),
        [data, bars, thicknessScale, dimensionsScale]
    )

export const useLegendData = <RawDatum>(dimensionIds: string[], bars: BarDatum<RawDatum>[]) => {
    const legendData: {
        id: string
        label: string
        color: string
        fill?: string
    }[] = []

    dimensionIds.forEach(dimensionId => {
        const bar = bars.find(bar => bar.id === dimensionId)
        if (bar) {
            legendData.push({
                id: dimensionId,
                label: dimensionId,
                color: bar.color,
                fill: bar.fill,
            })
        }
    })

    return legendData
}
