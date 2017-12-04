/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { minBy, maxBy } from 'lodash'
import { scaleQuantize } from 'd3-scale'
import computeCalendar from '../../../lib/charts/calendar/CalendarLayout'
import { CalendarPropTypes } from './props'
import StaticCalendar from './StaticCalendar'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import enhance from './enhance'

const Calendar = ({
    data,
    from,
    to,

    domain,
    colors,

    // dimensions
    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    onDayClick,
    direction,
    emptyColor,
    yearSpacing,
    yearLegendOffset,
    daySpacing,
    dayBorderWidth,
    dayBorderColor,
    monthBorderWidth,
    monthBorderColor,
    monthLegendOffset,

    theme,
}) => {
    let colorDomain
    if (domain === 'auto') {
        colorDomain = [minBy(data, 'value').value, maxBy(data, 'value').value]
    } else {
        colorDomain = [...domain]
    }

    const colorScale = scaleQuantize()
        .domain(colorDomain)
        .range(colors)

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
        <Container isInteractive={false} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin}>
                    <StaticCalendar
                        onDayClick={onDayClick}
                        direction={direction}
                        years={years}
                        months={months}
                        days={days}
                        yearLegendOffset={yearLegendOffset}
                        dayBorderWidth={dayBorderWidth}
                        dayBorderColor={dayBorderColor}
                        monthBorderWidth={monthBorderWidth}
                        monthBorderColor={monthBorderColor}
                        monthLegendOffset={monthLegendOffset}
                    />
                </SvgWrapper>
            )}
        </Container>
    )
}

Calendar.propTypes = CalendarPropTypes

export default enhance(Calendar)
