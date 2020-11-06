import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select } from '@storybook/addon-knobs'
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

stories.addDecorator(withKnobs)

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

stories.add('with symlog scale', () => (
    <Bar
        {...commonProps}
        data={[
            { country: 'A', population: 100 },
            { country: 'B', population: 50000 },
            { country: 'C', population: 15000 },
        ]}
        keys={['population']}
        valueScale={{ type: select('scale', ['symlog', 'linear'], 'symlog') }}
    />
))

const DataGenerator = (initialIndex, initialState) => {
    let index = initialIndex
    let state = initialState

    return {
        increment: () => {
            index++
            state = state.map(item => {
                const initialValue = initialState.find(d => d.id === item.id).value

                return {
                    ...item,
                    value: Math.round(item.value + Math.random() * (initialValue * 0.2)),
                }
            })
        },
        getData: () => {
            return { index, state }
        },
    }
}

const BarComponent = props => {
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <rect
                x={-3}
                y={7}
                width={props.width}
                height={props.height}
                fill="rgba(0, 0, 0, .07)"
            />
            <rect width={props.width} height={props.height} fill={props.color} />
            <rect
                x={props.width - 5}
                width={5}
                height={props.height}
                fill={props.borderColor}
                fillOpacity={0.2}
            />
            <text
                x={props.width - 16}
                y={props.height / 2 - 8}
                textAnchor="end"
                dominantBaseline="central"
                fill="black"
                style={{
                    fontWeight: 900,
                    fontSize: 15,
                }}
            >
                {props.data.indexValue}
            </text>
            <text
                x={props.width - 16}
                y={props.height / 2 + 10}
                textAnchor="end"
                dominantBaseline="central"
                fill={props.borderColor}
                style={{
                    fontWeight: 400,
                    fontSize: 13,
                }}
            >
                {props.data.value}
            </text>
        </g>
    )
}

const dataGenerator = DataGenerator(1900, [
    { id: 'Tokyo', value: 10000000 },
    { id: 'Osaka', value: 9000000 },
    { id: 'Nara', value: 8000000 },
    { id: 'Kyoto', value: 7000000 },
    { id: 'Kobe', value: 5000000 },
    { id: 'Sapporo', value: 3000000 },
])

const RaceChart = () => {
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            dataGenerator.increment()
            setCurrent(current + 1)
        }, 1400)
        return () => clearTimeout(timer)
    }, [current, setCurrent])

    const yearData = dataGenerator.getData()
    const barData = [...yearData.state].sort((a, b) => a.value - b.value)

    return (
        <>
            <h2 style={{ marginLeft: 60, fontWeight: 400, color: '#555' }}>
                Arbitrary Value in Japan Cities{' '}
                <strong style={{ color: 'black', fontWeight: 900 }}>{yearData.index}</strong>
            </h2>
            <Bar
                width={800}
                height={500}
                layout="horizontal"
                margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
                data={barData}
                indexBy="id"
                keys={['value']}
                colors={{ scheme: 'spectral' }}
                colorBy="indexValue"
                borderColor={{ from: 'color', modifiers: [['darker', 2.6]] }}
                enableGridX
                enableGridY={false}
                axisTop={{
                    format: '~s',
                }}
                axisBottom={{
                    format: '~s',
                }}
                axisLeft={null}
                padding={0.3}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
                isInteractive={false}
                barComponent={BarComponent}
                motionStiffness={170}
                motionDamping={26}
            />
        </>
    )
}

stories.add('race chart', () => <RaceChart />)
