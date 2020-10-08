import type { Meta, StoryObj } from '@storybook/react'
import { generateDayCounts } from '@bitbloom/nivo-generators'
import { Calendar, CalendarTooltipProps } from '@bitbloom/nivo-calendar'

const meta: Meta<typeof Calendar> = {
    title: 'Calendar',
    component: Calendar,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

const from = new Date(2019, 0, 1)
const to = new Date(2019, 11, 31)
const data = generateDayCounts(from, to)

const commonProps = {
    width: 900,
    height: 260,
    margin: {
        top: 50,
        right: 10,
        bottom: 10,
        left: 50,
    },
    from: from.toISOString(),
    to: to.toISOString(),
    data,
}

export const Basic: Story = {
    render: () => <Calendar {...commonProps} />,
}

const japaneseMonths = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
]
export const TranslatingMonths: Story = {
    render: () => (
        <Calendar monthLegend={(_year, month) => japaneseMonths[month]} {...commonProps} />
    ),
}

export const CustomColors: Story = {
    render: () => (
        <Calendar
            colors={['#a1cfff', '#468df3', '#a053f0', '#9629f0', '#8428d8']}
            {...commonProps}
        />
    ),
}

export const VerticalCalendar: Story = {
    render: () => <Calendar direction="vertical" {...commonProps} height={600} />,
}

const CustomTooltipComponent = (data: CalendarTooltipProps) => {
    if (data.value === undefined) return null
    return (
        <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
            {data.day} : {data.value}
        </span>
    )
}

export const CustomTooltip: Story = {
    render: () => <Calendar tooltip={CustomTooltipComponent} {...commonProps} />,
}

export const MonthSpacing: Story = {
    render: () => <Calendar {...commonProps} monthSpacing={25} />,
}

export const CustomLegendFormatter: Story = {
    render: () => (
        <Calendar
            {...commonProps}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            valueFormat=".2f"
            legendFormat={value => value / 10 + 'M'}
            height={460}
            legends={[
                {
                    anchor: 'top',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left',
                },
            ]}
        />
    ),
}
