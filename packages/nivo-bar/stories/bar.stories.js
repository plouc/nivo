import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateCountriesData, sets } from '@nivo/generators'
import range from 'lodash/range'
import random from 'lodash/random'
import { Bar } from '../es'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 1000,
    height: 600,
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

stories.add('stacked', withInfo()(() => <Bar {...commonProps} />))

stories.add(
    'stacked horizontal',
    withInfo()(() => (
        <Bar {...commonProps} layout="horizontal" enableGridY={false} enableGridX={true} />
    ))
)

stories.add('grouped', withInfo()(() => <Bar {...commonProps} groupMode="grouped" />))

stories.add(
    'grouped horizontal',
    withInfo()(() => (
        <Bar
            {...commonProps}
            groupMode="grouped"
            layout="horizontal"
            enableGridY={false}
            enableGridX={true}
        />
    ))
)

stories.add(
    'with marker',
    withInfo()(() => (
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
)

stories.add(
    'using custom colorBy',
    withInfo()(() => <Bar {...commonProps} colorBy={({ id, data }) => data[`${id}Color`]} />)
)

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
        legendPosition: 'center',
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

stories.add(
    'diverging stacked',
    withInfo()(() => (
        <Bar
            {...divergingCommonProps}
            keys={['gained <= 100$', 'gained > 100$', 'lost <= 100$', 'lost > 100$']}
            padding={0.4}
            colors={['#97e3d5', '#61cdbb', '#f47560', '#e25c3b']}
            labelFormat={v => `${v}%`}
        />
    ))
)

stories.add(
    'diverging grouped',
    withInfo()(() => (
        <Bar
            {...divergingCommonProps}
            keys={['gained > 100$', 'gained <= 100$', 'lost <= 100$', 'lost > 100$']}
            groupMode="grouped"
            padding={0.1}
            colors={['#61cdbb', '#97e3d5', '#f47560', '#e25c3b']}
            innerPadding={1}
        />
    ))
)

const CustomBarComponent = ({ x, y, width, height, color }) => (
    <circle cx={x + width / 2} cy={y + height / 2} r={Math.min(width, height) / 2} fill={color} />
)

stories.add(
    'custom bar item',
    withInfo()(() => (
        <Bar
            {...commonProps}
            innerPadding={4}
            barComponent={CustomBarComponent}
            labelTextColor="inherit:darker(1)"
        />
    ))
)

stories.add(
    'with formatted values',
    withInfo()(() => (
        <Bar
            {...commonProps}
            axisLeft={{
                format: value =>
                    Number(value).toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                    }),
            }}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)

stories.add(
      'with formatted tooltip id',
      withInfo()(() => (
            <Bar
                  {...commonProps}
                  tooltipFormat={(id, value) => [`${id.toString().toUpperCase()} =>`, value] }
            />
      ))
)
