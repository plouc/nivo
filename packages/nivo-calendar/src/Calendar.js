/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { BoxLegendSvg } from '@nivo/legends'
import setDisplayName from 'recompose/setDisplayName'
import computeCalendar from './computeCalendar'
import { CalendarPropTypes } from './props'
import { DIRECTION_HORIZONTAL } from './constants'
import CalendarDay from './CalendarDay'
import CalendarMonthPath from './CalendarMonthPath'
import { Container, SvgWrapper } from '@nivo/core'
import enhance from './enhance'

const Calendar = ({
    data,
    from,
    to,

    colorScale,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    direction,

    // years
    yearLegend,
    yearSpacing,
    yearLegendOffset,

    // months
    monthLegend,
    monthBorderWidth,
    monthBorderColor,
    monthLegendOffset,

    // days
    daySpacing,
    dayBorderWidth,
    dayBorderColor,
    emptyColor,

    theme,

    // interactivity
    isInteractive,
    tooltipFormat,
    tooltip,
    onClick,

    legends,
}) => {
    const { years, months, days } = computeCalendar({
        width,
        height,
        from,
        to,
        data,
        direction,
        colorScale,
        emptyColor,
        yearSpacing,
        daySpacing,
    })

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
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
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            tooltipFormat={tooltipFormat}
                            tooltip={tooltip}
                            theme={theme}
                            onClick={onClick}
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
                    {months.map(month => {
                        let transform
                        if (direction === DIRECTION_HORIZONTAL) {
                            transform = `translate(${month.bbox.x + month.bbox.width / 2},${month
                                .bbox.y - monthLegendOffset})`
                        } else {
                            transform = `translate(${month.bbox.x - monthLegendOffset},${month.bbox
                                .y +
                                month.bbox.height / 2}) rotate(-90)`
                        }

                        return (
                            <text
                                key={`${month.date.toString()}.legend`}
                                className="nivo_calendar_month_legend"
                                transform={transform}
                                textAnchor="middle"
                            >
                                {monthLegend(month.year, month.month, month.date)}
                            </text>
                        )
                    })}
                    {years.map(year => {
                        let transform
                        if (direction === DIRECTION_HORIZONTAL) {
                            transform = `translate(${year.bbox.x - yearLegendOffset},${year.bbox.y +
                                year.bbox.height / 2}) rotate(-90)`
                        } else {
                            transform = `translate(${year.bbox.x + year.bbox.width / 2},${year.bbox
                                .y - yearLegendOffset})`
                        }

                        return (
                            <text
                                key={year.year}
                                className="nivo_calendar_year_legend"
                                transform={transform}
                                textAnchor="middle"
                            >
                                {yearLegend(year.year)}
                            </text>
                        )
                    })}
                    {legends.map((legend, i) => {
                        const legendData = colorScale.ticks(legend.itemCount).map(value => ({
                            label: value,
                            fill: colorScale(value),
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
            )}
        </Container>
    )
}

Calendar.propTypes = CalendarPropTypes

export default setDisplayName('Calendar')(enhance(Calendar))
