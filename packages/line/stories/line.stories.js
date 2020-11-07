/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component, useState, useEffect } from 'react'
import range from 'lodash/range'
import last from 'lodash/last'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateDrinkStats } from '@nivo/generators'
import { Defs, linearGradientDef } from '@nivo/core'
import { area, curveMonotoneX } from 'd3-shape'
import * as time from 'd3-time'
import { timeFormat } from 'd3-time-format'
import { Line } from '../src'

const data = generateDrinkStats(18)
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    data,
    animate: true,
    enableSlices: 'x',
}

const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter']

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

const stories = storiesOf('Line', module)

stories.addDecorator(withKnobs)

stories.add(
    'stacked lines',
    () => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: true,
            }}
            curve={select('curve', curveOptions, 'linear')}
        />
    ),
    {
        info: {
            text: `
                You can stack lines using the \`yScale.stacked\` property.
                Please note that stacking is only supported for linear scales.
            `,
        },
    }
)

stories.add(
    'linear scale',
    () => (
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
            axisLeft={{
                legend: 'linear scale',
                legendOffset: 12,
            }}
            axisBottom={{
                legend: 'linear scale',
                legendOffset: -12,
            }}
        />
    ),
    {
        info: {
            text: `
                By default, \`xScale\` is a point scale, but you can switch to linear using
                the \`xScale.type\` property. It supports irregular intervals while \`point\`
                scale doesn't.

                If you want missing datums to appear as holes instead of connecting defined ones,
                you should set their y value to \`null\`.
            `,
        },
    }
)

stories.add('time scale', () => (
    <Line
        {...commonProperties}
        data={[
            {
                id: 'fake corp. A',
                data: [
                    { x: '2018-01-01', y: 7 },
                    { x: '2018-01-02', y: 5 },
                    { x: '2018-01-03', y: 11 },
                    { x: '2018-01-04', y: 9 },
                    { x: '2018-01-05', y: 12 },
                    { x: '2018-01-06', y: 16 },
                    { x: '2018-01-07', y: 13 },
                    { x: '2018-01-08', y: 13 },
                ],
            },
            {
                id: 'fake corp. B',
                data: [
                    { x: '2018-01-04', y: 14 },
                    { x: '2018-01-05', y: 14 },
                    { x: '2018-01-06', y: 15 },
                    { x: '2018-01-07', y: 11 },
                    { x: '2018-01-08', y: 10 },
                    { x: '2018-01-09', y: 12 },
                    { x: '2018-01-10', y: 9 },
                    { x: '2018-01-11', y: 7 },
                ],
            },
        ]}
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            stacked: boolean('stacked', false),
        }}
        axisLeft={{
            legend: 'linear scale',
            legendOffset: 12,
        }}
        axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: 'time scale',
            legendOffset: -12,
        }}
        curve={select('curve', curveOptions, 'monotoneX')}
        enablePointLabel={true}
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        enableSlices={false}
    />
))

stories.add('logarithmic scale', () => (
    <Line
        {...commonProperties}
        data={[
            {
                id: 'fake corp. A',
                data: [
                    { x: 1, y: 12 },
                    { x: 2, y: 123 },
                    { x: 3, y: 870 },
                    { x: 4, y: 21000 },
                    { x: 7, y: 400000 },
                    { x: 9, y: 10000 },
                    { x: 16, y: 10000000 },
                ],
            },
        ]}
        gridYValues={[10, 100, 1000, 10000, 100000, 1000000, 10000000]}
        xScale={{
            type: 'log',
            base: 2,
            max: 'auto',
        }}
        axisBottom={{
            legend: 'logarithmic scale (base: 2)',
            legendOffset: -12,
        }}
        yScale={{
            type: 'log',
            base: 10,
            max: 'auto',
        }}
        axisLeft={{
            tickValues: [10, 100, 1000, 10000, 100000, 1000000, 10000000],
            legend: 'logarithmic scale (base: 10)',
            legendOffset: 12,
        }}
        useMesh={true}
        enableSlices={false}
    />
))

