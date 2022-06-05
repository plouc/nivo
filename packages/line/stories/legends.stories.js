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
import * as time from 'd3-time'
import { Line, LineCanvas } from '../src'

const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
    enableSlices: 'x',
}
const data = [
    {
        id: 'A',
        data: [
            { x: 0.5, y: 7 },
            { x: 1.0, y: 5 },
            { x: 2.0, y: 11 },
            { x: 3.5, y: 9 },
            { x: 4.5, y: 12 },
            { x: 7.0, y: 16 },
        ],
    },
    {
        id: 'B',
        data: [
            { x: 0.0, y: 14 },
            { x: 1.5, y: 14 },
            { x: 2.5, y: 15 },
            { x: 5.0, y: 11 },
            { x: 6.0, y: 10 },
            { x: 7.5, y: 12 },
        ],
    },
]

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
                r={size / 4}
                strokeWidth={borderWidth}
                stroke={borderColor ?? color ?? fill}
                fill={color ?? fill}
                fillOpacity={0.35}
            />
        </g>
    )
}

const legendWithCustomSymbols = {
    anchor: 'bottom-left',
    direction: 'column',
    translateX: 110,
    itemWidth: 80,
    itemHeight: 24,
    symbolSize: 18,
    symbolBorderWidth: 1,
    symbolBorderColor: {
        from: 'color',
        modifiers: [['darker', 0.3]],
    },
    symbolShape: CustomSymbol,
    data: [
        {
            id: 'A',
            label: 'Alpha',
            color: '#e8c1a0',
        },
        {
            id: 'B',
            label: 'Beta',
            color: '#f47560',
        },
    ],
}
const legendWithDifferentSymbols = {
    anchor: 'top-right',
    direction: 'column',
    translateY: 0,
    translateX: 110,
    itemWidth: 80,
    itemHeight: 22,
    symbolSize: 16,
    symbolBorderWidth: 1,
    symbolBorderColor: '#000000',
    symbolShape: 'square',
    data: [
        {
            id: 'A',
            label: 'Alpha',
            color: '#e8c1a0',
            symbol: 'circle',
        },
        {
            id: 'B',
            label: 'Beta',
            color: '#f47560',
            symbol: 'square',
        },
        {
            id: 'C',
            label: 'Gamma',
            color: '#f1e15b',
            symbol: 'triangle',
        },
        {
            id: 'D',
            label: 'Delta',
            color: '#e8a838',
            symbol: 'invertedTriangle',
        },
        {
            id: 'E',
            label: 'Epsilon',
            color: '#61cdbb',
            symbol: 'diamond',
        },
    ],
}

const stories = storiesOf('Line', module)

stories.addDecorator(withKnobs)

stories.add('svg custom legends', () => (
    <Line
        {...commonProperties}
        margin={{ top: 20, right: 460, bottom: 60, left: 80 }}
        data={data}
        xcurve="monotoneX"
        xScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
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
                ...legendWithCustomSymbols,
                anchor: 'bottom-right',
                translateX: 120,
                title: 'Custom symbols',
            },
            {
                ...legendWithCustomSymbols,
                anchor: 'bottom-right',
                translateX: 240,
                symbolBorderColor: '#444444',
                title: 'Custom symbol (gray border)',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 120,
                symbolBorderWidth: 0,
                title: 'No border',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 240,
                symbolBorderWidth: 1,
                symbolBorderColor: '#444444',
                title: 'Gray border',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 360,
                symbolBorderWidth: 2,
                symbolBorderColor: {
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                },
                title: 'Color border',
            },
        ]}
    />
))

stories.add('canvas custom legends', () => (
    <LineCanvas
        {...commonProperties}
        margin={{ top: 20, right: 460, bottom: 60, left: 80 }}
        data={data}
        xcurve="monotoneX"
        xScale={{
            type: 'linear',
            min: 0,
            max: 'auto',
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
                ...legendWithCustomSymbols,
                anchor: 'bottom-right',
                translateX: 120,
                title: 'Custom symbols',
            },
            {
                ...legendWithCustomSymbols,
                anchor: 'bottom-right',
                translateX: 240,
                symbolBorderColor: '#444444',
                title: 'Custom symbols (gray border)',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 120,
                symbolShape: 'invertedTriangle',
                symbolBorderWidth: 0,
                title: 'No border',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 240,
                symbolShape: 'diamond',
                symbolBorderWidth: 1,
                symbolBorderColor: '#444444',
                title: 'Gray border',
            },
            {
                ...legendWithDifferentSymbols,
                anchor: 'top-right',
                translateX: 360,
                symbolShape: 'triangle',
                symbolBorderWidth: 2,
                symbolBorderColor: {
                    from: 'color',
                    modifiers: [['darker', 0.3]],
                },
                title: 'Color border',
            },
        ]}
    />
))
