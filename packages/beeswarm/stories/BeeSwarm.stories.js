import React, { Fragment } from 'react'
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
import { BeeSwarm } from '@nivo/beeswarm'
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

const contributionsData = [
    {
        id: 'contributions',
        data: [
            /*
            {
                id: 'plouc',
                value: 558,
                avatar: 'https://avatars1.githubusercontent.com/u/501642?s=60&v=4',
            },
            */
            {
                userId: 'bripkens',
                value: 7,
                avatar: 'https://avatars0.githubusercontent.com/u/596443?s=60&v=4',
            },
            {
                userId: 'mjsarfatti',
                value: 6,
                avatar: 'https://avatars3.githubusercontent.com/u/736316?s=60&v=4'
            },
            {
                userId: 'AhyoungRyu',
                value: 4,
                avatar: 'https://avatars3.githubusercontent.com/u/10060731?s=60&v=4',
            },
            {
                userId: 'ahtohbi4',
                value: 3,
                avatar: 'https://avatars2.githubusercontent.com/u/3686790?s=60&v=4',
            },
            {
                userId: 'martingordon',
                value: 2,
                avatar: 'https://avatars1.githubusercontent.com/u/48145?s=60&v=4',
            },
            {
                userId: 'kaadash',
                value: 2,
                avatar: 'https://avatars1.githubusercontent.com/u/8269004?s=60&v=4'
            },
            {
                userId: 'fozcodes',
                value: 1,
                avatar: 'https://avatars2.githubusercontent.com/u/1767848?s=60&v=4'
            },
            {
                userId: 'benembery',
                value: 1,
                avatar: 'https://avatars1.githubusercontent.com/u/1454060?s=60&v=4'
            },
            {
                userId: 'plemarquand',
                value: 1,
                avatar: 'https://avatars1.githubusercontent.com/u/667875?s=60&v=4'
            },
            {
                userId: 'jbenua',
                value: 1,
                avatar: 'https://avatars3.githubusercontent.com/u/3294891?s=60&v=4'
            },
            {
                userId: 'mdorr',
                value: 1,
                avatar: 'https://avatars0.githubusercontent.com/u/15855093?s=60&v=4'
            },
            {
                userId: 'gopeter',
                value: 1,
                avatar: 'https://avatars1.githubusercontent.com/u/1242960?s=60&v=4',
            },
            {
                userId: 'tmewes',
                value: 1,
                avatar: 'https://avatars1.githubusercontent.com/u/12640514?s=60&v=4'
            }
        ]
    }
]

stories.add(
    'custom node',
    withInfo(importStatement)(() => (
        <BeeSwarm
            {...commonProps}
            margin={{
                top: 20,
                right: 32,
                bottom: 40,
                left: 120,
            }}
            data={contributionsData}
            nodeSize={36}
            nodePadding={4}
            axisTop={{
                tickValues: 8,
            }}
            axisBottom={{
                legend: 'number of commits',
                legendPosition: 'middle',
                legendOffset: 36,
                tickValues: 8,
            }}
            tooltip={d => (
                <div>
                    <strong>{d.userId}</strong><br/><strong>{d.value}</strong> commit(s)
                </div>
            )}
            renderNode={({ node, x, y, size, onMouseEnter, onMouseMove, onMouseLeave }) => {
                return (
                    <Fragment>
                        <defs>
                            <pattern id={node.id} patternUnits="userSpaceOnUse" width={60} height={60}>
                                <image href={node.avatar} x="0" y="0" width={60} height={60} />
                            </pattern>
                        </defs>
                        <circle
                            cx={x}
                            cy={y}
                            r={size / 2}
                            fill={`url(#${node.id})`}
                            stroke="black"
                            strokeWidth={1}
                            onMouseEnter={onMouseEnter}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                        />
                    </Fragment>
                )
            }}
        />
    ))
)
