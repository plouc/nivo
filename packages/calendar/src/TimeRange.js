import React from 'react'
import { timeFormat } from 'd3-time-format'

import { SvgWrapper, withContainer, useValueFormatter, useTheme, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'

import {
    Direction,
    computeWeekdays,
    computeCellSize,
    computeCellPositions,
    computeMonthLegends,
} from './compute-timeRange'

import { useMonthLegends, useColorScale } from './hooks'
import TimeRangeDay from './TimeRangeDay'
import CalendarTooltip from './CalendarTooltip'
import CalendarMonthLegends from './CalendarMonthLegends'

const monthLabelFormat = timeFormat('%b')

const TimeRange = ({
    margin: partialMargin,
    width,
    height,

    square,
    colors = ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    colorScale,
    data,
    direction = Direction.HORIZONTAL,
    minValue = 0,
    maxValue = 'auto',
    valueFormat,
    legendFormat,
    role,
    tooltip = CalendarTooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    isInteractive = true,
    legends = [],
    dayBorderColor = '#fff',
    dayBorderWidth = 0,
    dayRadius = 0,
    daySpacing,
    daysInRange,
    weekdayLegendsOffset,
    monthLegend = (_year, _month, date) => monthLabelFormat(date),
    monthLegendOffset = 0,
    monthLegendPosition = 'before',
}) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const theme = useTheme()
    const colorScaleFn = useColorScale({ data, minValue, maxValue, colors, colorScale })

    const { cellHeight, cellWidth } = computeCellSize({
        square,
        offset: weekdayLegendsOffset,
        totalDays: data.length + data[0].date.getDay(),
        width: innerWidth,
        height: innerHeight,
        daySpacing,
        direction,
    })

    const days = computeCellPositions({
        offset: weekdayLegendsOffset,
        daysInRange,
        colorScale: colorScaleFn,
        cellHeight,
        cellWidth,
        data,
        direction,
        daySpacing,
    })

    // map the days and reduce the month
    const months = Object.values(
        computeMonthLegends({
            daySpacing,
            direction,
            cellHeight,
            cellWidth,
            days,
            daysInRange,
        }).months
    )

    const weekdayLegends = computeWeekdays({
        direction,
        cellHeight,
        cellWidth,
        daySpacing,
    })

    const monthLegends = useMonthLegends({
        months,
        direction,
        monthLegendPosition,
        monthLegendOffset,
    })

    const formatValue = useValueFormatter(valueFormat)
    const formatLegend = useValueFormatter(legendFormat)

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            role={role}
            theme={theme}
        >
            {weekdayLegends.map(legend => (
                <text
                    key={legend.value}
                    transform={`translate(${legend.x},${legend.y}) rotate(${legend.rotation})`}
                    textAnchor="left"
                    style={theme.labels.text}
                >
                    {legend.value}
                </text>
            ))}
            {days.map(d => {
                return (
                    <TimeRangeDay
                        key={d.day.toString()}
                        data={d}
                        x={d.coordinates.x}
                        rx={dayRadius}
                        y={d.coordinates.y}
                        ry={dayRadius}
                        spacing={daySpacing}
                        width={cellWidth}
                        height={cellHeight}
                        color={d.color}
                        borderWidth={dayBorderWidth}
                        borderColor={dayBorderColor}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onMouseMove={onMouseMove}
                        isInteractive={isInteractive}
                        tooltip={tooltip}
                        theme={theme}
                        onClick={onClick}
                        formatValue={formatValue}
                    />
                )
            })}
            <CalendarMonthLegends months={monthLegends} legend={monthLegend} theme={theme} />

            {legends?.map((legend, i) => {
                const legendData = colorScaleFn.ticks(legend.itemCount).map(value => ({
                    id: value,
                    label: formatLegend(value),
                    color: colorScaleFn(value),
                }))

                return (
                    <BoxLegendSvg
                        key={i}
                        {...legend}
                        containerWidth={width}
                        containerHeight={height}
                        data={legendData}
                        theme={theme}
                    />
                )
            })}
        </SvgWrapper>
    )
}

export default withContainer(TimeRange)
