import React from 'react'

import { Container, SvgWrapper, useValueFormatter, useTheme, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'

import {
    computeWeekdays,
    computeCellSize,
    computeCellPositions,
    computeMonthLegends,
} from './compute/timeRange'

import { useMonthLegends, useColorScale } from './hooks'
import { TimeRangeDay } from './TimeRangeDay'
import { CalendarMonthLegends } from './CalendarMonthLegends'
import { TimeRangeSvgProps } from './types'
import { timeRangeDefaultProps } from './props'

const InnerTimeRange = ({
    margin: partialMargin,
    width,
    height,

    square = timeRangeDefaultProps.square,
    colors = timeRangeDefaultProps.colors,
    colorScale,
    data,
    direction = timeRangeDefaultProps.direction,
    minValue = timeRangeDefaultProps.minValue,
    maxValue = timeRangeDefaultProps.maxValue,
    valueFormat,
    legendFormat,

    monthLegend = timeRangeDefaultProps.monthLegend,
    monthLegendOffset = timeRangeDefaultProps.monthLegendOffset,
    monthLegendPosition = timeRangeDefaultProps.monthLegendPosition,

    weekdayLegendsOffset = timeRangeDefaultProps.weekdayLegendsOffset,

    dayBorderColor = timeRangeDefaultProps.dayBorderColor,
    dayBorderWidth = timeRangeDefaultProps.dayBorderWidth,
    daySpacing = timeRangeDefaultProps.daySpacing,
    dayRadius = timeRangeDefaultProps.dayRadius,
    daysInRange = timeRangeDefaultProps.daysInRange,

    isInteractive = timeRangeDefaultProps.isInteractive,
    tooltip = timeRangeDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,

    legends = timeRangeDefaultProps.legends,
    role = timeRangeDefaultProps.role,
}: TimeRangeSvgProps) => {
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
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
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
                        onClick={onClick}
                        formatValue={formatValue}
                    />
                )
            })}
            <CalendarMonthLegends months={monthLegends} legend={monthLegend} theme={theme} />

            {legends.map((legend, i) => {
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
                    />
                )
            })}
        </SvgWrapper>
    )
}

export const TimeRange = ({
    isInteractive = timeRangeDefaultProps.isInteractive,
    renderWrapper,
    theme,
    ...props
}: TimeRangeSvgProps) => (
    <Container {...{ isInteractive, renderWrapper, theme }}>
        <InnerTimeRange isInteractive={isInteractive} {...props} />
    </Container>
)
