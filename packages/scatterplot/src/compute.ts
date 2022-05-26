import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import { scaleLinear } from 'd3-scale'
import { computeXYScalesForSeries, ScaleSpec } from '@nivo/scales'
import {
    ScatterPlotCommonProps,
    ScatterPlotDataProps,
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotNodeDynamicSizeSpec,
    ScatterPlotRawNodeData,
} from './types'
import { OrdinalColorScale } from '@nivo/colors'

const isDynamicSizeSpec = <RawDatum extends ScatterPlotDatum>(
    size: ScatterPlotCommonProps<RawDatum>['nodeSize']
): size is ScatterPlotNodeDynamicSizeSpec => isPlainObject(size)

export const getNodeSizeGenerator = <RawDatum extends ScatterPlotDatum>(
    size: ScatterPlotCommonProps<RawDatum>['nodeSize']
) => {
    if (typeof size === 'function') return size
    if (isNumber(size)) return () => size
    if (isDynamicSizeSpec<RawDatum>(size)) {
        if (!isString(size.key)) {
            throw new Error(
                'symbolSize is invalid, key should be a string pointing to the property to use to determine node size'
            )
        }
        if (!Array.isArray(size.values) || size.values.length !== 2) {
            throw new Error(
                'symbolSize is invalid, values spec should be an array containing two values, min and max'
            )
        }
        if (!Array.isArray(size.sizes) || size.sizes.length !== 2) {
            throw new Error(
                'symbolSize is invalid, sizes spec should be an array containing two values, min and max'
            )
        }

        const sizeScale = scaleLinear()
            .domain([size.values[0], size.values[1]])
            .range([size.sizes[0], size.sizes[1]])

        return (datum: Omit<ScatterPlotNodeData<RawDatum>, 'size' | 'color'>) =>
            sizeScale(get(datum, size.key))
    }

    throw new Error('nodeSize is invalid, it should be either a function, a number or an object')
}

export const computeRawSeriesPoints = <RawDatum extends ScatterPlotDatum>({
    data,
    xScaleSpec,
    yScaleSpec,
    width,
    height,
    formatX,
    formatY,
    getNodeId,
}: {
    data: ScatterPlotDataProps<RawDatum>['data']
    xScaleSpec: ScaleSpec
    yScaleSpec: ScaleSpec
    width: number
    height: number
    formatX: (value: RawDatum['x']) => string | number
    formatY: (value: RawDatum['x']) => string | number
    getNodeId: (d: Omit<ScatterPlotRawNodeData<RawDatum>, 'id'>) => string
}) => {
    const { series, xScale, yScale } = computeXYScalesForSeries<{ id: string | number }, RawDatum>(
        data,
        xScaleSpec,
        yScaleSpec,
        width,
        height
    )
    let offset = 0 // allows giving each data point a unique index
    const rawSeriesNodes: ScatterPlotRawNodeData<RawDatum>[][] = series
        .filter(serie => serie.data.length > 0)
        .map((serie, serieIndex) => {
            const points = serie.data.map((d, i) => {
                const point: Omit<ScatterPlotRawNodeData<RawDatum>, 'id'> = {
                    index: offset + i,
                    serieIndex,
                    serieId: serie.id,
                    x: d.position.x as number,
                    xValue: d.data.x,
                    formattedX: formatX(d.data.x),
                    y: d.position.y as number,
                    yValue: d.data.y,
                    formattedY: formatY(d.data.y),
                    data: d.data,
                }
                return {
                    ...point,
                    id: getNodeId(point),
                }
            })
            offset = offset + points.length
            return points
        })

    return { rawSeriesNodes, xScale, yScale }
}

export const computeStyledPoints = <RawDatum extends ScatterPlotDatum>({
    rawSeriesNodes,
    hiddenIds,
    getColor,
    getNodeSize,
}: {
    rawSeriesNodes: ScatterPlotRawNodeData<RawDatum>[][]
    hiddenIds: string[]
    getColor: OrdinalColorScale<{ serieId: string | number }>
    getNodeSize: (datum: ScatterPlotRawNodeData<RawDatum>) => number
}): ScatterPlotNodeData<RawDatum>[][] => {
    return rawSeriesNodes
        .filter(rawNodes => !hiddenIds.includes(String(rawNodes[0].serieId)))
        .map(rawNodes => {
            const color = getColor({ serieId: rawNodes[0].serieId })
            return rawNodes.map(rawNode => ({
                ...rawNode,
                color,
                size: getNodeSize(rawNode),
            }))
        })
}
