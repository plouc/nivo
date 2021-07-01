import { Meta, Story } from '@storybook/react'
import { TimeRange, TimeRangeSvgProps } from '../src'
import { generateOrderedDayCounts } from '@nivo/generators'
import { useMemo } from 'react'

export default {
    argTypes: {
        ...['dayRadius', 'daySpacing', 'weekdayLegendOffset'].reduce(
            (acc, key) => ({
                ...acc,
                [key]: {
                    control: {
                        max: 100,
                        min: 0,
                        step: 1,
                        type: 'range',
                    },
                },
            }),
            {}
        ),
        from: { control: { type: 'date' } },
        to: { control: { type: 'date' } },
        weekdayTicks: {
            options: [0, 1, 2, 3, 4, 5, 6],
            control: { type: 'check' },
        },
    },
    args: {
        dayRadius: 5,
        daySpacing: 0,
        from: new Date(2020, 6, 27),
        square: true,
        to: new Date(2021, 0, 7),
        weekdayLegendOffset: 50,
        weekdayTicks: [0, 2, 4, 6],
    },
    component: TimeRange,
    parameters: {
        controls: {
            include: [
                'dayRadius',
                'daySpacing',
                'from',
                'square',
                'to',
                'weekdayLegendOffset',
                'weekdayTicks',
            ],
        },
    },
    title: 'TimeRange',
} as Meta

const Template: Story<TimeRangeSvgProps & { from: Date; to: Date }> = ({ from, to, ...args }) => {
    const data = useMemo(() => generateOrderedDayCounts(from, to), [from, to])

    return (
        <TimeRange
            data={data}
            dayBorderWidth={1}
            height={250}
            legendFormat={value => value / 10 + 'M'}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    itemCount: 4,
                    itemHeight: 36,
                    itemWidth: 42,
                    itemsSpacing: 14,
                    translateY: -30,
                },
            ]}
            margin={{ bottom: 40, left: 40, right: 40, top: 40 }}
            monthLegendOffset={10}
            width={655}
            {...args}
        />
    )
}

export const Default: Story<TimeRangeSvgProps> = Template.bind({})

export const Vertical: Story<TimeRangeSvgProps> = Template.bind({})

Vertical.args = {
    direction: 'vertical',
    height: 900,
    legends: [
        {
            anchor: 'bottom',
            direction: 'row',
            itemCount: 4,
            itemHeight: 36,
            itemWidth: 42,
            itemsSpacing: 14,
        },
    ],
    width: 250,
}
