import { useCallback, useMemo, useState } from 'react'
import { useValueFormatter, usePropertyAccessor } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { LegendProps } from '@nivo/legends'
import { useAnnotations } from '@nivo/annotations'
import { computePoints, getNodeSizeGenerator } from './compute'
import {
    ScatterPlotCommonProps,
    ScatterPlotDataProps,
    ScatterPlotDatum,
    ScatterPlotLegendDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
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

    const { series, xScale, yScale } = useMemo(
        () =>
            computeXYScalesForSeries<{ id: string | number }, RawDatum>(
                data.filter(serie => !hiddenIds.includes(String(serie.id))),
                xScaleSpec,
                yScaleSpec,
                width,
                height
            ),
        [data, hiddenIds, xScaleSpec, yScaleSpec, width, height]
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
    const getLegendLabel = usePropertyAccessor<ScatterPlotRawSerie<RawDatum>, string>(
        legendLabel ?? 'id'
    )

    const nodes: ScatterPlotNodeData<RawDatum>[] = useMemo(
        () =>
            rawNodes.map(rawNode => ({
                ...rawNode,
                size: getNodeSize(rawNode),
                color: getColor({ serieId: rawNode.serieId }),
            })),
        [rawNodes, getNodeSize, getColor]
    )

    const legendData: ScatterPlotLegendDatum[] = useMemo(
        () =>
            data.map(d => {
                const hidden = hiddenIds.includes(String(d.id))
                return {
                    id: d.id,
                    label: getLegendLabel(d),
                    color: hidden ? '#000' : getColor({ serieId: d.id }),
                    hidden: hidden,
                }
            }),
        [data, hiddenIds, getLegendLabel, getColor]
    )

    const legendsData: [LegendProps, ScatterPlotLegendDatum[]][] = useMemo(
        () =>
            legends.map(legend => {
                // for legend items, prefer to use provided array of items
                // otherwise fallback to displaying info for all series from legendData
                const computedData = legend.data
                    ? legend.data.map(d => {
                          const hidden = hiddenIds.includes(String(d.id))
                          const color = hidden ? '#000' : getColor({ serieId: d.id }) ?? d.color
                          return { id: d.id, label: String(d.label), color, hidden }
                      })
                    : legendData
                return [legend, computedData]
            }),
        [legends, hiddenIds, legendData, getColor]
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
