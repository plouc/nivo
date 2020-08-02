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
import { SwarmPlotCanvas } from '../src'

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
    size: 8,
    ...generateSwarmPlotData(
        ['group A', 'group B', 'group C', 'group D', 'group E', 'group F', 'group G'],
        { min: 40, max: 60 }
    ),
}

const stories = storiesOf('SwarmPlotCanvas', module)

stories.add('default', () => <SwarmPlotCanvas {...commonProps} />)

stories.add('using annotations', () => (
    <SwarmPlotCanvas
        {...commonProps}
        annotations={[
            {
                type: 'circle',
                match: { index: 100 },
                noteX: 40,
                noteY: 40,
                offset: 4,
                note: 'Node at index: 100',
            },
            {
                type: 'rect',
                match: { index: 200 },
                noteX: -40,
                noteY: -40,
                offset: 4,
                note: 'Node at index: 200',
            },
            {
                type: 'dot',
                match: { index: 300 },
                noteX: 0,
                noteY: { abs: -20 },
                size: 6,
                note: 'Node at index: 300',
            },
        ]}
    />
))
