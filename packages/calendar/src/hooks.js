/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { useMemo } from 'react'
import { scaleQuantize } from 'd3-scale'
import { computeDomain, computeYearLegendPositions, computeMonthLegendPositions, bindDaysData, computeLayout } from './compute'
import { useTooltip } from '@nivo/tooltip'

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
}) =>
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
                align
            }),
        [width, height, from, to, direction, yearSpacing, monthSpacing, daySpacing, align]
    )

export const useColorScale = ({
    data, minValue, maxValue, colors, colorScale
}) =>
    useMemo(
        () => {
            if (colorScale) return colorScale
            const domain = computeDomain(data, minValue, maxValue)
            const defaultColorScale = scaleQuantize().domain(domain).range(colors)
            return defaultColorScale
        }, [data, minValue, maxValue, colors, colorScale]
    )

export const useYearLegends = ({
    years, direction, yearLegendPosition, yearLegendOffset
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

export const useMonthLegends = ({
    months, direction, monthLegendPosition, monthLegendOffset
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
    days, data, colorScale, emptyColor
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


export const useDaysHandlers = ({
    data,
    isInteractive,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
    tooltip
}) => {
    const { showTooltipFromEvent, hideTooltip } = useTooltip()

    const handleMouseEnter = useMemo(() => {
        return event => {
            // const formatedData = { ...data, value: formatValue(data.value) }
            showTooltipFromEvent(React.createElement(tooltip, { data }), event)
            onMouseEnter && onMouseEnter(data, event)
        }
    }, [data, onMouseEnter, showTooltipFromEvent, tooltip])

    const handleMouseMove = useMemo(() => {
        return event => {
            // const formatedData = { ...data, value: formatValue(data.value) }
            showTooltipFromEvent(React.createElement(tooltip, { data }), event)
            onMouseMove && onMouseMove(data, event)
        }
    }, [data, onMouseMove, showTooltipFromEvent, tooltip])

    const handleMouseLeave = useMemo(() => {
        return event => {
            hideTooltip()
            onMouseLeave && onMouseLeave(data, event)
        }
    }, [data, onMouseLeave, hideTooltip])

    const handleClick = useMemo(() => {
        return event => {
            onClick && onClick(data, event)
        }
    }, [data, onClick])

    const handlers = useMemo(
        () => ({
            onMouseEnter: isInteractive ? handleMouseEnter : undefined,
            onMouseMove: isInteractive ? handleMouseMove : undefined,
            onMouseLeave: isInteractive ? handleMouseLeave : undefined,
            onClick: isInteractive ? handleClick : undefined,
        }),
        [isInteractive, handleMouseEnter, handleMouseMove, handleMouseLeave, handleClick]
    )

    return handlers
}