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
