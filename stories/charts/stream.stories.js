import React from 'react'
import { range, random } from 'lodash'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import '../style.css'
import { Stream, areaCurvePropKeys } from '../../src'

const keys = ['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']

const commonProperties = {
    width: 900,
    height: 360,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    keys,
    data: range(16).map(() =>
        keys.reduce((layer, key) => {
            layer[key] = random(10, 200)
            return layer
        }, {})
    ),
    animate: true,
}

const stories = storiesOf('Stream', module)

stories.addDecorator(story => <div className="wrapper">{story()}</div>).addDecorator(withKnobs)

stories.add('default', () => <Stream {...commonProperties} />)

stories.add('full height (expand offset)', () => (
    <Stream
        {...commonProperties}
        offsetType="expand"
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
))

stories.add('regular stacked chart', () => (
    <Stream
        {...commonProperties}
        offsetType="none"
        axisLeft={{}}
        curve={select('curve', areaCurvePropKeys, 'catmullRom')}
    />
))

stories.add('custom curve', () => <Stream {...commonProperties} curve="step" />)
