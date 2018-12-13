import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { BeeSwarm } from '../index'

const sampleData = [
    {
        id: 'Things',
        data: [
            { value: 0.3 },
            { value: 0.4 },
            { value: 0.5 },
            { value: 0.7 },
            { value: 0.9 },
            { value: 1 },
            { value: 1 },
            { value: 1 },
            { value: 1.2 },
            { value: 1.4 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 2 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
            { value: 3.1 },
            { value: 3.1 },
            { value: 3.1 },
            { value: 3.2 },
            { value: 3.2 },
            { value: 3.4 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
        ],
    },
]

const commonProps = {
    width: 600,
    height: 360,
    margin: { top: 24, right: 24, bottom: 80, left: 80 },
    nodeSize: 10,
    data: sampleData,
    enableGridY: true,
    legends: [
        {
            anchor: 'bottom-left',
            direction: 'row',
            translateY: 60,
            itemWidth: 130,
            itemHeight: 12,
            symbolSize: 12,
            symbolShape: 'circle',
        },
    ],
}

const stories = storiesOf('BeeSwarm', module)

const importStatement = `
~~~javascript
import { BeeSwarm } from '@nivo/swarm'
~~~
`

stories.add('default', withInfo(importStatement)(() => <BeeSwarm {...commonProps} />))

stories.add(
    'time scale',
    withInfo(importStatement)(() => (
        <BeeSwarm
            {...commonProps}
            data={[
                {
                    id: 'Thing',
                    data: [
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-01' },
                        { value: '2018-12-02' },
                        { value: '2018-12-03' },
                        { value: '2018-12-03' },
                        { value: '2018-12-03' },
                        { value: '2018-12-03' },
                        { value: '2018-12-06' },
                        { value: '2018-12-06' },
                        { value: '2018-12-06' },
                        { value: '2018-12-08' },
                        { value: '2018-12-08' },
                        { value: '2018-12-09' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                        { value: '2018-12-10' },
                    ],
                },
            ]}
            scale={{
                type: 'time',
                format: '%Y-%m-%d',
                precision: 'day',
            }}
            axisTop={{
                format: '%b %d',
            }}
            axisBottom={{
                format: '%b %d',
            }}
        />
    ))
)

stories.add(
    'logarithmic scale',
    withInfo(importStatement)(() => (
        <BeeSwarm
            {...commonProps}
            data={[
                {
                    id: 'Things',
                    data: [
                        { value: 2 },
                        { value: 2 },
                        { value: 2 },
                        { value: 2 },
                        { value: 2 },
                        { value: 2.1 },
                        { value: 2.1 },
                        { value: 3 },
                        { value: 7 },
                        { value: 8 },
                        { value: 9 },
                        { value: 10 },
                        { value: 10 },
                        { value: 10 },
                        { value: 10 },
                        { value: 10 },
                        { value: 10 },
                        { value: 10 },
                        { value: 61 },
                        { value: 62 },
                        { value: 63 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                        { value: 64 },
                    ],
                },
            ]}
            scale={{
                type: 'log',
                base: 2,
                min: 2,
                max: 64,
            }}
        />
    ))
)
