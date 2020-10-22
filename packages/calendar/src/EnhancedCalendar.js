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

import CalendarBlockLegends from './CalendarBlockLegends'
import CalendarMonthPath from './CalendarMonthPath'
import CalendarMonthLegends from './CalendarMonthLegends'

import { useCalendarLayout } from './enhancedHooks'
import { useMonthLegends, useBlockLegends, useDays, useColorScale } from './sharedHooks'
import CalendarDay from './CalendarDay'
import { EnhancedCalendarPropTypes, EnhancedCalendarDefaultProps } from './enhancedProps'

const EnhancedCalendar = ({
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

    blockLegend,
    blockLegendOffset,
    blockLegendPosition,
    blockSpacing,

    monthBorderColor,
    monthBorderWidth,
    monthLegend,
    monthLegendOffset,
    monthLegendPosition,
    monthSpacing,

    dayBorderColor,
    dayBorderWidth,
    daySpacing,

    granularity,
    weekDirection,
    breakpoint,

    isInteractive,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,

    legends,
    role,
}) => {
    const theme = useTheme()
    const { margin, innerWidth, innerHeight, outerWidth, outerHeight } = useDimensions(
        width,
        height,
        partialMargin
    )
    let { months, blocks, days } = useCalendarLayout({
        width: innerWidth,
        height: innerHeight,
        from,
        to,
        direction,
        blockSpacing,
        monthSpacing,
        daySpacing,
        align,
        granularity,
        weekDirection,
        breakpoint,
    })
    colorScale = useColorScale({ data, minValue, maxValue, colors, colorScale })
    const monthLegends = useMonthLegends({
        months,
        direction,
        monthLegendPosition,
        monthLegendOffset,
    })
    const blockLegends = useBlockLegends({
        blocks,
        direction,
        blockLegendPosition,
        blockLegendOffset,
    })
    days = useDays({ days, data, colorScale, emptyColor })
    const formatLegend = useValueFormatter(legendFormat)
    const formatValue = useValueFormatter(valueFormat)

    return (
        <SvgWrapper
            width={outerWidth}
            height={outerHeight}
            margin={margin}
            theme={theme}
            role={role}
        >
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
            <CalendarBlockLegends blocks={blockLegends} legend={blockLegend} theme={theme} />
            {legends.map((legend, i) => {
                const legendData = colorScale.ticks(legend.itemCount).map(value => ({
                    id: value,
                    label: formatLegend(value),
                    color: colorScale(value),
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

EnhancedCalendar.displayName = 'EnhancedCalendar'
EnhancedCalendar.defaultProps = EnhancedCalendarDefaultProps
EnhancedCalendar.propTypes = EnhancedCalendarPropTypes

export default withContainer(EnhancedCalendar)
