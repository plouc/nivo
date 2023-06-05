import { useMemo } from 'react'
import { ScaleQuantize, scaleQuantize } from 'd3-scale'
import {
    computeDomain,
    computeYearLegendPositions,
    computeMonthLegendPositions,
    bindDaysData,
    computeLayout,
} from './compute/calendar'
import { BBox, CalendarSvgProps, ColorScale, Year } from './types'

export const useCalendarLayout = ({
    width,
    height,
    from,
    to,
    direction,
    yearSpacing,
    monthSpacing,
    daySpacing,
    align,
}: Pick<
    Required<CalendarSvgProps>,
    | 'width'
    | 'height'
    | 'from'
    | 'to'
    | 'direction'
    | 'yearSpacing'
    | 'monthSpacing'
    | 'daySpacing'
    | 'align'
>) =>
    useMemo(
        () =>
            computeLayout({
                width,
                height,
                from,
                to,
                direction,
                yearSpacing,
                monthSpacing,
                daySpacing,
                align,
            }),
        [width, height, from, to, direction, yearSpacing, monthSpacing, daySpacing, align]
    )

export const useColorScale = ({
    data,
    minValue,
    maxValue,
    colors,
    colorScale,
}: Pick<Required<CalendarSvgProps>, 'data' | 'minValue' | 'maxValue' | 'colors'> &
    Pick<CalendarSvgProps, 'colorScale'>) =>
    useMemo(() => {
        if (colorScale) return colorScale
        const domain = computeDomain(data, minValue, maxValue)
        const defaultColorScale = scaleQuantize<string>().domain(domain).range(colors)
        return defaultColorScale
    }, [data, minValue, maxValue, colors, colorScale])

export const useYearLegends = ({
    years,
    direction,
    yearLegendPosition,
    yearLegendOffset,
}: {
    years: Year[]
    direction: 'horizontal' | 'vertical'
    yearLegendPosition: 'before' | 'after'
    yearLegendOffset: number
}) =>
    useMemo(
        () =>
            computeYearLegendPositions({
                years,
                direction,
                position: yearLegendPosition,
                offset: yearLegendOffset,
            }),
        [years, direction, yearLegendPosition, yearLegendOffset]
    )

export const useMonthLegends = <Month extends { bbox: BBox }>({
    months,
    direction,
    monthLegendPosition,
    monthLegendOffset,
}: {
    months: Month[]
    direction: 'horizontal' | 'vertical'
    monthLegendPosition: 'before' | 'after'
    monthLegendOffset: number
}) =>
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

export const useDays = ({
    days,
    data,
    colorScale,
    emptyColor,
}: Pick<Required<CalendarSvgProps>, 'data' | 'emptyColor'> &
    Pick<Parameters<typeof bindDaysData>[0], 'days'> & {
        colorScale: ScaleQuantize<string> | ColorScale
    }) =>
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
