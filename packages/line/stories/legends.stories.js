/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import { generateDrinkStats } from '@nivo/generators'
import * as time from 'd3-time'
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

const CustomSymbol = ({ x, y, size, color, fill, borderWidth, borderColor }) => {
    return (
        <g>
            <circle
                cx={x ?? 0}
                cy={y ?? 0}
                fill="#fff"
                r={size / 2}
                strokeWidth={borderWidth}
                stroke={borderColor ?? color ?? fill}
            />
            <circle
                cx={x ?? 0}
                cy={y ?? 0}
                r={size / 5}
                strokeWidth={borderWidth}
                stroke={borderColor ?? color ?? fill}
                fill={color ?? fill}
                fillOpacity={0.35}
            />
        </g>
    )
}

const stories = storiesOf('Line', module)

stories.addDecorator(withKnobs)

stories.add('legend with custom symbol', () => (
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
                ],
            },
            {
                id: 'fake corp. B',
                data: [
                    { x: '2018-01-03', y: 14 },
                    { x: '2018-01-04', y: 14 },
                    { x: '2018-01-05', y: 15 },
                    { x: '2018-01-06', y: 11 },
                    { x: '2018-01-07', y: 10 },
                    { x: '2018-01-08', y: 12 },
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
            stacked: false,
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
        curve={'monotoneX'}
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
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'row',
                translateY: 55,
                itemWidth: 120,
                itemHeight: 12,
                symbolSize: 20,
                symbolBorderWidth: 1,
                symbolBorderColor: {
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                },
                symbolShape: CustomSymbol,
                data: [
                    {
                        id: 'fake corp. A',
                        label: 'Alpha',
                        color: '#e8c1a0',
                    },
                    {
                        id: 'fake corp. B',
                        label: 'Beta',
                        color: '#f47560',
                    },
                ],
            },
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 55,
                itemWidth: 120,
                itemHeight: 12,
                symbolSize: 20,
                symbolBorderWidth: 1,
                symbolBorderColor: '#000000',
                symbolShape: CustomSymbol,
                data: [
                    {
                        id: 'fake corp. A',
                        label: 'Alpha',
                        color: '#e8c1a0',
                    },
                    {
                        id: 'fake corp. B',
                        label: 'Beta',
                        color: '#f47560',
                    },
                ],
            },
        ]}
    />
))
