import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateCountriesData } from '@nivo/generators'
import { BarCanvas } from '../src'

const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']
const commonProps = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: generateCountriesData(keys, { size: 7 }),
    indexBy: 'country',
    keys,
    padding: 0.2,
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16,
}

const stories = storiesOf('BarCanvas', module)

stories.add('custom tooltip', () => (
    <BarCanvas
        {...commonProps}
        tooltip={({ id, value, color }) => (
            <strong style={{ color }}>
                {id}: {value}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
    />
))
