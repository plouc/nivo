import React from 'react'

import { storiesOf } from '@storybook/react'
import { generateChordData } from 'nivo-generators'
import '../style.css'
import { Chord } from '../../src'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    ...generateChordData({ size: 7 }),
    xPadding: 0.2,
}

const stories = storiesOf('Chord', module).addDecorator(story => (
    <div className="wrapper">{story()}</div>
))

stories.add('default', () => <Chord {...commonProperties} />)

stories.add('radial labels', () => <Chord {...commonProperties} labelRotation={-90} />)

const customLabel = d => `${d.id} [${d.value}]`
stories.add('custom labels text', () => (
    <Chord {...commonProperties} {...generateChordData({ size: 5 })} label={customLabel} />
))

stories.add('angle padding', () => (
    <Chord {...commonProperties} labelRotation={-90} padAngle={0.06} />
))

stories.add('ribbons offset', () => (
    <Chord {...commonProperties} labelRotation={-90} padAngle={0.02} innerRadiusOffset={0.02} />
))

stories.add('alternative colors', () => (
    <Chord
        {...commonProperties}
        labelRotation={-90}
        padAngle={0.02}
        innerRadiusOffset={0.02}
        colors="d320b"
    />
))

stories.add('putting labels inside arcs', () => (
    <Chord
        {...commonProperties}
        {...generateChordData({ size: 5 })}
        padAngle={0.02}
        innerRadiusRatio={0.8}
        innerRadiusOffset={0.02}
        labelOffset={-30}
        labelTextColor="inherit:darker(1.2)"
    />
))
