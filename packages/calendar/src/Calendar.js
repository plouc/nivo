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
import enhance from './enhance'
import CalendarYearLegends from './CalendarYearLegends'
import CalendarMonthPath from './CalendarMonthPath'
import CalendarMonthLegends from './CalendarMonthLegends'
import CalendarDay from './CalendarDay'

const Calendar = ({
    colorScale,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    yearLegends,
    yearLegend,

    monthLegends,
    monthLegend,
    monthBorderWidth,
    monthBorderColor,

    daySpacing,
    dayBorderWidth,
    dayBorderColor,

    theme,

    isInteractive,
    tooltipFormat,
    tooltip,
    onClick,

    legends,

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
                        months={monthLegends}
                        legend={monthLegend}
                        theme={theme}
                    />
                    <CalendarYearLegends years={yearLegends} legend={yearLegend} theme={theme} />
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

Calendar.displayName = 'Calendar'
Calendar.propTypes = CalendarPropTypes

export default setDisplayName('Calendar')(enhance(Calendar))