stories.add('symmetric logarithmic scale', () => (
    <Line
        {...commonProperties}
        data={[
            {
                id: 'fake corp. A',
                data: [
                    { x: 1, y: -12 },
                    { x: 2, y: 123 },
                    { x: 3, y: 870 },
                    { x: 4, y: 210 },
                    { x: 7, y: 400 },
                    { x: 9, y: 100 },
                    { x: 16, y: 1000 },
                ],
            },
        ]}
        xScale={{
            type: 'linear',
            max: 'auto',
        }}
        yScale={{
            type: 'symlog',
            max: 'auto',
        }}
        axisLeft={{
            tickValues: [0, 100, 250, 500, 1000],
            legend: 'symmetric logarithmic scale',
            legendOffset: 12,
        }}
        useMesh={true}
        enableSlices={false}
    />
))

class RealTimeChart extends Component {
    constructor(props) {
        super(props)

        const date = new Date()
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)

        this.state = {
            dataA: range(100).map(i => ({
                x: time.timeMinute.offset(date, i * 30),
                y: 10 + Math.round(Math.random() * 20),
            })),
            dataB: range(100).map(i => ({
                x: time.timeMinute.offset(date, i * 30),
                y: 30 + Math.round(Math.random() * 20),
            })),
            dataC: range(100).map(i => ({
                x: time.timeMinute.offset(date, i * 30),
                y: 60 + Math.round(Math.random() * 20),
            })),
        }

        this.formatTime = timeFormat('%Y %b %d')
    }

    componentDidMount() {
        this.timer = setInterval(this.next, 100)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    next = () => {
        const dataA = this.state.dataA.slice(1)
        dataA.push({
            x: time.timeMinute.offset(last(dataA).x, 30),
            y: 10 + Math.round(Math.random() * 20),
        })
        const dataB = this.state.dataB.slice(1)
        dataB.push({
            x: time.timeMinute.offset(last(dataB).x, 30),
            y: 30 + Math.round(Math.random() * 20),
        })
        const dataC = this.state.dataC.slice(1)
        dataC.push({
            x: time.timeMinute.offset(last(dataC).x, 30),
            y: 60 + Math.round(Math.random() * 20),
        })

        this.setState({ dataA, dataB, dataC })
    }

    render() {
        const { dataA, dataB, dataC } = this.state

        return (
            <Line
                {...commonProperties}
                margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
                data={[
                    { id: 'A', data: dataA },
                    { id: 'B', data: dataB },
                    { id: 'C', data: dataC },
                ]}
                xScale={{ type: 'time', format: 'native' }}
                yScale={{ type: 'linear', max: 100 }}
                axisTop={{
                    format: '%H:%M',
                    tickValues: 'every 4 hours',
                }}
                axisBottom={{
                    format: '%H:%M',
                    tickValues: 'every 4 hours',
                    legend: `${this.formatTime(dataA[0].x)} ——— ${this.formatTime(last(dataA).x)}`,
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                axisRight={{}}
                enablePoints={false}
                enableGridX={true}
                curve="monotoneX"
                animate={false}
                motionStiffness={120}
                motionDamping={50}
                isInteractive={false}
                enableSlices={false}
                useMesh={true}
                theme={{
                    axis: { ticks: { text: { fontSize: 14 } } },
                    grid: { line: { stroke: '#ddd', strokeDasharray: '1 2' } },
                }}
            />
        )
    }
}

stories.add('real time chart', () => <RealTimeChart />)

const GrowingLine = () => {
    const [points, setPoints] = useState([{ x: 0, y: 50 }])

    useEffect(() => {
        if (points.length === 101) return

        setTimeout(() => {
            setPoints(p => {
                const prev = p[p.length - 1]

                return [
                    ...p,
                    {
                        x: prev.x + 1,
                        y: Math.max(Math.min(prev.y + Math.random() * 10 - 5, 100), 0),
                    },
                ]
            })
        }, 300)
    }, [points, setPoints])

    return (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
            }}
            xScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
            }}
            data={[{ id: 'serie', data: points }]}
            axisBottom={{
                tickValues: 4,
            }}
            axisLeft={{
                tickValues: 4,
            }}
            isInteractive={false}
            animate={false}
            enableArea={true}
        />
    )
}

