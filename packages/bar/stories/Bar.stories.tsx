import { AxisTickProps } from '@nivo/axes'
import { Bar, BarDatum, BarItemProps, BarSvgProps, svgDefaultProps } from '../src'
import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { generateCountriesData, sets } from '@nivo/generators'
import { random, range } from 'lodash'
import { useState, useEffect } from 'react'
import { useTheme } from '@nivo/core'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }) as BarDatum[],
    indexBy: 'country',
    keys,
    padding: 0.2,
    labelTextColor: { from: 'color', modifiers: [['darker', 1.4] as ['darker', number]] },
    labelSkipWidth: 16,
    labelSkipHeight: 16,
    animate: true,
    layout: 'vertical' as const,
    groupMode: 'stacked' as const,
    onClick: action('click'),
    onMouseEnter: action('mouseenter'),
    onMouseLeave: action('mouseleave'),
}

export default {
    title: 'Bar',
    component: Bar,
    args: commonProps,
    parameters: {
        controls: { include: ['animate', 'groupMode', 'layout'], sort: 'alpha' },
    },
} as Meta

const Template: Story<BarSvgProps<BarDatum>> = args => <Bar {...commonProps} {...args} />

export const Default: Story<BarSvgProps<BarDatum>> = Template.bind({})

export const StackedHorizontal: Story<BarSvgProps<BarDatum>> = Template.bind({})

StackedHorizontal.args = {
    enableGridX: true,
    enableGridY: false,
    layout: 'horizontal',
}

export const Grouped: Story<BarSvgProps<BarDatum>> = Template.bind({})

Grouped.args = {
    groupMode: 'grouped',
}

export const GroupedHorizontal: Story<BarSvgProps<BarDatum>> = Template.bind({})

GroupedHorizontal.args = {
    enableGridX: true,
    enableGridY: false,
    groupMode: 'grouped',
    layout: 'horizontal',
}

export const WithMarker: Story<BarSvgProps<BarDatum>> = Template.bind({})

WithMarker.args = {
    markers: [
        {
            axis: 'y',
            value: 300,
            lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
            legend: 'y marker at 300',
            legendOrientation: 'vertical',
        },
    ],
    padding: 0.4,
}

export const UsingCustomColor: Story<BarSvgProps<BarDatum>> = Template.bind({})

UsingCustomColor.args = {
    colors: ({ id, data }) => String(data[`${id}Color`]),
}

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

export const DivergingStacked: Story<BarSvgProps<BarDatum>> = Template.bind({})

DivergingStacked.args = {
    ...divergingCommonProps,
    keys: ['gained <= 100$', 'gained > 100$', 'lost <= 100$', 'lost > 100$'],
    padding: 0.4,
    colors: ['#97e3d5', '#61cdbb', '#f47560', '#e25c3b'],
    valueFormat: v => `${v}%`,
}

export const DivergingGrouped: Story<BarSvgProps<BarDatum>> = Template.bind({})

DivergingGrouped.args = {
    ...divergingCommonProps,
    keys: ['gained > 100$', 'gained <= 100$', 'lost <= 100$', 'lost > 100$'],
    groupMode: 'grouped',
    padding: 0.1,
    colors: ['#61cdbb', '#97e3d5', '#f47560', '#e25c3b'],
    innerPadding: 1,
}

const CustomBarComponent = ({ bar: { x, y, width, height, color } }) => (
    <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
)

export const CustomBarItem: Story<BarSvgProps<BarDatum>> = Template.bind({})

CustomBarItem.args = {
    barComponent: CustomBarComponent,
    innerPadding: 4,
}

export const WithFormattedValues: Story<BarSvgProps<BarDatum>> = Template.bind({})

