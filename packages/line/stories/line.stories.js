import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { generateDrinkStats } from '@nivo/generators'
import { Line } from '../index'

const data = generateDrinkStats(18)
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    data,
    animate: true,
}

const curveOptions = ['linear', 'monotoneX']

const stories = storiesOf('Line', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add(
    'default',
    withInfo()(() => <Line {...commonProperties} curve={select('curve', curveOptions, 'linear')} />)
)

stories.add(
    'stacked lines',
    withInfo(`
    You can stack lines using the \`yScale.stacked\` property.
    Please note that stacking is only supported for linear scales.
`)(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: true,
            }}
            curve={select('curve', curveOptions, 'linear')}
        />
    ))
)

stories.add(
    'linear x scale',
    withInfo(`
    By default, \`xScale\` is a point scale, but you can switch to linear using
    the \`xScale.type\` property.
`)(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            data={[
                {
                    id: 'fake corp. A',
                    data: [
                        { x: 0, y: 7 },
                        { x: 1, y: 5 },
                        { x: 2, y: 11 },
                        { x: 3, y: 9 },
                        { x: 4, y: 13 },
                        { x: 7, y: 16 },
                        { x: 9, y: 12 },
                    ],
                },
            ]}
            xScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
            }}
        />
    ))
)

stories.add(
    'time series',
    withInfo()(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            height={700}
            data={[
                {
                    id: 'fake corp. A',
                    data: [
                        { x: '2018-01-01', y: 7 },
                        { x: '2018-01-02', y: 5 },
                        { x: '2018-01-03', y: 11 },
                        { x: '2018-01-04', y: 9 },
                        { x: '2018-01-05', y: 13 },
                        { x: '2018-01-06', y: 16 },
                        { x: '2018-01-07', y: 12 },
                    ],
                },
            ]}
            xScale={{
                type: 'time',
            }}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            margin={{
                bottom: 400,
                left: 100,
            }}
            axisBottom={{
                format: '%m/%d',
            }}
        />
    ))
)

stories.add(
    'custom curve interpolation',
    withInfo()(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
        />
    ))
)

stories.add(
    'rendering area',
    withInfo()(() => (
        <Line
            {...commonProperties}
            enableArea={true}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'monotoneX')}
            colorBy={d => d.color}
            dotSize={8}
            dotColor="#fff"
            dotBorderWidth={2}
            data={[
                {
                    id: 'fake corp. A',
                    color: '#547687',
                    data: [0.4, 0.5, 0.7, 0.1, 0.2, 0.5, 0.6, 0.5].map((y, i) => ({
                        x: `#${i}`,
                        y,
                    })),
                },
                {
                    id: 'fake corp. B',
                    color: '#7f98a5',
                    data: [0.5, 0.6, 0.8, 0.7, 0.8, 0.5, 0.2, 0.3].map((y, i) => ({
                        x: `#${i}`,
                        y,
                    })),
                },
                {
                    id: 'fake corp. C',
                    color: '#a7bac3',
                    data: [0.9, 0.5, 0.6, 0.5, 0.4, 0.3, 0.1, 0.1].map((y, i) => ({
                        x: `#${i}`,
                        y,
                    })),
                },
            ]}
        />
    ))
)

stories.add(
    'enabling dot label',
    withInfo()(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'linear')}
            enableDotLabel={true}
            dotSize={10}
            dotBorderColor="#fff"
            dotBorderWidth={2}
        />
    ))
)

stories.add(
    'abusing dots',
    withInfo()(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'monotoneX')}
            enableDotLabel={true}
            dotSize={26}
            dotLabelYOffset={3}
            axisLeft={{
                tickSize: 10,
            }}
        />
    ))
)

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <g>
        <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
        <circle
            r={size / 5}
            strokeWidth={borderWidth}
            stroke={borderColor}
            fill={color}
            fillOpacity={0.35}
        />
    </g>
)

stories.add(
    'custom dot symbol',
    withInfo()(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'monotoneX')}
            dotSymbol={CustomSymbol}
            dotSize={16}
            dotBorderWidth={1}
            dotBorderColor="inherit:darker(0.3)"
            axisLeft={{
                tickSize: 10,
            }}
        />
    ))
)

stories.add(
    'using data colors',
    withInfo()(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'linear')}
            colorBy={d => d.color}
            enableDotLabel={true}
            dotSize={10}
            dotBorderColor="#fff"
            dotBorderWidth={2}
        />
    ))
)

stories.add(
    'adding markers',
    withInfo()(() => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            curve={select('curve', curveOptions, 'catmullRom')}
            markers={[
                {
                    axis: 'y',
                    value: 100,
                    lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
                    legend: 'y marker',
                    legendOrientation: 'vertical',
                },
                {
                    axis: 'x',
                    value: data[0].data[5].x,
                    lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
                    legend: 'x marker',
                },
            ]}
        />
    ))
)