stories.add('growing line', () => <GrowingLine />)

stories.add('custom point symbol', () => (
    <Line
        {...commonProperties}
        yScale={{
            type: 'linear',
            stacked: boolean('stacked', true),
        }}
        curve={select('curve', curveOptions, 'monotoneX')}
        pointSymbol={CustomSymbol}
        pointSize={16}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        axisLeft={{
            tickSize: 10,
        }}
    />
))

stories.add('using data colors', () => (
    <Line
        {...commonProperties}
        yScale={{
            type: 'linear',
            stacked: true,
        }}
        curve="linear"
        colors={{ datum: 'color' }}
        enablePointLabel={true}
        pointSize={10}
        pointBorderColor={{ theme: 'background' }}
        pointBorderWidth={2}
        enableSlices={false}
        useMesh={true}
    />
))

stories.add('adding markers', () => (
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

stories.add(
    'holes in data',
    () => (
        <Line
            {...commonProperties}
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
            curve={select('curve', curveOptions, 'monotoneX')}
            pointSize={8}
            pointBorderColor="#fff"
            pointBorderWidth={2}
        />
    ),
    {
        info: {
            text: `You can skip portions of the lines by setting y value to \`null\`.`,
        },
    }
)

stories.add(
    'different serie lengths',
    () => (
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
                        { x: 5, y: null },
                        { x: 6, y: 18 },
                        { x: 7, y: 16 },
                        { x: 8, y: 8 },
                        { x: 9, y: 10 },
                        { x: 10, y: 9 },
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
    ),
    {
        info: {
            text: `
                Please note that when using stacked y scale with variable length/data holes,
                if one of the y value is \`null\` all subsequent values will be skipped
                as we cannot properly compute the sum.
            `,
        },
    }
)

stories.add('custom min/max y', () => (
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
        pointSize={8}
        pointBorderColor="#fff"
        pointBorderWidth={2}
        yScale={{
            type: 'linear',
            stacked: boolean('stacked', false),
            min: -1,
            max: 1,
        }}
    />
))

stories.add('non linear values', () => (
    <Line
        {...commonProperties}
        xScale={{
            type: 'linear',
            min: 0,
            max: 12,
        }}
        yScale={{
            type: 'linear',
            min: 0,
            max: 11,
        }}
        colors="black"
        curve="linear"
        animate={false}
        lineWidth={4}
        pointSize={8}
        pointColor="white"
        pointBorderColor={{ from: 'serieColor' }}
        pointBorderWidth={2}
        enableSlices={false}
        useMesh={true}
        debugMesh={true}
        data={[
            {
                id: 'nivo',
                data: [
                    { x: 1, y: 1 },
                    { x: 1, y: 10 },
                    { x: 2.25, y: 10 },
                    { x: 3, y: 4 },
                    { x: 3, y: 10 },
                    { x: 4, y: 10 },
                    { x: 4, y: 1 },
                    { x: 2.75, y: 1 },
                    { x: 2, y: 7 },
                    { x: 2, y: 1 },
                    { x: 1, y: 1 },
                    { x: null, y: null },
                    { x: 4.5, y: 1 },
                    { x: 5.5, y: 1 },
                    { x: 5.5, y: 10 },
                    { x: 4.5, y: 10 },
                    { x: 4.5, y: 1 },
                    { x: null, y: null },
                    { x: 6.5, y: 1 },
                    { x: 7.5, y: 1 },
                    { x: 8.5, y: 10 },
                    { x: 7.5, y: 10 },
                    { x: 7, y: 4 },
                    { x: 6.5, y: 10 },
                    { x: 5.5, y: 10 },
                    { x: 6.5, y: 1 },
                    { x: null, y: null },
                    { x: 9.5, y: 1 },
                    { x: 10.5, y: 1 },
                    { x: 11.5, y: 3 },
                    { x: 11.5, y: 8 },
                    { x: 10.5, y: 10 },
                    { x: 9.5, y: 10 },
                    { x: 8.5, y: 8 },
                    { x: 8.5, y: 3 },
                    { x: 9.5, y: 1 },
                    { x: null, y: null },
                    { x: 9.5, y: 4 },
                    { x: 10.5, y: 4 },
                    { x: 10.5, y: 7 },
                    { x: 9.5, y: 7 },
                    { x: 9.5, y: 4 },
                ],
            },
        ]}
    />
))

stories.add(
    'highlighting negative values',
    () => (
        <Line
            {...commonProperties}
            data={[
                {
                    id: 'positive :)',
                    data: [
                        { x: 0, y: 0.7 },
                        { x: 1, y: 0.9 },
                        { x: 2, y: 0.8 },
                        { x: 3, y: 0.6 },
                        { x: 4, y: 0.3 },
                        { x: 5, y: 0 },
                        { x: 6, y: null },
                        { x: 7, y: null },
                        { x: 8, y: null },
                        { x: 9, y: null },
                        { x: 10, y: null },
                        { x: 11, y: 0 },
                        { x: 12, y: 0.4 },
                        { x: 13, y: 0.6 },
                        { x: 14, y: 0.5 },
                        { x: 15, y: 0.3 },
                        { x: 16, y: 0.4 },
                        { x: 17, y: 0 },
                    ],
                },
                {
                    id: 'negative :(',
                    data: [
                        { x: 5, y: 0 },
                        { x: 6, y: -0.3 },
                        { x: 7, y: -0.5 },
                        { x: 8, y: -0.9 },
                        { x: 9, y: -0.2 },
                        { x: 10, y: -0.4 },
                        { x: 11, y: 0 },
                        { x: 12, y: null },
                        { x: 13, y: null },
                        { x: 14, y: null },
                        { x: 15, y: null },
                        { x: 16, y: null },
                        { x: 17, y: 0 },
                        { x: 18, y: -0.4 },
                        { x: 19, y: -0.2 },
                        { x: 20, y: -0.1 },
                        { x: 21, y: -0.6 },
                    ],
                },
            ]}
            curve={select('curve', curveOptions, 'monotoneX')}
            enablePointLabel={true}
            pointSymbol={CustomSymbol}
            pointSize={14}
            pointBorderWidth={1}
            pointBorderColor={{
                from: 'color',
                modifiers: [['darker', 0.3]],
            }}
            pointLabelYOffset={-20}
            enableGridX={false}
            colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
            xScale={{
                type: 'linear',
            }}
            yScale={{
                type: 'linear',
                stacked: false,
                min: -1,
                max: 1,
            }}
            enableArea={true}
            areaOpacity={0.07}
            enableSlices={false}
            useMesh={true}
            crosshairType="cross"
        />
    ),
    {
        info: {
            text: `
                You can have two different line styles for a line if you split it into
                two data set, one containing positive values and negative values filled with \`null\`
                and the other having only negative values and positive ones replaced by \`null\`.
            `,
        },
    }
)

stories.add('formatting axis values', () => (
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

stories.add('formatting values', () => (
    <Line
        {...commonProperties}
        curve="monotoneX"
        yScale={{
            type: 'linear',
            stacked: boolean('stacked', true),
        }}
        yFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('custom tooltip', () => (
    <Line
        {...commonProperties}
        enableSlices="x"
        curve={select('curve', curveOptions, 'linear')}
        yScale={{
            type: 'linear',
            stacked: boolean('stacked', true),
        }}
        sliceTooltip={({ slice }) => {
            return (
                <div
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                    }}
                >
                    <div>x: {slice.id}</div>
                    {slice.points.map(point => (
                        <div
                            key={point.id}
                            style={{
                                color: point.serieColor,
                                padding: '3px 0',
                            }}
                        >
                            <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                        </div>
                    ))}
                </div>
            )
        }}
    />
))

const AreaLayer = ({ series, xScale, yScale, innerHeight }) => {
    const areaGenerator = area()
        .x(d => xScale(d.data.x))
        .y0(d => Math.min(innerHeight, yScale(d.data.y - 40)))
        .y1(d => yScale(d.data.y + 10))
        .curve(curveMonotoneX)

    return (
        <>
            <Defs
                defs={[
                    {
                        id: 'pattern',
                        type: 'patternLines',
                        background: 'transparent',
                        color: '#3daff7',
                        lineWidth: 1,
                        spacing: 6,
                        rotation: -45,
                    },
                ]}
            />
            <path
                d={areaGenerator(series[0].data)}
                fill="url(#pattern)"
                fillOpacity={0.6}
                stroke="#3daff7"
                strokeWidth={2}
            />
        </>
    )
}

stories.add(
    'custom layers',
    () => (
        <Line
            {...commonProperties}
            yScale={{
                type: 'linear',
                stacked: true,
            }}
            data={commonProperties.data.filter(d => ['rhum', 'whisky'].includes(d.id))}
            lineWidth={3}
            curve="linear"
            colors={['#028ee6', '#774dd7']}
            enableGridX={false}
            pointSize={12}
            pointColor="white"
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            layers={[
                'grid',
                'markers',
                'areas',
                AreaLayer,
                'lines',
                'slices',
                'axes',
                'points',
                'legends',
            ]}
            theme={{
                crosshair: {
                    line: {
                        strokeWidth: 2,
                        stroke: '#774dd7',
                        strokeOpacity: 1,
                    },
                },
            }}
        />
    ),
    {
        info: {
            text: `
                You can use the layers property to add extra layers
                to the line chart.
            `,
        },
    }
)

const styleById = {
    cognac: {
        strokeDasharray: '12, 6',
        strokeWidth: 2,
    },
    vodka: {
        strokeDasharray: '1, 16',
        strokeWidth: 8,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
    },
    rhum: {
        strokeDasharray: '6, 6',
        strokeWidth: 4,
    },
    default: {
        strokeWidth: 1,
    },
}

const DashedLine = ({ series, lineGenerator, xScale, yScale }) => {
    return series.map(({ id, data, color }) => (
        <path
            key={id}
            d={lineGenerator(
                data.map(d => ({
                    x: xScale(d.data.x),
                    y: yScale(d.data.y),
                }))
            )}
            fill="none"
            stroke={color}
            style={styleById[id] || styleById.default}
        />
    ))
}

stories.add(
    'custom line style',
    () => (
        <Line
            {...commonProperties}
            xScale={{
                type: 'point',
                min: 'auto',
                max: 'auto',
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
            }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            layers={['grid', 'markers', 'areas', DashedLine, 'slices', 'points', 'axes', 'legends']}
        />
    ),
    {
        info: {
            text: `You can customize line styles using the 'layers' property and implement your own line rendering.`,
        },
    }
)

stories.add('area gradients', () => (
    <Line
        {...commonProperties}
        enableArea={true}
        yScale={{
            type: 'linear',
            stacked: true,
        }}
        curve={select('curve', curveOptions, 'linear')}
        defs={[
            linearGradientDef('gradientA', [
                { offset: 0, color: 'inherit' },
                { offset: 100, color: 'inherit', opacity: 0 },
            ]),
        ]}
        fill={[{ match: '*', id: 'gradientA' }]}
    />
))
