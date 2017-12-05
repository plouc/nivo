import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { generateChordData } from '@nivo/generators'
import { Chord } from '../es'

const commonProperties = {
    width: 600,
    height: 600,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    ...generateChordData({ size: 7 }),
    xPadding: 0.2,
}

const stories = storiesOf('Chord', module)

stories.add('default', withInfo()(() => <Chord {...commonProperties} />))

stories.add('radial labels', withInfo()(() => <Chord {...commonProperties} labelRotation={-90} />))

const customLabel = d => `${d.id} [${d.value}]`
stories.add(
    'custom labels text',
    withInfo()(() => (
        <Chord {...commonProperties} {...generateChordData({ size: 5 })} label={customLabel} />
    ))
)

stories.add(
    'angle padding',
    withInfo()(() => <Chord {...commonProperties} labelRotation={-90} padAngle={0.06} />)
)

stories.add(
    'ribbons offset',
    withInfo()(() => (
        <Chord {...commonProperties} labelRotation={-90} padAngle={0.02} innerRadiusOffset={0.02} />
    ))
)

stories.add(
    'alternative colors',
    withInfo()(() => (
        <Chord
            {...commonProperties}
            labelRotation={-90}
            padAngle={0.02}
            innerRadiusOffset={0.02}
            colors="d320b"
        />
    ))
)

stories.add(
    'putting labels inside arcs',
    withInfo()(() => (
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
)

stories.add(
    'with formatted values',
    withInfo()(() => (
        <Chord
            {...commonProperties}
            {...generateChordData({ size: 5 })}
            tooltipFormat={value =>
                `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        />
    ))
)
