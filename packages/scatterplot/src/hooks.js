/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { useAnnotations } from '@nivo/annotations'
import { computePoints, getNodeSizeGenerator } from './compute'

const useNodeSize = size => useMemo(() => getNodeSizeGenerator(size), [size])

export const useScatterPlot = ({
    data,
    xScaleSpec,
    xFormat,
    yScaleSpec,
    yFormat,
    width,
    height,
    nodeSize,
    colors,
}) => {
    const { series, xScale, yScale } = useMemo(
        () => computeXYScalesForSeries(data, xScaleSpec, yScaleSpec, width, height),
        [data, xScaleSpec, yScaleSpec, width, height]
    )

    const formatX = useValueFormatter(xFormat)
    const formatY = useValueFormatter(yFormat)
    const rawNodes = useMemo(() => computePoints({ series, formatX, formatY }), [
        series,
        formatX,
        formatY,
    ])

    const getNodeSize = useNodeSize(nodeSize)

    const getColor = useOrdinalColorScale(colors, 'serieId')

    const nodes = useMemo(
        () =>
            rawNodes.map(rawNode => {
                return {
                    ...rawNode,
                    size: getNodeSize(rawNode.data),
                    style: {
                        color: getColor(rawNode.data),
                    },
                }
            }),
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

export const useScatterPlotAnnotations = (items, annotations) =>
    useAnnotations({
        items,
        annotations,
        getDimensions: (node, offset) => {
            const size = node.size + offset * 2
            return { size, width: size, height: size }
        },
    })
