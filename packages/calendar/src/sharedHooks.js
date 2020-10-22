import {
    computeDomain,
    computeBlockLegendPositions,
    bindDaysData,
    computeMonthLegendPositions,
} from './sharedCompute'
import { useMemo } from 'react'
import { scaleQuantize } from 'd3-scale'

export const useColorScale = ({ data, minValue, maxValue, colors, colorScale }) =>
    useMemo(() => {
        if (colorScale) return colorScale
        const domain = computeDomain(data, minValue, maxValue)
        const defaultColorScale = scaleQuantize().domain(domain).range(colors)
        return defaultColorScale
    }, [data, minValue, maxValue, colors, colorScale])

export const useBlockLegends = ({ blocks, direction, blockLegendPosition, blockLegendOffset }) =>
    useMemo(
        () =>
            computeBlockLegendPositions({
                blocks,
                direction,
                position: blockLegendPosition,
                offset: blockLegendOffset,
            }),
        [blocks, direction, blockLegendPosition, blockLegendOffset]
    )

export const useDays = ({ days, data, colorScale, emptyColor }) =>
    useMemo(
        () =>
            bindDaysData({
                days,
                data,
                colorScale,
                emptyColor,
            }),
        [days, data, colorScale, emptyColor]
    )

export const useMonthLegends = ({ months, direction, monthLegendPosition, monthLegendOffset }) =>
    useMemo(
        () =>
            computeMonthLegendPositions({
                months,
                direction,
                position: monthLegendPosition,
                offset: monthLegendOffset,
            }),
        [months, direction, monthLegendPosition, monthLegendOffset]
    )
