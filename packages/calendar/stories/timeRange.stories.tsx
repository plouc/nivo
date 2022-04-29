import { storiesOf } from '@storybook/react'
import { withKnobs, number, date, boolean, color } from '@storybook/addon-knobs'
import { generateOrderedDayCounts, generateDayCounts } from '@nivo/generators'

import { TimeRange, ResponsiveTimeRange } from '../src'

const stories = storiesOf('TimeRange', module)

stories.addDecorator(withKnobs)

stories.add('horizontal', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 1, 18)))
    return (
        <TimeRange
            {...{
                square: boolean('square', true),
                dayRadius: number('dayRadius', 5),
                formatValue: value => value,
                margin: {
                    top: number('margin-top', 40),
                    right: number('margin-right', 40),
                    bottom: number('margin-bottom', 40),
                    left: number('margin-left', 115),
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 0),
            }}
            monthLegendOffset={10}
            dayBorderWidth={1}
            height={number('height', 250)}
            width={number('width', 655)}
            legendFormat={value => value / 10 + 'M'}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    translateY: -30,
                },
            ]}
        />
    )
})

const frenchMonths = [
    'janv.',
    'févr.',
    'mars',
    'avr.',
    'mai',
    'juin',
    'juil.',
    'août',
    'sept.',
    'oct.',
    'nov.',
    'déc.',
]
const frenchWeekdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
stories.add('translating labels', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 1, 18)))
    return (
        <TimeRange
            {...{
                square: boolean('square', true),
                dayRadius: number('dayRadius', 5),
                formatValue: value => value,
                margin: {
                    top: number('margin-top', 40),
                    right: number('margin-right', 40),
                    bottom: number('margin-bottom', 40),
                    left: number('margin-left', 115),
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 0),
            }}
            monthLegend={(year, month) => frenchMonths[month]}
            monthLegendOffset={10}
            monthLegendPosition={'before'}
            dayBorderWidth={2}
            weekdayTicks={[0, 2, 4, 6]}
            weekdayLegend={day => frenchWeekdays[day]}
            height={number('height', 250)}
            width={number('width', 655)}
        />
    )
})

stories.add('label position', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 1, 18)))
    return (
        <TimeRange
            {...{
                square: boolean('square', true),
                dayRadius: number('dayRadius', 5),
                formatValue: value => value,
                margin: {
                    top: 40,
                    right: 100,
                    bottom: 60,
                    left: 40,
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 0),
            }}
            monthLegendOffset={16}
            monthLegendPosition={'after'}
            weekdayLegendPosition={'after'}
            weekdayLegendOffset={10}
            weekdayTicks={[0, 1, 2, 3, 4, 5, 6]}
            dayBorderWidth={0.5}
            dayRadius={0}
            dayBorderColor={'#111111'}
            height={number('height', 250)}
            width={number('width', 655)}
        />
    )
})

stories.add('responsive', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 1, 18)))

    return (
        <div
            style={{
                height: number('height', 250),
                width: number('width', 655),
            }}
        >
            <ResponsiveTimeRange
                legendFormat={value => value / 10 + 'M'}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        translateY: -30,
                    },
                ]}
                weekdayTicks={[]} // hide weekday tickmarks
                {...{
                    dayRadius: number('dayRadius', 5),
                    formatValue: value => value,
                    margin: {
                        top: number('margin-top', 40),
                        right: number('margin-right', 40),
                        bottom: number('margin-bottom', 40),
                        left: number('margin-left', 40),
                    },
                    data: generateOrderedDayCounts(from, to),
                    daySpacing: number('daySpacing', 10),
                }}
            />
        </div>
    )
})

stories.add('vertical', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 1, 18)))

    return (
        <TimeRange
            {...{
                dayRadius: 5,
                margin: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 10),
            }}
            weekdayLegendOffset={6}
            weekdayTicks={[0, 2, 4, 6]} // custom weekday tickmarks
            height={900}
            width={250}
            direction="vertical"
            legendFormat={value => value / 10 + 'M'}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                },
            ]}
        />
    )
})

stories.add('custom date range', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2020, 11, 7)))
    const dataFrom = new Date(date('data start', new Date(2020, 7, 27)))
    const dataTo = new Date(date('data end', new Date(2020, 10, 7)))
    const data = generateDayCounts(dataFrom, dataTo)

    return (
        <div
            style={{
                height: number('height', 250),
                width: number('width', 655),
            }}
        >
            <ResponsiveTimeRange
                {...{
                    square: boolean('square', true),
                    dayRadius: number('dayRadius', 5),
                    formatValue: value => value,
                    margin: {
                        top: number('margin-top', 40),
                        right: number('margin-right', 40),
                        bottom: number('margin-bottom', 40),
                        left: number('margin-left', 40),
                    },
                    from: from,
                    to: to,
                    emptyColor: color('emptyColor', '#EEEEEE'),
                    data: data,
                    daySpacing: number('daySpacing', 0),
                }}
                weekdayTicks={[]} // hide weekday tickmarks
                legendFormat={value => value / 10 + 'M'}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        translateY: -30,
                    },
                ]}
            />
        </div>
    )
})
