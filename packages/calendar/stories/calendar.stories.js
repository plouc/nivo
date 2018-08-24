import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateDayCounts } from '@nivo/generators'
import { Calendar } from '../index'

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

stories.add('default', withInfo()(() => <Calendar {...commonProps} />))

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
stories.add(
    'translating months',
    withInfo()(() => (
        <Calendar monthLegend={(year, month) => japaneseMonths[month]} {...commonProps} />
    ))
)

stories.add(
    'custom colors',
    withInfo()(() => (
        <Calendar
            colors={['#a1cfff', '#468df3', '#a053f0', '#9629f0', '#8428d8']}
            {...commonProps}
        />
    ))
)

stories.add(
    'vertical calendar',
    withInfo()(() => <Calendar direction="vertical" {...commonProps} height={600} />)
)

stories.add(
    'custom tooltip',
    withInfo()(() => (
        <Calendar
            tooltip={({ day, value, color }) => (
                <strong style={{ color }}>
                    {day}: {value}
                </strong>
            )}
            theme={{
                tooltip: {
                    container: {
                        background: '#333',
                    },
                },
            }}
            {...commonProps}
        />
    ))
)
