import { useMemo } from 'react'
import { Container, SvgWrapper, useValueFormatter, useTheme, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import {
    computeWeekdays,
    computeCellSize,
    computeCellPositions,
    computeMonthLegends,
    computeTotalDays,
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
    emptyColor = timeRangeDefaultProps.emptyColor,
    from,
    to,
    data: _data,
    direction = timeRangeDefaultProps.direction,
    minValue = timeRangeDefaultProps.minValue,
    maxValue = timeRangeDefaultProps.maxValue,
    valueFormat,
    legendFormat,

    monthLegend = timeRangeDefaultProps.monthLegend,
    monthLegendOffset = timeRangeDefaultProps.monthLegendOffset,
    monthLegendPosition = timeRangeDefaultProps.monthLegendPosition,

    weekdayLegendOffset = timeRangeDefaultProps.weekdayLegendOffset,
    weekdayTicks,

    dayBorderColor = timeRangeDefaultProps.dayBorderColor,
    dayBorderWidth = timeRangeDefaultProps.dayBorderWidth,
    daySpacing = timeRangeDefaultProps.daySpacing,
    dayRadius = timeRangeDefaultProps.dayRadius,

    isInteractive = timeRangeDefaultProps.isInteractive,
    tooltip = timeRangeDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,

    legends = timeRangeDefaultProps.legends,
    role = timeRangeDefaultProps.role,

    firstWeekday = timeRangeDefaultProps.firstWeekday,
}: TimeRangeSvgProps) => {
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )

    const data = useMemo(
        () =>
            _data
                .map(data => ({ ...data, date: new Date(`${data.day}T00:00:00`) }))
                .sort((left, right) => left.day.localeCompare(right.day)),
        [_data]
    )

    const theme = useTheme()
    const colorScaleFn = useColorScale({ data, minValue, maxValue, colors, colorScale })

    const totalDays = computeTotalDays({
        from,
        to,
        data,
    })

    const { cellHeight, cellWidth } = computeCellSize({
        square,
        offset: weekdayLegendOffset,
        totalDays: totalDays,
        width: innerWidth,
        height: innerHeight,
        daySpacing,
        direction,
    })

    const days = computeCellPositions({
        offset: weekdayLegendOffset,
        colorScale: colorScaleFn,
        emptyColor,
        cellHeight,
        cellWidth,
        from,
        to,
        data,
        direction,
        daySpacing,
        firstWeekday,
    })

    // map the days and reduce the month
    const months = Object.values(
        computeMonthLegends({
            daySpacing,
            direction,
            cellHeight,
            cellWidth,
            days,
        }).months
    )

    const weekdayLegends = computeWeekdays({
        direction,
        cellHeight,
        cellWidth,
        daySpacing,
        ticks: weekdayTicks,
        firstWeekday,
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
                        key={d.date.toString()}
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
