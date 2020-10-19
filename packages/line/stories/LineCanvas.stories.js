/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { generateDrinkStats } from '@nivo/generators'
import { LineCanvas } from '../src'

const data = generateDrinkStats(32)
const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    data,
    pointSize: 8,
    pointColor: { theme: 'background' },
    pointBorderWidth: 2,
    pointBorderColor: { theme: 'background' },
}

const stories = storiesOf('LineCanvas', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <LineCanvas {...commonProperties} />)

stories.add(
    'holes in data',
    () => (
        <LineCanvas
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
            curve="monotoneX"
        />
    ),
    {
        info: {
            text: `You can skip portions of the lines by setting y value to \`null\`.`,
        },
    }
)

stories.add(
    'different series lengths',
    () => (
        <LineCanvas
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
                stacked: false,
            }}
            curve="monotoneX"
            enableArea={true}
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

stories.add('time scale', () => (
    <LineCanvas
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
        enablePointLabel={true}
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

stories.add('custom line style', () => (
    <LineCanvas
        {...commonProperties}
        layers={[
            'grid',
            'markers',
            'areas',
            ({ lineGenerator, series, ctx, lineWidth, innerWidth }) => {
                lineGenerator.context(ctx)
                series.forEach(serie => {
                    const gradient = ctx.createLinearGradient(0, 0, innerWidth, 0)
                    gradient.addColorStop('0', 'white')
                    gradient.addColorStop('0.5', serie.color)
                    gradient.addColorStop('1.0', 'black')
                    ctx.strokeStyle = gradient
                    ctx.lineWidth = lineWidth
                    ctx.beginPath()
                    lineGenerator(serie.data.map(d => d.position))
                    ctx.stroke()
                })
            },
            'points',
            'mesh',
            'legends',
        ]}
    />
))
