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
import { generateSwarmPlotData } from '@nivo/generators'
import { SwarmPlot } from '../src'
import SwarmPlotLayers from './SwarmPlotLayers'
import SwarmPlotRenderNode from './SwarmPlotRenderNode'

const commonProps = {
    width: 700,
    height: 360,
    margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
    },
    groupBy: 'group',
    identity: 'id',
    value: 'price',
    valueScale: {
        type: 'linear',
        min: 0,
        max: 500,
    },
    size: 10,
    ...generateSwarmPlotData(['group A', 'group B', 'group C'], { min: 40, max: 60 }),
}

const stories = storiesOf('SwarmPlot', module)

stories.add('default', () => <SwarmPlot {...commonProps} />)

stories.add('extra layers', () => <SwarmPlotLayers />)

stories.add('custom node rendering', () => <SwarmPlotRenderNode />)

stories.add('using annotations', () => (
    <SwarmPlot
        {...commonProps}
        useMesh={true}
        annotations={[
            {
                type: 'circle',
                match: { index: 40 },
                noteX: 40,
                noteY: 40,
                offset: 4,
                note: 'Node at index: 40',
            },
            {
                type: 'rect',
                match: { index: 80 },
                noteX: -40,
                noteY: -40,
                offset: 4,
                note: 'Node at index: 80',
            },
            {
                type: 'dot',
                match: { index: 120 },
                noteX: 0,
                noteY: { abs: -20 },
                size: 6,
                note: 'Node at index: 120',
            },
        ]}
    />
))

const localeTimeFormat = value => new Date(value).toLocaleString()

stories.add('using time scale', () => (
    <SwarmPlot
        {...commonProps}
        data={[
            {
                group: 'group A',
                id: '21c4519f-713f-473b-8ce5-e4078d8822c9',
                timestamp: '2020-09-04T23:10:13.002Z',
                volume: 18,
            },
            {
                group: 'group A',
                id: '91c4519f-713f-473b-8ce5-e4078d882e77',
                timestamp: '2020-09-05T15:10:13.002Z',
                volume: 16,
            },
            {
                group: 'group B',
                id: '91c4519f-713f-473b-8ce5-e4078d882e67',
                timestamp: '2020-09-05T05:10:13.002Z',
                volume: 16,
            },
            {
                group: 'group C',
                id: '91c4519f-713f-473b-8ce5-e4078d882t67',
                timestamp: '2020-09-05T05:10:13.002Z',
                volume: 14,
            },
        ]}
        margin={{
            top: 40,
            right: 40,
            bottom: 40,
            left: 100,
        }}
        value="timestamp"
        valueFormat={localeTimeFormat}
        valueScale={{
            type: 'time',
            format: '%Y-%m-%dT%H:%M:%S.%LZ',
        }}
        size={{ key: 'volume', values: [4, 20], sizes: [6, 20] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: localeTimeFormat,
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'timestamp',
            legendPosition: 'middle',
            legendOffset: 46,
            tickValues: 'every 4 hours',
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'groups',
            legendPosition: 'middle',
            legendOffset: -76,
        }}
        layout="horizontal"
    />
))