stories.add(
    'holes in data',
    withInfo()(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            data={[
                {
                    id: 'fake corp. A',
                    data: [4, 8, 5, null, 2, 1, 4, null, 8, 9, 5].map((y, i) => ({
                        x: `#${i}`,
                        y,
                    })),
                },
                {
                    id: 'fake corp. B',
                    data: [5, 9, 8, 6, 3, 1, 2, null, 5, 8, 4].map((y, i) => ({ x: `#${i}`, y })),
                },
            ]}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', false),
            }}
            dotSize={8}
            dotBorderColor="#fff"
            dotBorderWidth={2}
        />
    ))
)

stories.add(
    'different serie lengths',
    withInfo()(() => (
        <Line
            {...commonProperties}
            data={[
                {
                    id: 'fake corp. A',
                    data: [
                        { x: 0, y: 7 },
                        { x: 1, y: 5 },
                        { x: 2, y: 11 },
                        { x: 3, y: 12 },
                        { x: 4, y: 13 },
                    ],
                },
                {
                    id: 'fake corp. B',
                    data: [
                        { x: 3, y: 14 },
                        { x: 4, y: 16 },
                        { x: 5, y: 19 },
                        { x: 6, y: 20 },
                        { x: 7, y: 18 },
                    ],
                },
                {
                    id: 'fake corp. C',
                    data: [
                        { x: 6, y: 18 },
                        { x: 7, y: 16 },
                        { x: 8, y: 8 },
                        { x: 9, y: 10 },
                        { x: 10, y: 9 },
                    ],
                },
            ]}
            xScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
            }}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', false),
            }}
            curve="monotoneX"
        />
    ))
)

stories.add(
    'custom min/max y',
    withInfo()(() => (
        <Line
            {...commonProperties}
            markers={[
                {
                    axis: 'y',
                    value: 0,
                    lineStyle: { stroke: '#b0413e', strokeWidth: 1 },
                    legend: 'y marker at 0',
                    legendPosition: 'bottom-left',
                },
            ]}
            data={[
                {
                    id: 'fake corp. A',
                    data: [
                        0.5,
                        0.6,
                        0.8,
                        0.7,
                        0.8,
                        0.5,
                        0.2,
                        0.3,
                        0.4,
                        0.5,
                        0.5,
                        0.1,
                        -0.2,
                        -0.6,
                        -0.1,
                        0,
                        0.1,
                        -0.1,
                        -0.4,
                        -0.6,
                        -0.5,
                        0.2,
                        0.5,
                        0.6,
                        0.6,
                    ].map((y, i) => ({ x: `#${i}`, y })),
                },
                {
                    id: 'fake corp. B',
                    data: [
                        0.9,
                        0.5,
                        0.6,
                        0.5,
                        0.4,
                        0.3,
                        -0.1,
                        -0.5,
                        -0.4,
                        -0.4,
                        -0.1,
                        -0.3,
                        -0.2,
                        0.1,
                        0.1,
                        0.3,
                        0.4,
                        0.5,
                        0.4,
                        0.6,
                        0.5,
                        0.7,
                        0.8,
                        0.4,
                        0.3,
                    ].map((y, i) => ({ x: `#${i}`, y })),
                },
            ]}
            curve={select('curve', curveOptions, 'monotoneX')}
            dotSize={8}
            dotBorderColor="#fff"
            dotBorderWidth={2}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', false),
                min: -1,
                max: 1,
            }}
        />
    ))
)

stories.add(
    'formatting axis values',
    withInfo()(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            axisLeft={{
                format: value =>
                    `${Number(value).toLocaleString('ru-RU', {
                        minimumFractionDigits: 2,
                    })} ₽`,
            }}
        />
    ))
)

stories.add(
    'formatting tooltip values',
    withInfo()(() => (
        <Line
            {...commonProperties}
            curve="monotoneX"
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
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
    'custom tooltip',
    withInfo()(() => (
        <Line
            {...commonProperties}
            enableStackTooltip={true}
            curve={select('curve', curveOptions, 'linear')}
            yScale={{
                type: 'linear',
                stacked: boolean('stacked', true),
            }}
            tooltip={slice => {
                return (
                    <div>
                        <h2>{slice.id}</h2>
                        {slice.points.map((e, i) => (
                            <p key={i}>
                                <strong>{e.id}:</strong> {e.y}
                            </p>
                        ))}
                    </div>
                )
            }}
            theme={{
                tooltip: {
                    container: {
                        border: '1px solid red',
                    },
                },
            }}
        />
    ))
)
