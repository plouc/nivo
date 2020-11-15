import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Marimekko } from '../src'

const commonProps = {
    width: 900,
    height: 500,
}

const stories = storiesOf('Marimekko', module)

stories.addDecorator(withKnobs)

stories.add('default', () => (
    <Marimekko
        {...commonProps}
        id="id"
        value="value"
        layout="vertical"
        borderWidth={2}
        dimensions={[
            {
                id: 'cool stuff',
                value: 'cool',
            },
            {
                id: 'not cool stuff',
                value: 'notCool',
            },
            {
                id: 'YABAI!',
                value: 'yabai',
            },
        ]}
        data={[
            {
                id: 'A',
                value: 42,
                cool: 9,
                notCool: -13,
                yabai: 32,
            },
            {
                id: 'B',
                value: 7,
                notCool: -24,
                yabai: 17,
            },
            {
                id: 'C',
                value: 15,
                cool: 21,
                notCool: -8,
                yabai: 12,
            },
        ]}
    />
))
