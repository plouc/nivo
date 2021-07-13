import { Calendar, CalendarSvgProps, CalendarTooltipProps } from '../src'
import { Meta, Story } from '@storybook/react'
import { generateDayCounts } from '@nivo/generators'

const from = new Date(2019, 0, 1)
const to = new Date(2019, 11, 31)
const data = generateDayCounts(from, to)

export default {
    component: Calendar,
    parameters: {
        controls: { include: [] },
    },
    title: 'Calendar',
} as Meta

const Template: Story<CalendarSvgProps> = args => (
    <Calendar
        data={data}
        from={from.toISOString()}
        height={260}
        margin={{ bottom: 10, left: 50, right: 10, top: 50 }}
        to={to.toISOString()}
        width={900}
        {...args}
    />
)

export const Default: Story<CalendarSvgProps> = Template.bind({})

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

export const TranslatingMonths: Story<CalendarSvgProps> = Template.bind({})

TranslatingMonths.args = {
    monthLegend: (_year, month) => japaneseMonths[month],
}

export const CustomColors: Story<CalendarSvgProps> = Template.bind({})

CustomColors.args = {
    colors: ['#a1cfff', '#468df3', '#a053f0', '#9629f0', '#8428d8'],
}

export const VerticalCalendar: Story<CalendarSvgProps> = Template.bind({})

VerticalCalendar.args = {
    direction: 'vertical',
    height: 600,
}

const CustomTooltipComponent = (data: CalendarTooltipProps) => {
    if (data.value === undefined) return null
    return (
        <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
            {data.day} : {data.value}
        </span>
    )
}

export const CustomTooltip: Story<CalendarSvgProps> = Template.bind({})

CustomTooltip.args = {
    tooltip: CustomTooltipComponent,
}

export const MonthSpacing: Story<CalendarSvgProps> = Template.bind({})

MonthSpacing.args = {
    monthSpacing: 25,
}

MonthSpacing.parameters = {
    controls: {
        include: ['monthSpacing'],
    },
}

export const CustomLegendFormatter: Story<CalendarSvgProps> = Template.bind({})

CustomLegendFormatter.args = {
    height: 460,
    legendFormat: value => value / 10 + 'M',
    legends: [
        {
            anchor: 'top',
            direction: 'row',
            itemCount: 4,
            itemDirection: 'right-to-left',
            itemHeight: 36,
            itemWidth: 42,
            itemsSpacing: 14,
            translateY: 36,
        },
    ],
    margin: { top: 40, right: 40, bottom: 40, left: 40 },
    valueFormat: '.2f',
}
