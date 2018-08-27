import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { generateLibTree } from '@nivo/generators'
import { Sunburst } from '../index'

const commonProperties = {
    width: 900,
    height: 500,
    data: generateLibTree(),
    identity: 'name',
    value: 'loc',
    animate: true,
}

const stories = storiesOf('Sunburst', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', withInfo()(() => <Sunburst {...commonProperties} />))

stories.add(
    'with child color modifier',
    withInfo()(() => <Sunburst {...commonProperties} childColor="inherit:brighter(0.13)" />)
)
