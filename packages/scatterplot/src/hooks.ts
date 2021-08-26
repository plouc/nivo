import { useMemo } from 'react'
import { useValueFormatter, usePropertyAccessor } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { useAnnotations } from '@nivo/annotations'
import { computePoints, getNodeSizeGenerator } from './compute'
import {
    ScatterPlotCommonProps,
    ScatterPlotDataProps,
    ScatterPlotDatum,
    ScatterPlotNodeData,
} from './types'

const useNodeSize = <RawDatum extends ScatterPlotDatum>(
    size: ScatterPlotCommonProps<RawDatum>['nodeSize']
) => useMemo(() => getNodeSizeGenerator<RawDatum>(size), [size])

export const useScatterPlot = <RawDatum extends ScatterPlotDatum>({
    data,
    xScaleSpec,
    xFormat,
    yScaleSpec,
    yFormat,
    width,
    height,
    nodeId,
    nodeSize,
    colors,
}: {
    data: ScatterPlotDataProps<RawDatum>['data']
    xScaleSpec: ScatterPlotCommonProps<RawDatum>['xScale']
    xFormat?: ScatterPlotCommonProps<RawDatum>['xFormat']
    yScaleSpec: ScatterPlotCommonProps<RawDatum>['yScale']
    yFormat?: ScatterPlotCommonProps<RawDatum>['yFormat']
    width: number
    height: number
    nodeId: ScatterPlotCommonProps<RawDatum>['nodeId']
    nodeSize: ScatterPlotCommonProps<RawDatum>['nodeSize']
    colors: ScatterPlotCommonProps<RawDatum>['colors']
}) => {
    const { series, xScale, yScale } = useMemo(
        () =>
            computeXYScalesForSeries<{ id: string | number }, RawDatum>(
                data,
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, xScaleSpec, yScaleSpec, width, height]
    )

    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const getNodeId = usePropertyAccessor(nodeId)
    const rawNodes = useMemo(
        () => computePoints<RawDatum>({ series, formatX, formatY, getNodeId }),
        [series, formatX, formatY, getNodeId]
    )

    const getNodeSize = useNodeSize<RawDatum>(nodeSize)

    const getColor = useOrdinalColorScale(colors, 'serieId')

    const nodes: ScatterPlotNodeData<RawDatum>[] = useMemo(
        () =>
            rawNodes.map(rawNode => ({
                ...rawNode,
                size: getNodeSize(rawNode),
                color: getColor({ serieId: rawNode.serieId }),
            })),
        [rawNodes, getNodeSize, getColor]
    )

    const legendData = useMemo(
        () =>
            series.map(serie => ({
                id: serie.id,
                label: serie.id,
                color: getColor({ serieId: serie.id }),
            })),
        [series, getColor]
    )

    return {
        xScale,
        yScale,
        nodes,
        legendData,
    }
}

export const useScatterPlotAnnotations = <RawDatum extends ScatterPlotDatum>(
    items: ScatterPlotNodeData<RawDatum>[],
    annotations: ScatterPlotCommonProps<RawDatum>['annotations']
) =>
    useAnnotations<ScatterPlotNodeData<RawDatum>>({
        data: items,
        annotations,
        getPosition: (node: ScatterPlotNodeData<RawDatum>) => ({
            x: node.x,
            y: node.y,
        }),
        getDimensions: (node: ScatterPlotNodeData<RawDatum>) => ({
            size: node.size,
            width: node.size,
            height: node.size,
        }),
    })
