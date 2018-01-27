import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { generateLibTree } from '@nivo/generators'
import { Sunburst } from '@nivo/sunburst'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    animate: true,
}

const stories = storiesOf('Sunburst', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', () => <Sunburst {...commonProperties} />)

stories.add('with child color modifier', () => (
    <Sunburst {...commonProperties} childColor="inherit:brighter(0.13)" />
))
