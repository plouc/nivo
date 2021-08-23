import { storiesOf } from '@storybook/react'
import { withKnobs, number, date, boolean, color } from '@storybook/addon-knobs'
import { generateOrderedDayCounts, generateDayCounts } from '@nivo/generators'

import { TimeRange, ResponsiveTimeRange } from '../src'

const stories = storiesOf('TimeRange', module)

stories.addDecorator(withKnobs)

stories.add('TimeRange horizontal', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))
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
                    left: number('margin-left', 40),
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

stories.add('responsive', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))

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

stories.add('TimeRange vertical', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))

    return (
        <TimeRange
            {...{
                dayRadius: 5,
                margin: {
                    top: number('margin-top', 48),
                    right: number('margin-right', 40),
                    bottom: number('margin-bottom', 40),
                    left: number('margin-left', 40),
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 10),
            }}
            weekdayLegendOffset={0}
            weekdayTicks={[0, 2, 4, 6]} // custom weekday tickmarks
            height={number('height', 900)}
            width={number('width', 250)}
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
