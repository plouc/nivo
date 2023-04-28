import { useCallback, useMemo, useState } from 'react'
import { useValueFormatter, usePropertyAccessor } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { useAnnotations } from '@nivo/annotations'
import { LegendProps } from '@nivo/legends'
import { computeRawSeriesPoints, computeStyledPoints, getNodeSizeGenerator } from './compute'
import {
    ScatterPlotCommonProps,
    ScatterPlotDataProps,
    ScatterPlotDatum,
    ScatterPlotLegendDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
} from './types'
import { computeLegendData, getBaseLegendData } from './legends'

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
    initialHiddenIds,
    colors,
    legends,
    legendLabel,
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
    initialHiddenIds: ScatterPlotCommonProps<RawDatum>['initialHiddenIds']
    colors: ScatterPlotCommonProps<RawDatum>['colors']
    legends: ScatterPlotCommonProps<RawDatum>['legends']
    legendLabel: ScatterPlotCommonProps<RawDatum>['legendLabel']
}) => {
    const [hiddenIds, setHiddenIds] = useState(initialHiddenIds ?? [])
    const toggleSerie = useCallback(id => {
        setHiddenIds(state =>
            state.indexOf(id) > -1 ? state.filter(item => item !== id) : [...state, id]
        )
    }, [])

    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const getNodeId = usePropertyAccessor(nodeId)
    const getNodeSize = useNodeSize<RawDatum>(nodeSize)
    const getColor = useOrdinalColorScale(colors, 'serieId')
    const getLegendLabel = usePropertyAccessor<ScatterPlotRawSerie<RawDatum>, string>(
        legendLabel ?? 'id'
    )

    const { rawSeriesNodes, xScale, yScale } = useMemo(
        () =>
            computeRawSeriesPoints<RawDatum>({
                data,
                xScaleSpec,
                yScaleSpec,
                width,
                height,
                formatX,
                formatY,
                getNodeId,
            }),
        [data, xScaleSpec, yScaleSpec, width, height, formatX, formatY, getNodeId]
    )

    const nodes: ScatterPlotNodeData<RawDatum>[] = useMemo(
        () =>
            computeStyledPoints<RawDatum>({
                rawSeriesNodes,
                hiddenIds,
                getNodeSize,
                getColor,
            }).flat(),
        [rawSeriesNodes, hiddenIds, getNodeSize, getColor]
    )

    const baseLegendData: ScatterPlotLegendDatum[] = useMemo(
        () => getBaseLegendData({ data, getLegendLabel, getColor }),
        [data, getLegendLabel, getColor]
    )
    const legendsData: [LegendProps, ScatterPlotLegendDatum[]][] = useMemo(
        () =>
            legends.map(legend => [
                legend,
                computeLegendData({ legend, baseLegendData, hiddenIds, getColor }),
            ]),
        [legends, baseLegendData, hiddenIds, getColor]
    )

    return {
        xScale,
        yScale,
        nodes,
        legendsData,
        toggleSerie,
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
