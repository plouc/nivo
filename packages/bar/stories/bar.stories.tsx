import { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateCountriesData, sets } from '@nivo/generators'
import { random, range } from 'lodash'
import { useTheme } from '@nivo/core'
// @ts-ignore
import { Bar, BarDatum } from '../src'
import { AxisTickProps } from '@nivo/axes'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }) as BarDatum[],
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
    <Bar {...commonProps} colors={({ id, data }) => String(data[`${id}Color`])} />
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
    valueFormat: (value: number) => `${Math.abs(value)}`,
    labelTextColor: 'inherit:darker(1.2)',
    axisTop: {
        tickSize: 0,
        tickPadding: 12,
    },
    axisBottom: {
        legend: 'USERS',
        legendPosition: 'middle' as const,
        legendOffset: 50,
        tickSize: 0,
        tickPadding: 12,
    },
    axisLeft: null,
    axisRight: {
        format: (v: number) => `${Math.abs(v)}%`,
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
        } as const,
        {
            axis: 'y',
            value: 0,
            lineStyle: { stroke: '#f47560', strokeWidth: 1 },
            textStyle: { fill: '#e25c3b' },
            legend: 'loss',
            legendPosition: 'bottom-left',
            legendOrientation: 'vertical',
            legendOffsetY: 120,
        } as const,
    ],
}

stories.add('diverging stacked', () => (
    <Bar
        {...divergingCommonProps}
        keys={['gained <= 100$', 'gained > 100$', 'lost <= 100$', 'lost > 100$']}
        padding={0.4}
        colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']}
        valueFormat={v => `${v}%`}
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

const CustomBarComponent = ({ bar: { x, y, width, height, color } }) => (
    <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
)

stories.add('custom bar item', () => (
    <Bar {...commonProps} innerPadding={4} barComponent={CustomBarComponent} />
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
        valueFormat={value =>
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
            <div
                style={{
                    padding: 12,
                    color,
                    background: '#222222',
                }}
            >
                <span>Look, I'm custom :)</span>
                <br />
                <strong>
                    {id}: {value}
                </strong>
            </div>
        )}
    />
))

const CustomTick = (tick: AxisTickProps<string>) => {
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

const BarComponent = ({ bar, borderColor }) => {
    return (
        <g transform={`translate(${bar.x},${bar.y})`}>
            <rect x={-3} y={7} width={bar.width} height={bar.height} fill="rgba(0, 0, 0, .07)" />
            <rect width={bar.width} height={bar.height} fill={bar.color} />
            <rect
                x={bar.width - 5}
                width={5}
                height={bar.height}
                fill={borderColor}
                fillOpacity={0.2}
            />
            <text
                x={bar.width - 16}
                y={bar.height / 2 - 8}
                textAnchor="end"
                dominantBaseline="central"
                fill="black"
                style={{
                    fontWeight: 900,
                    fontSize: 15,
                }}
            >
                {bar.data.indexValue}
            </text>
            <text
                x={bar.width - 16}
                y={bar.height / 2 + 10}
                textAnchor="end"
                dominantBaseline="central"
                fill={borderColor}
                style={{
                    fontWeight: 400,
                    fontSize: 13,
                }}
            >
                {bar.data.value}
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
            />
        </>
    )
}

stories.add('race chart', () => <RaceChart />)

stories.add('initial hidden ids', () => (
    <Bar
        {...commonProps}
        initialHiddenIds={keys.slice(2, 4)}
        legends={[
            {
                anchor: 'bottom',
                dataFrom: select('legend.dataFrom', ['indexes', 'keys'], 'keys'),
                direction: 'row',
                itemHeight: 20,
                itemWidth: 80,
                toggleSerie: true,
                translateY: 50,
            },
        ]}
    />
))

stories.add('legends correct with different layout modes', () => {
    const dataFrom = select('legend.dataFrom', ['keys', 'indexes'], 'indexes')
    const direction = select('legend.direction', ['column', 'row'], 'column')
    const layout = select('layout', ['horizontal', 'vertical'], 'horizontal')

    return (
        <Bar
            {...commonProps}
            data={[
                { quarter: 1, earnings: 13000, losses: 10000 },
                { quarter: 2, earnings: 16500, losses: 13000 },
                { quarter: 3, earnings: 14250, losses: 11000 },
                { quarter: 4, earnings: 19000, losses: 16000 },
            ]}
            colorBy={select('colorBy', ['indexValue', 'id'], 'indexValue')}
            keys={['earnings', 'losses']}
            indexBy="quarter"
            layout={layout}
            groupMode={select('groupMode', ['grouped', 'stacked'], 'stacked')}
            reverse={boolean('reverse', false)}
            legends={[
                {
                    ...(layout === 'horizontal' || direction === 'column'
                        ? {
                              anchor: 'bottom-right',
                              itemWidth: 110,
                              itemsSpacing: 2,
                              translateX: 120,
                          }
                        : {
                              anchor: 'bottom',
                              itemWidth: dataFrom === 'keys' ? 80 : 40,
                              translateY: 50,
                          }),
                    dataFrom,
                    direction,
                    itemHeight: 20,
                    symbolSize: 20,
                },
            ]}
        />
    )
})

stories.add('custom legend labels', () => (
    <Bar
        {...commonProps}
        legendLabel={datum => `${datum.id} (${datum.value})`}
        legends={[
            {
                anchor: 'bottom-right',
                dataFrom: 'keys',
                direction: 'column',
                itemHeight: 20,
                itemWidth: 110,
                toggleSerie: true,
                translateX: 120,
            },
        ]}
    />
))

stories.add('with annotations', () => (
    <Bar
        {...commonProps}
        annotations={[
            {
                type: 'circle',
                match: { key: 'fries.AE' },
                noteX: 25,
                noteY: 25,
                offset: 3,
                noteTextOffset: -3,
                noteWidth: 5,
                note: 'an annotation',
                size: 40,
            },
        ]}
    />
))
