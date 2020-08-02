/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateDayCounts } from '@nivo/generators'
import { ResponsiveCalendarCanvas } from '@nivo/calendar'
import { HomeItem, HomeItemLabel } from './styled'

const calendarFrom = new Date(2015, 3, 1)
const calendarTo = new Date(2016, 5, 1)
const calendarData = generateDayCounts(calendarFrom, calendarTo)

const HomeCalendar = ({ colors, nivoTheme }) => {
    return (
        <HomeItem to="/calendar">
            <ResponsiveCalendarCanvas
                margin={{ top: 20, right: 2, bottom: 2, left: 20 }}
                from={calendarFrom}
                to={calendarTo}
                data={calendarData}
                dayBorderWidth={1}
                yearSpacing={50}
                yearLegendSpacing={6}
                emptyColor={colors[1]}
                dayBorderColor={colors[3]}
                monthBorderColor={colors[3]}
                colors={[colors[0], colors[2]]}
                isInteractive={false}
                theme={nivoTheme}
            />
            <HomeItemLabel>
                <span>Calendar documentation</span>
            </HomeItemLabel>
        </HomeItem>
    )
}

export default HomeCalendar
