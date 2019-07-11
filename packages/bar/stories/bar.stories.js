import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { generateCountriesData, sets } from '@nivo/generators'
import range from 'lodash/range'
import random from 'lodash/random'
import { useTheme } from '@nivo/core'
import { Bar } from '../src'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }),
    indexBy: 'country',
    keys,
    padding: 0.2,
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
}

const stories = storiesOf('Bar', module)

stories.add('stacked', () => <Bar {...commonProps} />)

stories.add('stacked horizontal', () => (
    <Bar {...commonProps} layout="horizontal" enableGridY={false} enableGridX={true} />
))

stories.add('grouped', () => <Bar {...commonProps} groupMode="grouped" />)

stories.add('grouped horizontal', () => (
    <Bar
        {...commonProps}
        groupMode="grouped"
        layout="horizontal"
        enableGridY={false}
        enableGridX={true}
    />
))

stories.add('with marker', () => (
    <Bar
        {...commonProps}
        padding={0.4}
        markers={[
            {
                axis: 'y',
                value: 300,
                lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
                legend: 'y marker at 300',
                legendOrientation: 'vertical',
            },
        ]}
    />
))

stories.add('using custom color', () => (
    <Bar {...commonProps} colors={({ id, data }) => data[`${id}Color`]} />
))

const divergingData = range(9).map(i => {
    let gain = random(0, 100)
    let loss = 100 - gain
    const highGain = random(Math.round(gain * 0.4))
    const highLoss = random(Math.round(loss * 0.4))
    gain = gain - highGain
    loss = loss - highLoss

    return {
        'gained > 100$': highGain,
        'gained <= 100$': gain,
        'lost <= 100$': -loss,
        'lost > 100$': -highLoss,
        user: sets.names[i],
    }
})

const divergingCommonProps = {
    ...commonProps,
    data: divergingData,
    indexBy: 'user',
    minValue: -100,
    maxValue: 100,
    enableGridX: true,
    enableGridY: false,
    label: d => Math.abs(d.value),
    labelTextColor: 'inherit:darker(1.2)',
    axisTop: {
        tickSize: 0,
        tickPadding: 12,
    },
    axisBottom: {
        legend: 'USERS',
        legendPosition: 'middle',
        legendOffset: 50,
        tickSize: 0,
        tickPadding: 12,
    },
    axisLeft: null,
    axisRight: {
        format: v => `${Math.abs(v)}%`,
    },
    markers: [
        {
            axis: 'y',
            value: 0,
            lineStyle: { strokeOpacity: 0 },
            textStyle: { fill: '#2ebca6' },
            legend: 'gain',
            legendPosition: 'top-left',
            legendOrientation: 'vertical',
            legendOffsetY: 120,
        },
        {
            axis: 'y',
            value: 0,
            lineStyle: { stroke: '#f47560', strokeWidth: 1 },
            textStyle: { fill: '#e25c3b' },
            legend: 'loss',
            legendPosition: 'bottom-left',
            legendOrientation: 'vertical',
            legendOffsetY: 120,
        },
    ],
}

stories.add('diverging stacked', () => (
    <Bar
        {...divergingCommonProps}
        keys={['gained <= 100$', 'gained > 100$', 'lost <= 100$', 'lost > 100$']}
        padding={0.4}
        colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']}
        labelFormat={v => `${v}%`}
    />
))

stories.add('diverging grouped', () => (
    <Bar
        {...divergingCommonProps}
        keys={['gained > 100$', 'gained <= 100$', 'lost <= 100$', 'lost > 100$']}
        groupMode="grouped"
        padding={0.1}
        colors={['#61cdbb', '#97e3d5', '#f47560', '#e25c3b']}
        innerPadding={1}
    />
))

const CustomBarComponent = ({ x, y, width, height, color }) => (
    <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
)

stories.add('custom bar item', () => (
    <Bar
        {...commonProps}
        innerPadding={4}
        barComponent={CustomBarComponent}
        labelTextColor="inherit:darker(1)"
    />
))

stories.add('with formatted values', () => (
    <Bar
        {...commonProps}
        axisLeft={{
            format: value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`,
        }}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <Bar
        {...commonProps}
        axisLeft={{
            format: value =>
                Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                }),
        }}
        tooltip={({ id, value, color }) => (
            <strong style={{ color }}>
                {id}: {value}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
    />
))

const CustomTick = tick => {
    const theme = useTheme()

    return (
        <g transform={`translate(${tick.x},${tick.y + 22})`}>
            <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
            <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="rgb(232, 193, 160)" />
            <line stroke="rgb(232, 193, 160)" strokeWidth={1.5} y1={-22} y2={-12} />
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    ...theme.axis.ticks.text,
                    fill: '#333',
                    fontSize: 10,
                }}
            >
                {tick.value}
            </text>
        </g>
    )
}

stories.add(
    'custom axis ticks',
    () => (
        <Bar
            {...commonProps}
            animate={false}
            axisLeft={null}
            axisBottom={{
                renderTick: CustomTick,
            }}
        />
    ),
    {
        info: {
            text:
                'You can customize rendering of axis ticks using the corresponding axis `renderTick` property.',
        },
    }
)

stories.add('enter/leave (check actions)', () => (
    <Bar
        {...commonProps}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))
