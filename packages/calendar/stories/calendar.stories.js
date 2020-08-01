import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateDayCounts } from '@nivo/generators'
import { Calendar } from '../src'

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

const stories = storiesOf('Calendar', module)

stories.add('default', () => <Calendar {...commonProps} />)

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
stories.add('translating months', () => (
    <Calendar monthLegend={(year, month) => japaneseMonths[month]} {...commonProps} />
))

stories.add('custom colors', () => (
    <Calendar colors={['#a1cfff', '#468df3', '#a053f0', '#9629f0', '#8428d8']} {...commonProps} />
))

stories.add('vertical calendar', () => (
    <Calendar direction="vertical" {...commonProps} height={600} />
))

const CustomTooltip = data => {
    if (data.value === undefined) return null
    return (
        <span style={{ color: data.color, backgroundColor: 'black', padding: '10px' }}>
            {data.day} : {data.value}
        </span>
    )
}

stories.add('custom tooltip', () => <Calendar tooltip={CustomTooltip} {...commonProps} />)

stories.add('month spacing', () => <Calendar {...commonProps} monthSpacing={25} />)

const formater = value => value / 10 + 'M'

stories.add('custom legend formater', () => (
    <Calendar
        {...commonProps}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        valueFormat=".2f"
        legendFormat={formater}
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
))
