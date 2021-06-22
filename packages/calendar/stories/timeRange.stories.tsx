import { storiesOf } from '@storybook/react'
import { withKnobs, number, date, boolean } from '@storybook/addon-knobs'
import { generateOrderedDayCounts } from '@nivo/generators'

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
                    top: number('margin-top', 40),
                    right: number('margin-right', 40),
                    bottom: number('margin-bottom', 40),
                    left: number('margin-left', 40),
                },
                data: generateOrderedDayCounts(from, to),
                daySpacing: number('daySpacing', 10),
            }}
            weekdayLegendOffset={0}
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
