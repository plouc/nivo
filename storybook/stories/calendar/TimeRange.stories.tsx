import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'
import { generateOrderedDayCounts, generateDayCounts } from '@bitbloom/nivo-generators'
import { TimeRange, ResponsiveTimeRange, TimeRangeSvgProps } from '@bitbloom/nivo-calendar'

type Props = TimeRangeSvgProps & {
    marginTop: number
    marginRight: number
    marginBottom: number
    marginLeft: number
}

const meta: Meta<Props> = {
    title: 'TimeRange',
    component: TimeRange,
    tags: ['autodocs'],
    argTypes: {
        from: {
            control: 'date',
        },
        to: {
            control: 'date',
        },
        height: {
            control: {
                type: 'number',
                min: 100,
                max: 1000,
                step: 5,
            },
        },
        width: {
            control: {
                type: 'number',
                min: 100,
                max: 1000,
                step: 5,
            },
        },
        marginTop: {
            control: {
                type: 'number',
                min: 0,
                max: 60,
                step: 1,
            },
        },
        marginRight: {
            control: {
                type: 'number',
                min: 0,
                max: 60,
                step: 1,
            },
        },
        marginBottom: {
            control: {
                type: 'number',
                min: 0,
                max: 60,
                step: 1,
            },
        },
        marginLeft: {
            control: {
                type: 'number',
                min: 0,
                max: 60,
                step: 1,
            },
        },
        square: {
            control: 'boolean',
        },
        dayRadius: {
            control: {
                type: 'number',
                min: 0,
                max: 30,
                step: 1,
            },
        },
        daySpacing: {
            control: {
                type: 'number',
                min: 0,
                max: 30,
                step: 1,
            },
        },
    },
}

export default meta
type Story = StoryObj<Props>

export const Horizontal: Story = {
    args: {
        from: new Date(2020, 6, 27),
        to: new Date(2021, 0, 7),
        height: 250,
        width: 655,
        marginTop: 40,
        marginRight: 40,
        marginBottom: 40,
        marginLeft: 40,
        square: true,
        dayRadius: 5,
    },
    render: args => (
        <TimeRange
            {...{
                square: args.square,
                dayRadius: args.dayRadius,
                margin: {
                    top: args.marginTop,
                    right: args.marginRight,
                    bottom: args.marginBottom,
                    left: args.marginLeft,
                },
                data: generateOrderedDayCounts(args.from, args.to),
                daySpacing: args.daySpacing,
            }}
            monthLegendOffset={10}
            dayBorderWidth={1}
            height={args.height}
            width={args.width}
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
    ),
}

export const Responsive: Story = {
    args: {
        from: new Date(2020, 6, 27),
        to: new Date(2021, 0, 7),
        height: 250,
        width: 655,
        marginTop: 40,
        marginRight: 40,
        marginBottom: 40,
        marginLeft: 40,
        square: true,
        dayRadius: 5,
    },
    render: args => (
        <div
            style={{
                height: args.height,
                width: args.width,
            }}
        >
            <ResponsiveTimeRange
                data={generateOrderedDayCounts(args.from, args.to)}
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
                dayRadius={args.dayRadius}
                daySpacing={args.daySpacing}
                margin={{
                    top: args.marginTop,
                    right: args.marginRight,
                    bottom: args.marginBottom,
                    left: args.marginLeft,
                }}
            />
        </div>
    ),
}

export const Vertical: Story = {
    args: {
        from: new Date(2020, 6, 27),
        to: new Date(2021, 0, 7),
        height: 900,
        width: 250,
        marginTop: 48,
        marginRight: 40,
        marginBottom: 40,
        marginLeft: 40,
        square: true,
        dayRadius: 5,
        daySpacing: 10,
    },
    render: args => (
        <TimeRange
            data={generateOrderedDayCounts(args.from, args.to)}
            height={args.height}
            width={args.width}
            margin={{
                top: args.marginTop,
                right: args.marginRight,
                bottom: args.marginBottom,
                left: args.marginLeft,
            }}
            dayRadius={args.dayRadius}
            daySpacing={args.daySpacing}
            weekdayLegendOffset={0}
            weekdayTicks={[0, 2, 4, 6]} // custom weekday tickmarks
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
    ),
}

export const CustomDateRange: Story = {
    argTypes: {
        dataFrom: {
            control: 'date',
        },
        dataTo: {
            control: 'date',
        },
        emptyColor: {
            control: 'color',
        },
    },
    args: {
        from: new Date(2020, 6, 27),
        to: new Date(2020, 11, 7),
        dataFrom: new Date(2020, 7, 27),
        dataTo: new Date(2020, 10, 7),
        width: 655,
        height: 250,
        marginTop: 40,
        marginRight: 40,
        marginBottom: 40,
        marginLeft: 40,
        square: true,
        dayRadius: 5,
        daySpacing: 0,
        emptyColor: '#EEEEEE',
    },
    render: args => {
        const data = useMemo(
            () => generateDayCounts(args.dataFrom, args.dataTo),
            [args.dataFrom, args.dataTo]
        )

        return (
            <TimeRange
                from={args.from}
                to={args.to}
                data={data}
                width={args.width}
                height={args.height}
                square={args.square}
                dayRadius={args.dayRadius}
                daySpacing={args.daySpacing}
                margin={{
                    top: args.marginTop,
                    right: args.marginRight,
                    bottom: args.marginBottom,
                    left: args.marginLeft,
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
                emptyColor={args.emptyColor}
            />
        )
    },
}
