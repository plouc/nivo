import { useMemo } from 'react'
import { Container, SvgWrapper, useValueFormatter, useTheme, useDimensions } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { computeTotalDays } from './compute/timeRange'
import {
    useMonthLegends,
    useWeekdayLegends,
    useColorScale,
    useTimeRangeLayout,
    useDays,
} from './hooks'
import { TimeRangeDay } from './TimeRangeDay'
import { CalendarMonthLegends, CalendarWeekdayLegends } from './CalendarLegends'
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

    weekdayLegend = timeRangeDefaultProps.weekdayLegend,
    weekdayLegendOffset = timeRangeDefaultProps.weekdayLegendOffset,
    weekdayLegendPosition = timeRangeDefaultProps.weekdayLegendPosition,
    weekdayTicks = timeRangeDefaultProps.weekdayTicks,

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
}: TimeRangeSvgProps) => {
    const theme = useTheme()
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

    const colorScaleFn = useColorScale({
        data,
        minValue,
        maxValue,
        colors,
        colorScale,
    })

    const { startDate, endDate, totalDays } = computeTotalDays({
        from,
        to,
        data,
    })
    const { months, weekdays, ...rest } = useTimeRangeLayout({
        square,
        width: innerWidth,
        height: innerHeight,
        totalDays,
        from: startDate,
        to: endDate,
        direction,
        daySpacing,
        weekdayTicks,
    })
    const days = useDays({ days: rest.days, data, colorScale: colorScaleFn, emptyColor })

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

    const formatValue = useValueFormatter(valueFormat)
    const formatLegend = useValueFormatter(legendFormat)

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} role={role}>
            {days.map(d => {
                return (
                    <TimeRangeDay
                        key={d.date.toString()}
                        data={d}
                        x={d.x}
                        rx={dayRadius}
                        y={d.y}
                        ry={dayRadius}
                        width={d.width}
                        height={d.height}
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
