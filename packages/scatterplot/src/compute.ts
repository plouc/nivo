import get from 'lodash/get'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import { scaleLinear } from 'd3-scale'
import { ComputedSerie } from '@nivo/scales'
import {
    ScatterPlotCommonProps,
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotNodeDynamicSizeSpec,
} from './types'

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

export const computePoints = <RawDatum extends ScatterPlotDatum>({
    series,
    formatX,
    formatY,
    getNodeId,
}: {
    series: ComputedSerie<{ id: string | number }, RawDatum>[]
    formatX: (value: RawDatum['x']) => string | number
    formatY: (value: RawDatum['x']) => string | number
    getNodeId: (d: Omit<ScatterPlotNodeData<RawDatum>, 'id' | 'size' | 'color'>) => string
}): Omit<ScatterPlotNodeData<RawDatum>, 'size' | 'color'>[] => {
    const points: Omit<ScatterPlotNodeData<RawDatum>, 'size' | 'color'>[] = []

    series.forEach(serie => {
        serie.data.forEach((d, serieIndex) => {
            const point: Omit<ScatterPlotNodeData<RawDatum>, 'id' | 'size' | 'color'> = {
                index: points.length,
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

            points.push({
                ...point,
                id: getNodeId(point),
            })
        })
    })

    return points
}
