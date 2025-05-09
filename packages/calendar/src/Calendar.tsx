import { Container, SvgWrapper, useDimensions, useValueFormatter } from '@nivo/core'
import { useTheme } from '@nivo/theming'
import { BoxLegendSvg } from '@nivo/legends'
import { CalendarSvgProps } from './types'
import { CalendarYearLegends } from './CalendarYearLegends'
import { CalendarMonthPath } from './CalendarMonthPath'
import { CalendarMonthLegends } from './CalendarMonthLegends'
import { CalendarDay } from './CalendarDay'
import { calendarDefaultProps } from './props'
import { useMonthLegends, useYearLegends, useCalendarLayout, useDays, useColorScale } from './hooks'
import { computeCellSize, computeTotalDays } from './compute/timeRange'
import { computeWeekdays } from './compute/calendar'
import { useMemo } from 'react'
import { Text } from '@nivo/text'

const InnerCalendar = ({
    margin: partialMargin,
    width,
    height,

    square = calendarDefaultProps.square,
    align = calendarDefaultProps.align,
    colors = calendarDefaultProps.colors,
    colorScale,
    data,
    direction = calendarDefaultProps.direction,
    emptyColor = calendarDefaultProps.emptyColor,
    from,
    to,
    minValue = calendarDefaultProps.minValue,
    maxValue = calendarDefaultProps.maxValue,
    valueFormat,
    legendFormat,

    yearLegend = calendarDefaultProps.yearLegend,
    yearLegendOffset = calendarDefaultProps.yearLegendOffset,
    yearLegendPosition = calendarDefaultProps.yearLegendPosition,
    yearSpacing = calendarDefaultProps.yearSpacing,

    monthBorderColor = calendarDefaultProps.monthBorderColor,
    monthBorderWidth = calendarDefaultProps.monthBorderWidth,
    monthLegend = calendarDefaultProps.monthLegend,
    monthLegendOffset = calendarDefaultProps.monthLegendOffset,
    monthLegendPosition = calendarDefaultProps.monthLegendPosition,
    monthSpacing = calendarDefaultProps.monthSpacing,

    weekdayLegendOffset = calendarDefaultProps.weekdayLegendOffset,
    weekdayTicks,
    weekdays = calendarDefaultProps.weekdays,
    firstWeekday = calendarDefaultProps.firstWeekday,

    dayBorderColor = calendarDefaultProps.dayBorderColor,
    dayBorderWidth = calendarDefaultProps.dayBorderWidth,
    daySpacing = calendarDefaultProps.daySpacing,

    isInteractive = calendarDefaultProps.isInteractive,
    tooltip = calendarDefaultProps.tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,

    legends = calendarDefaultProps.legends,
    role = calendarDefaultProps.role,
}: CalendarSvgProps) => {
    const theme = useTheme()
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    const { months, years, ...rest } = useCalendarLayout({
        width: innerWidth,
        height: innerHeight,
        from,
        to,
        direction,
        yearSpacing,
        monthSpacing,
        daySpacing,
        align,
    })
    const colorScaleFn = useColorScale({ data, minValue, maxValue, colors, colorScale })
    const monthLegends = useMonthLegends({
        months,
        direction,
        monthLegendPosition,
        monthLegendOffset,
    })
    const yearLegends = useYearLegends({ years, direction, yearLegendPosition, yearLegendOffset })
    const days = useDays({ days: rest.days, data, colorScale: colorScaleFn, emptyColor })
    const formatLegend = useValueFormatter(legendFormat)
    const formatValue = useValueFormatter(valueFormat)

    const dayData = useMemo(
        () =>
            data
                .map(data => ({ ...data, date: new Date(`${data.day}T00:00:00`) }))
                .sort((left, right) => left.day.localeCompare(right.day)),
        [data]
    )

    const totalDays = computeTotalDays({
        from,
        to,
        data: dayData,
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

    const weekdayLegends = computeWeekdays({
        direction,
        cellHeight,
        cellWidth,
        daySpacing,
        ticks: weekdayTicks,
        firstWeekday,
        arrayOfWeekdays: weekdays,
    })

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {weekdayLegends.map(legend => (
                <Text
                    key={`${legend.value}-${legend.x}-${legend.y}`}
                    transform={`translate(${legend.x},${legend.y}) rotate(${legend.rotation})`}
                    textAnchor="left"
                    style={theme.labels.text}
                >
                    {legend.value}
                </Text>
            ))}
            {days.map(d => (
                <CalendarDay
                    key={d.date.toString()}
                    data={d}
                    x={d.x}
                    y={d.y}
                    size={d.size}
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
            ))}
            {months.map(m => (
                <CalendarMonthPath
                    key={m.date.toString()}
                    path={m.path}
                    borderWidth={monthBorderWidth}
                    borderColor={monthBorderColor}
                />
            ))}
            <CalendarMonthLegends months={monthLegends} legend={monthLegend} theme={theme} />
            <CalendarYearLegends years={yearLegends} legend={yearLegend} theme={theme} />
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

export const Calendar = ({
    isInteractive = calendarDefaultProps.isInteractive,
    renderWrapper,
    theme,
    ...props
}: CalendarSvgProps) => (
    <Container {...{ isInteractive, renderWrapper, theme }}>
        <InnerCalendar isInteractive={isInteractive} {...props} />
    </Container>
)
