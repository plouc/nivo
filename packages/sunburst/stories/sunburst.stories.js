import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { generateLibTree } from '@nivo/generators'
import { Sunburst } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    animate: true,
}

const stories = storiesOf('Sunburst', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Sunburst {...commonProperties} />)

stories.add('with child color modifier', () => (
    <Sunburst {...commonProperties} childColor="inherit:brighter(0.13)" />
))

stories.add('with child colors independent of parent', () => (
    <Sunburst {...commonProperties} childColor="noinherit" />
))

const customPalette = ['#ffd700', '#ffb14e', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']

stories.add('with custom colors', () => (
    <Sunburst
        {...commonProperties}
        colors={({ value }) => customPalette[value % (customPalette.length - 1)]}
        childColor="noinherit"
    />
))

stories.add('custom tooltip', () => (
    <Sunburst
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

stories.add('enter/leave (check actions)', () => (
    <Sunburst
        {...commonProperties}
        onMouseEnter={action('onMouseEnter')}
        onMouseLeave={action('onMouseLeave')}
    />
))
