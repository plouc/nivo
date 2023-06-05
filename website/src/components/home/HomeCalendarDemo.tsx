import React from 'react'
import styled from 'styled-components'
import { generateDayCounts } from '@bitbloom/nivo-generators'
import { Calendar } from '@bitbloom/nivo-calendar'
import { useHomeTheme } from './theme'
import { dimensions } from './dimensions'

const calendarFrom = new Date(2015, 3, 1)
const calendarTo = new Date(2017, 5, 1)
const calendarData = generateDayCounts(calendarFrom, calendarTo)

export const HomeCalendarDemo = () => {
    const { colors, nivoTheme } = useHomeTheme()

    return (
        <Container id="calendar">
            <Calendar
                width={dimensions.width}
                height={dimensions.height}
                margin={dimensions.margin}
                from={calendarFrom}
                to={calendarTo}
                data={calendarData}
                dayBorderWidth={1}
                yearSpacing={60}
                emptyColor={colors[1]}
                dayBorderColor={colors[3]}
                monthBorderColor={colors[3]}
                colors={[colors[0], colors[2]]}
                isInteractive={false}
                theme={nivoTheme}
            />
        </Container>
    )
}

const Container = styled.div`
    svg text {
        display: none;
    }
`
