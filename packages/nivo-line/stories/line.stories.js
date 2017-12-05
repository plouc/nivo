import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateDrinkStats } from '@nivo/generators'
import { Line } from '../es'

const data = generateDrinkStats(18)
const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data,
    animate: true,
}

const curveOptions = ['linear', 'monotoneX']

const stories = storiesOf('Line', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', () => (
    <Line {...commonProperties} curve={select('curve', curveOptions, 'linear')} />
))

stories.add('stacked', () => (
    <Line {...commonProperties} stacked={true} curve={select('curve', curveOptions, 'linear')} />
))

stories.add('with custom curve', () => (
    <Line {...commonProperties} stacked={true} curve="monotoneX" />
))

stories.add('with area', () => (
    <Line
        {...commonProperties}
        enableArea={true}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'monotoneX')}
        colorBy={d => d.color}
        dotSize={8}
        dotColor="#fff"
        dotBorderWidth={2}
        data={[
            {
                id: 'fake corp. A',
                color: '#547687',
                data: [0.4, 0.5, 0.7, 0.1, 0.2, 0.5, 0.6, 0.5].map((y, i) => ({ x: `#${i}`, y })),
            },
            {
                id: 'fake corp. B',
                color: '#7f98a5',
                data: [0.5, 0.6, 0.8, 0.7, 0.8, 0.5, 0.2, 0.3].map((y, i) => ({ x: `#${i}`, y })),
            },
            {
                id: 'fake corp. C',
                color: '#a7bac3',
                data: [0.9, 0.5, 0.6, 0.5, 0.4, 0.3, 0.1, 0.1].map((y, i) => ({ x: `#${i}`, y })),
            },
        ]}
    />
))

stories.add('with dot label', () => (
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'linear')}
        enableDotLabel={true}
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
    />
))

stories.add('abusing dots', () => (
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'monotoneX')}
        enableDotLabel={true}
        dotSize={26}
        dotLabelYOffset={3}
        axisLeft={{
            tickSize: 10,
        }}
    />
))

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <rect
        transform={`rotate(45) translate(${size * -0.5}, ${size * -0.5})`}
        width={size}
        height={size}
        fill={color}
        strokeWidth={borderWidth}
        fillOpacity={1}
        stroke={borderColor}
    />
)

stories.add('custom dot symbol', () => (
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'monotoneX')}
        dotSymbol={CustomSymbol}
        dotSize={12}
        dotBorderWidth={1}
        dotBorderColor="inherit:darker(0.3)"
        axisLeft={{
            tickSize: 10,
        }}
    />
))

stories.add('using data colors', () => (
    <Line
        {...commonProperties}
        stacked={boolean('stacked', true)}
        curve={select('curve', curveOptions, 'linear')}
        colorBy={d => d.color}
        enableDotLabel={true}
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
    />
))

stories.add('with markers', () => (
    <Line
        {...commonProperties}
        stacked={true}
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

stories.add('with missing data', () => (
    <Line
        {...commonProperties}
        curve="monotoneX"
        data={[
            {
                id: 'fake corp. A',
                data: [4, 8, 5, null, 2, 1, 4, null, 8, 9, 5].map((y, i) => ({ x: `#${i}`, y })),
            },
            {
                id: 'fake corp. B',
                data: [5, 9, 8, 6, 3, 1, 2, null, 5, 8, 4].map((y, i) => ({ x: `#${i}`, y })),
            },
        ]}
        dotSize={8}
        dotBorderColor="#fff"
        dotBorderWidth={2}
    />
))

stories.add('with custom min/max Y', () => (
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
        stacked={false}
        curve={select('curve', curveOptions, 'monotoneX')}
        dotSize={8}
        dotBorderColor="#fff"
        dotBorderWidth={2}
        minY={-1}
        maxY={1}
    />
))

stories.add('with formatted values', () => (
    <Line
        {...commonProperties}
        axisLeft={{
            format: value =>
                Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                }),
        }}
        curve="monotoneX"
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))
