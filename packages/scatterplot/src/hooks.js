/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useMemo } from 'react'
import { useTheme } from '@nivo/core'
import { useOrdinalColorScale } from '@nivo/colors'
import { computeXYScalesForSeries } from '@nivo/scales'
import { computePoints, getSizeGenerator } from './compute'

const useSize = size => useMemo(() => getSizeGenerator(size), [size])

export const useScatterPlot = ({
    data,
    xScaleSpec,
    yScaleSpec,
    width,
    height,
    size,
    colors,
}) => {
    const {
        series,
        xScale,
        yScale,
    } = useMemo(
        () => computeXYScalesForSeries(data, xScaleSpec, yScaleSpec, width, height),
        [data, xScaleSpec, yScaleSpec, width, height]
    )

    const rawNodes = useMemo(
        () => computePoints({ series }),
        [series]
    )

    const getSize = useSize(size)

    const theme = useTheme()
    const getColor = useOrdinalColorScale(colors, 'serie.id')

    const nodes = useMemo(
        () => rawNodes.map(rawNode => {
            return {
                ...rawNode,
                size: getSize(rawNode.data),
                style: {
                    color: getColor(rawNode.data)
                }
            }
        }),
        [rawNodes, getSize, getColor]
    )

    return {
        xScale,
        yScale,
        nodes,
    }
}
