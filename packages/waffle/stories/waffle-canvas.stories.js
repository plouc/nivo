import React from 'react'
import { storiesOf } from '@storybook/react'
import { WaffleCanvas } from '../src'
import CustomTooltip from './CustomTooltip'

const total = 200
const data = [
    {
        id: 'men',
        label: 'men',
        value: 64,
        color: '#468df3',
    },
    {
        id: 'women',
        label: 'women',
        value: 72,
        color: '#a053f0',
    },
]
const commonProps = {
    width: 900,
    height: 500,
    total,
    data,
    rows: 48,
    columns: 36,
}

const stories = storiesOf('WaffleCanvas', module)

stories.add('default', () => <WaffleCanvas {...commonProps} />)

stories.add('colors', () => <WaffleCanvas {...commonProps} colors={{ scheme: 'category10' }} />)

stories.add('using data color', () => (
    <WaffleCanvas {...commonProps} colorBy={{ datum: 'color' }} />
))

stories.add('fill direction', () => (
    <WaffleCanvas
        {...commonProps}
        width={900}
        height={400}
        fillDirection="left"
        rows={36}
        columns={48}
    />
))

stories.add('custom tooltip', () => (
    <WaffleCanvas
        {...commonProps}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
        tooltip={CustomTooltip}
    />
))
