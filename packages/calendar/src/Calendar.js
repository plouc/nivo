/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { SvgWrapper, useTheme, useDimensions, withContainer, useValueFormatter } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { CalendarPropTypes, CalendarDefaultProps } from './props'
import CalendarYearLegends from './CalendarYearLegends'
import CalendarMonthPath from './CalendarMonthPath'
import CalendarMonthLegends from './CalendarMonthLegends'
import { useMonthLegends, useYearLegends, useCalendarLayout, useDays, useColorScale } from './hooks'
import CalendarDay from './CalendarDay'

const Calendar = ({
    margin: partialMargin,
    width,
    height,

    align,
    colors,
    colorScale,
    data,
    direction,
    emptyColor,
    from,
    to,
    minValue,
    maxValue,
    valueFormat,
    legendFormat,

    yearLegend,
    yearLegendOffset,
    yearLegendPosition,
    yearSpacing,

    monthBorderColor,
    monthBorderWidth,
    monthLegend,
    monthLegendOffset,
    monthLegendPosition,
    monthSpacing,

    dayBorderColor,
    dayBorderWidth,
    daySpacing,

    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,

    legends,
}) => {
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

    return (
        <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
            {days.map(d => (
                <CalendarDay
                    key={d.date.toString()}
                    data={d}
                    x={d.x}
                    y={d.y}
                    size={d.size}
                    spacing={daySpacing}
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
                        theme={theme}
                    />
                )
            })}
        </SvgWrapper>
    )
}

Calendar.displayName = 'Calendar'
Calendar.defaultProps = CalendarDefaultProps
Calendar.propTypes = CalendarPropTypes

export default withContainer(Calendar)
