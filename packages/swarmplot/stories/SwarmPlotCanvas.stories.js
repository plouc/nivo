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
    width: 600,
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
    ...generateSwarmPlotData(['group A', 'group B', 'group C', 'group D', 'group E'], {
        min: 40,
        max: 60,
    }),
}

const stories = storiesOf('SwarmPlotCanvas', module)

stories.add('default', () => <SwarmPlotCanvas {...commonProps} />)
