/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Container, SvgWrapper } from '@nivo/core'
import { BoxLegendSvg } from '@nivo/legends'
import { setDisplayName } from 'recompose'
import { CalendarPropTypes } from './props'
import { DIRECTION_HORIZONTAL } from './constants'
import enhance from './enhance'
import CalendarDay from './CalendarDay'
import CalendarMonthPath from './CalendarMonthPath'
import CalendarMonthLegends from './CalendarMonthLegends'

const Calendar = ({
    colorScale,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    direction,

    yearLegend,
    yearLegendOffset,

    monthLegend,
    monthLegendPosition,
    monthBorderWidth,
    monthBorderColor,
    monthLegendOffset,

    daySpacing,
    dayBorderWidth,
    dayBorderColor,

    theme,

    isInteractive,
    tooltipFormat,
    tooltip,
    onClick,

    legends,

    years,
    months,
    days,
}) => {
    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
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
                    <CalendarMonthLegends
                        months={months}
                        direction={direction}
                        legend={monthLegend}
                        position={monthLegendPosition}
                        offset={monthLegendOffset}
                        theme={theme}
                    />
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
                                style={theme.labels.text}
                            >
                                {yearLegend(year.year)}
                            </text>
                        )
                    })}
                    {legends.map((legend, i) => {
                        const legendData = colorScale.ticks(legend.itemCount).map(value => ({
                            id: value,
                            label: value,
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
            )}
        </Container>
    )
}

Calendar.propTypes = CalendarPropTypes

export default setDisplayName('Calendar')(enhance(Calendar))
