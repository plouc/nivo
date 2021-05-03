import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, date } from '@storybook/addon-knobs'

import { TimeRange, ResponsiveTimeRange } from '../src'
import { generateOrderedDayCounts } from "./generateDayCounts";


const formater = value => value / 10 + 'M'

const stories = storiesOf('TimeRange', module)

stories.addDecorator(withKnobs)

stories.add('TimeRange horizontal', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))
    return <TimeRange
        {...{
            dayRadius: number('dayRadius', 5),
            formatValue: value => value,
            margin: {
                top: number('margin-top', 40),
                right: number('margin-right', 40),
                bottom: number('margin-bottom', 40),
                left: number('margin-left', 40),
            },
            data: generateOrderedDayCounts({
                from,
                to,
            }),
            daySpacing: number('daySpacing', 10)
        }}
        height={number('height', 250)}
        width={number('width', 655)}
        legendFormat={formater}
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
})
stories.add('responsive', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))

    return (
        <div style={{
            height: number('height', 250),
            width: number('width', 655),
        }}>
            <ResponsiveTimeRange
                legendFormat={formater}
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
                    data: generateOrderedDayCounts({
                        from,
                        to,
                    }),
                    daySpacing: number('daySpacing', 10)
                }}
            />
        </div>
    )

})
stories.add('TimeRange vertical', () => {
    const from = new Date(date('from', new Date(2020, 6, 27)))
    const to = new Date(date('to', new Date(2021, 0, 7)))

    return <TimeRange
        {...{
            dayRadius: 5,
            formatValue: value => value,
            margin: {
                top: number('margin-top', 40),
                right: number('margin-right', 40),
                bottom: number('margin-bottom', 40),
                left: number('margin-left', 40),
            },
            data: generateOrderedDayCounts({
                from,
                to,
            }),
            daySpacing: number('daySpacing', 10)
        }}
        weekdayLegendsOffset={0}
        height={number('height', 900)}
        width={number('width', 250)}
        direction="vertical"
        legendFormat={formater}
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
})