import React from 'react'
import { storiesOf } from '@storybook/react'
import { generateLibTree } from '@nivo/generators'
import { TreeMap } from '../src'

const commonProperties = {
    width: 900,
    height: 400,
    root: generateLibTree(),
    identity: 'name',
    value: 'loc',
    label: 'name',
    labelSkipRadius: 16,
}

storiesOf('TreeMap', module).add('custom tooltip', () => (
    <TreeMap
        {...commonProperties}
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
