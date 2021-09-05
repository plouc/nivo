import { useMemo } from 'react'
import { area, stack as d3Stack } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import {
    useTheme,
    usePropertyAccessor,
    useValueFormatter,
    useCurveInterpolation,
    // @ts-ignore
    stackOrderFromProp,
    // @ts-ignore
    stackOffsetFromProp,
} from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'
import {
    StreamCommonProps,
    StreamCustomLayerProps,
    StreamDataProps,
    StreamDatum,
    StreamLayerData,
    StreamLayerDatum,
    StreamSliceData,
} from './types'
import { defaultProps } from './props'

export const useStream = <RawDatum extends StreamDatum>({
    width,
    height,
    data,
    keys,
    label = defaultProps.label,
    valueFormat,
    offsetType = defaultProps.offsetType,
    order = defaultProps.order,
    curve = defaultProps.curve,
    colors = defaultProps.colors,
    borderColor = defaultProps.borderColor,
    dotSize = defaultProps.dotSize,
    dotColor = defaultProps.dotColor,
    dotBorderWidth = defaultProps.dotBorderWidth,
    dotBorderColor = defaultProps.dotBorderColor,
}: {
    width: number
    height: number
    data: StreamDataProps<RawDatum>['data']
    keys: StreamDataProps<RawDatum>['keys']
    label?: StreamCommonProps<RawDatum>['label']
    valueFormat?: StreamCommonProps<RawDatum>['valueFormat']
    offsetType?: StreamCommonProps<RawDatum>['offsetType']
    order?: StreamCommonProps<RawDatum>['order']
    curve?: StreamCommonProps<RawDatum>['curve']
    colors?: StreamCommonProps<RawDatum>['colors']
    dotSize?: StreamCommonProps<RawDatum>['dotSize']
    dotColor?: StreamCommonProps<RawDatum>['dotColor']
    dotBorderWidth?: StreamCommonProps<RawDatum>['dotBorderWidth']
    dotBorderColor?: StreamCommonProps<RawDatum>['dotBorderColor']
    borderColor?: StreamCommonProps<RawDatum>['borderColor']
}) => {
    const areaCurveFactory = useCurveInterpolation(curve)
    const areaGenerator = useMemo(
        () =>
            area<StreamLayerDatum>()
                .x(({ x }) => x)
                .y0(({ y1 }) => y1)
                .y1(({ y2 }) => y2)
                .curve(areaCurveFactory),
        [areaCurveFactory]
    )

    const stack = useMemo(
        () =>
            d3Stack<RawDatum, string | number>()
                .keys(keys)
                .offset(stackOffsetFromProp(offsetType))
                .order(stackOrderFromProp(order)),
        [keys, offsetType, order]
    )

    const [layers, xScale, yScale] = useMemo(() => {
        const allMin: number[] = []
        const allMax: number[] = []

        const layers = stack(data).map(layer => {
            return layer.map(point => {
                allMin.push(point[0])
                allMax.push(point[1])

                return {
                    ...point,
                    value: point.data[layer.key] as number,
                }
            })
        })

        const minValue = Math.min(...allMin)
        const maxValue = Math.max(...allMax)

        return [
            layers,
            scalePoint<number>()
                .domain(Array.from({ length: data.length }, (_, i) => i))
                .range([0, width]),
            scaleLinear().domain([minValue, maxValue]).range([height, 0]),
        ]
    }, [stack, data, width, height])

    const theme = useTheme()
    const getColor = useOrdinalColorScale<Omit<StreamLayerData, 'label' | 'color' | 'data'>>(
        colors,
        'id'
    )
    const getBorderColor = useInheritedColor<StreamLayerData>(borderColor, theme)

    const getDotSize = useMemo(() => (typeof dotSize === 'function' ? dotSize : () => dotSize), [
        dotSize,
    ])
    const getDotColor = useInheritedColor(dotColor, theme)
    const getDotBorderWidth = useMemo(
        () => (typeof dotBorderWidth === 'function' ? dotBorderWidth : () => dotBorderWidth),
        [dotBorderWidth]
    )
    const getDotBorderColor = useInheritedColor(dotBorderColor, theme)

    const getLabel = usePropertyAccessor<
        Omit<StreamLayerData, 'label' | 'color' | 'data'>,
        string | number
    >(label)
    const formatValue = useValueFormatter(valueFormat)

    const enhancedLayers: StreamLayerData[] = useMemo(
        () =>
            layers.map((points, layerIndex) => {
                const computedPoints: StreamLayerDatum[] = points.map((point, i) => ({
                    layerId: keys[layerIndex],
                    layerLabel: '',
                    index: i,
                    color: '',
                    x: xScale(i) as number,
                    value: point.value,
                    formattedValue: formatValue(point.value),
                    y1: yScale(point[0]),
                    y2: yScale(point[1]),
                }))

                const layer: Omit<StreamLayerData, 'label' | 'color' | 'data'> = {
                    id: keys[layerIndex] as string,
                    path: areaGenerator(computedPoints) as string,
                }

                const layerWithComputedProperties: Omit<StreamLayerData, 'data'> = {
                    ...layer,
                    label: getLabel(layer),
                    color: getColor(layer),
                }

                return {
                    ...layerWithComputedProperties,
                    data: computedPoints.map(point => {
                        point.layerLabel = layerWithComputedProperties.label
                        point.color = layerWithComputedProperties.color

                        return point
                    }),
                }
            }),
        [layers, keys, getLabel, areaGenerator, getColor, xScale, yScale, formatValue]
    )

    const slices: StreamSliceData[] = useMemo(
        () =>
            Array.from({ length: data.length }, (_, i) => {
                const sliceStack = enhancedLayers
                    .map(layer => layer.data[i])
                    .sort((a, b) => a.y2 - b.y2)

                return {
                    index: i,
                    x: enhancedLayers[0].data[i].x,
                    stack: sliceStack,
                }
            }),
        [data.length, enhancedLayers]
    )

    const layerContext: StreamCustomLayerProps = useMemo(
        () => ({
            xScale,
            yScale,
            layers: enhancedLayers,
            slices,
        }),
        [xScale, yScale, enhancedLayers, slices]
    )

    return {
        xScale,
        yScale,
        layers: enhancedLayers,
        slices,
        getBorderColor,
        getDotSize,
        getDotColor,
        getDotBorderWidth,
        getDotBorderColor,
        layerContext,
    }
}
