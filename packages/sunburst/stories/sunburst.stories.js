import React from 'react'
import { storiesOf } from '@storybook/react'
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
