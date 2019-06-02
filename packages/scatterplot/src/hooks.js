/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { useTheme, useValueFormatter } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
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

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'serie.id')

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

    return {
        xScale,
        yScale,
        nodes,
    }
}