WithFormattedValues.args = {
    axisLeft: {
        format: value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`,
    },
    valueFormat: value =>
        `${Number(value).toLocaleString('ru-RU', {
            minimumFractionDigits: 2,
        })} ₽`,
}

export const CustomTooltip: Story<BarSvgProps<BarDatum>> = Template.bind({})

CustomTooltip.args = {
    axisLeft: {
        format: value =>
            Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            }),
    },
    tooltip: ({ id, value, color }) => (
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
    ),
}

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

export const CustomAxisTicks: Story<BarSvgProps<BarDatum>> = Template.bind({})

CustomAxisTicks.args = {
    animate: false,
    axisLeft: null,
    axisBottom: {
        renderTick: CustomTick,
    },
}

CustomAxisTicks.parameters = {
    docs: {
        description: {
            story:
                'You can customize rendering of axis ticks using the corresponding axis `renderTick` property.',
        },
    },
}

export const WithSymlogScale: Story<
    Omit<BarSvgProps<BarDatum>, 'valueScale'> & { valueScale: 'linear' | 'symlog' }
> = Template.bind({})

WithSymlogScale.argTypes = {
    valueScale: {
        control: {
            type: 'radio',
        },
        mapping: {
            linear: { type: 'linear' },
            symlog: { type: 'symlog' },
        },
        options: ['linear', 'symlog'],
    },
}

WithSymlogScale.args = {
    data: [
        { country: 'A', population: 100 },
        { country: 'B', population: 50000 },
        { country: 'C', population: 15000 },
    ],
    keys: ['population'],
    valueScale: 'symlog',
}

WithSymlogScale.parameters = {
    controls: { include: ['animate', 'groupMode', 'layout', 'valueScale'] },
}

type State = {
    id: string
    value: number
}

const DataGenerator = (initialIndex: number, initialState: State[]) => {
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

const BarComponent = <RawDatum,>({ bar, borderColor }: BarItemProps<RawDatum>) => {
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

export const RaceChart: Story<BarSvgProps<BarDatum>> = () => {
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

RaceChart.argTypes = {
    ...[
        ...Object.keys(svgDefaultProps),
        'axisRight',
        'axisTop',
        'data',
        'gridXValues',
        'gridYValues',
        'height',
        'initialHiddenIds',
        'labelFormat',
        'legendLabel',
        'margin',
        'markers',
        'onClick',
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'renderWrapper',
        'theme',
        'valueFormat',
        'width',
    ].reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
}

RaceChart.parameters = {
    controls: {
        hideNoControlsWarning: true,
    },
}

export const InitialHiddenIds: Story<
    Omit<BarSvgProps<BarDatum>, 'legends'> & { legends: 'indexes' | 'keys' }
> = Template.bind({})

const createLegends = (dataFrom: 'indexes' | 'keys') => [
    {
        anchor: 'bottom',
        dataFrom,
        direction: 'row',
        itemHeight: 20,
        itemWidth: 80,
        toggleSerie: true,
        translateY: 50,
    },
]

InitialHiddenIds.argTypes = {
    legends: {
        control: {
            type: 'radio',
        },
        mapping: {
            indexes: createLegends('indexes'),
            keys: createLegends('keys'),
        },
        options: ['indexes', 'keys'],
    },
}

InitialHiddenIds.args = {
    initialHiddenIds: keys.slice(2, 4),
    legends: 'keys',
}

InitialHiddenIds.parameters = {
    controls: { include: ['animate', 'groupMode', 'layout', 'legends'] },
}

export const CorrectLegends: Story<
    BarSvgProps<BarDatum> & { dataFrom: 'indexes' | 'keys'; direction: 'column' | 'row' }
> = ({ dataFrom, direction, ...args }) => (
    <Bar
        {...commonProps}
        {...args}
        legends={[
            {
                ...(args.layout === 'horizontal' || direction === 'column'
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

CorrectLegends.storyName = 'Legends Correct With Different Layout Modes'

CorrectLegends.argTypes = {
    dataFrom: {
        control: {
            type: 'radio',
        },
        name: 'legends.dataFrom',
        options: ['indexes', 'keys'],
    },
    direction: {
        control: {
            type: 'radio',
        },
        name: 'legends.direction',
        options: ['column', 'row'],
    },
}

CorrectLegends.args = {
    colorBy: 'indexValue',
    data: [
        { quarter: 1, earnings: 13000, losses: 10000 },
        { quarter: 2, earnings: 16500, losses: 13000 },
        { quarter: 3, earnings: 14250, losses: 11000 },
        { quarter: 4, earnings: 19000, losses: 16000 },
    ],
    dataFrom: 'indexes',
    direction: 'column',
    indexBy: 'quarter',
    keys: ['earnings', 'losses'],
    layout: 'horizontal',
    reverse: false,
}

CorrectLegends.parameters = {
    controls: {
        include: [
            'animate',
            'colorBy',
            'groupMode',
            'layout',
            'legends.dataFrom',
            'legends.direction',
            'reverse',
        ],
    },
}

export const CustomLegendLabels: Story<BarSvgProps<BarDatum>> = Template.bind({})

CustomLegendLabels.args = {
    legendLabel: datum => `${datum.id} (${datum.value})`,
    legends: [
        {
            anchor: 'bottom-right',
            dataFrom: 'keys',
            direction: 'column',
            itemHeight: 20,
            itemWidth: 110,
            toggleSerie: true,
            translateX: 120,
        },
    ],
}

export const WithAnnotations: Story<BarSvgProps<BarDatum>> = Template.bind({})

WithAnnotations.args = {
    annotations: [
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
    ],
}
