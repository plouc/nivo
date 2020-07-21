import { useMemo } from 'react'
import { area, stack as d3Stack } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import {
    curveFromProp,
    useTheme,
    stackOrderFromProp,
    stackOffsetFromProp,
    useValueFormatter,
} from '@nivo/core'
import { useInheritedColor, useOrdinalColorScale } from '@nivo/colors'

const stackMin = layers =>
    Math.min(...layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[0])], []))
const stackMax = layers =>
    Math.max(...layers.reduce((acc, layer) => [...acc, ...layer.map(d => d[1])], []))

export const useStream = ({
    width,
    height,
    data,
    keys,
    offsetType,
    order,
    curve,
    colors,
    borderColor,
    dotSize,
    dotColor,
    dotBorderWidth,
    dotBorderColor,
    tooltipLabel,
    tooltipFormat,
}) => {
    const areaGenerator = useMemo(
        () =>
            area()
                .x(({ x }) => x)
                .y0(({ y1 }) => y1)
                .y1(({ y2 }) => y2)
                .curve(curveFromProp(curve)),
        [curve]
    )

    const stack = useMemo(
        () =>
            d3Stack()
                .keys(keys)
                .offset(stackOffsetFromProp(offsetType))
                .order(stackOrderFromProp(order)),
        [keys, offsetType, order]
    )

    const [layers, xScale, yScale] = useMemo(() => {
        const layers = stack(data)
        layers.forEach(layer => {
            layer.forEach(point => {
                point.value = point.data[layer.key]
            })
        })

        const minValue = stackMin(layers)
        const maxValue = stackMax(layers)

        return [
            layers,
            scalePoint()
                .domain(Array.from({ length: data.length }, (_, i) => i))
                .range([0, width]),
            scaleLinear().domain([minValue, maxValue]).range([height, 0]),
        ]
    }, [stack, data, width, height])

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'index')
    const getBorderColor = useInheritedColor(borderColor, theme)

    const getDotSize = useMemo(() => (typeof dotSize === 'function' ? dotSize : () => dotSize), [
        dotSize,
    ])
    const getDotColor = useInheritedColor(dotColor, theme)
    const getDotBorderWidth = useMemo(
        () => (typeof dotBorderWidth === 'function' ? dotBorderWidth : () => dotBorderWidth),
        [dotBorderWidth]
    )
    const getDotBorderColor = useInheritedColor(dotBorderColor, theme)

    const enhancedLayers = useMemo(
        () =>
            layers.map((points, layerIndex) => {
                const layer = points.map((point, i) => ({
                    index: i,
                    x: xScale(i),
                    value: point.value,
                    y1: yScale(point[0]),
                    y2: yScale(point[1]),
                }))

                return {
                    id: keys[layerIndex],
                    layer,
                    path: areaGenerator(layer),
                    color: getColor({ index: layerIndex }),
                }
            }),
        [layers, keys, areaGenerator, getColor]
    )

    const slices = useMemo(
        () =>
            Array.from({ length: data.length }, (_, i) => {
                const sliceStack = enhancedLayers
                    .map(layer => ({
                        id: layer.id,
                        color: layer.color,
                        ...layer.layer[i],
                    }))
                    .sort((a, b) => a.y2 - b.y2)

                return {
                    index: i,
                    x: enhancedLayers[0].layer[i].x,
                    stack: sliceStack,
                }
            }),
        [data.length, enhancedLayers]
    )

    const getTooltipLabel = useMemo(() => {
        if (typeof tooltipLabel === 'function') return tooltipLabel

        return d => d.id
    }, [tooltipLabel])
    const getTooltipValue = useValueFormatter(tooltipFormat)

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
        getTooltipLabel,
        getTooltipValue,
    }
}
