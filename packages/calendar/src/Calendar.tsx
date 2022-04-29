import { CalendarSvgProps } from './types'
import { Container, SvgWrapper, useTheme, useDimensions, useValueFormatter } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { CalendarYearLegends } from './CalendarYearLegends'
import { CalendarMonthPath } from './CalendarMonthPath'
import { CalendarMonthLegends, CalendarWeekdayLegends } from './CalendarLegends'
import { CalendarDay } from './CalendarDay'
import { calendarDefaultProps, timeRangeDefaultProps } from './props'
import {
    useMonthLegends,
    useYearLegends,
    useCalendarLayout,
    useDays,
    useColorScale,
    useWeekdayLegends,
} from './hooks'

const InnerCalendar = ({
    margin: partialMargin,
    width,
    height,

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

    dayBorderColor = calendarDefaultProps.dayBorderColor,
    dayBorderWidth = calendarDefaultProps.dayBorderWidth,
    daySpacing = calendarDefaultProps.daySpacing,

    weekdayLegend = timeRangeDefaultProps.weekdayLegend,
    weekdayLegendOffset = timeRangeDefaultProps.weekdayLegendOffset,
    weekdayLegendPosition = timeRangeDefaultProps.weekdayLegendPosition,
    weekdayTicks = calendarDefaultProps.weekdayTicks,

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
    const colorScaleFn = useColorScale({
        data,
        minValue,
        maxValue,
        colors,
        colorScale,
    })

    const { months, years, weekdays, ...rest } = useCalendarLayout({
        width: innerWidth,
        height: innerHeight,
        from,
        to,
        direction,
        yearSpacing,
        monthSpacing,
        daySpacing,
        align,
        weekdayTicks,
    })
    const days = useDays({
        days: rest.days,
        data,
        colorScale: colorScaleFn,
        emptyColor,
    })

    const monthLegends = useMonthLegends({
        months,
        direction,
        monthLegendPosition,
        monthLegendOffset,
    })
    const weekdayLegends = useWeekdayLegends({
        weekdays,
        direction,
        weekdayLegendPosition,
        weekdayLegendOffset,
    })
    const yearLegends = useYearLegends({
        years,
        direction,
        yearLegendPosition,
        yearLegendOffset,
    })

    const formatLegend = useValueFormatter(legendFormat)
    const formatValue = useValueFormatter(valueFormat)
    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {days.map(d => (
                <CalendarDay
                    key={d.date.toString()}
                    data={d}
                    x={d.x}
                    y={d.y}
                    size={d.width}
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
            <CalendarWeekdayLegends
                weekdays={weekdayLegends}
                legend={weekdayLegend}
                theme={theme}
            />

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
