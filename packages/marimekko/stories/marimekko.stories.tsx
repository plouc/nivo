import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Marimekko, Layout } from '../src'

const commonProps = {
    width: 900,
    height: 500,
    margin: {
        top: 40,
        right: 80,
        bottom: 40,
        left: 80,
    },
    id: 'id',
    value: 'value',
    layout: 'vertical' as Layout,
    axisLeft: {},
    axisBottom: {},
    dimensions: [
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
    ],
    data: [
        {
            id: 'A',
            value: 42,
            cool: 9,
            notCool: 13,
            yabai: 32,
        },
        {
            id: 'B',
            value: 7,
            cool: 12,
            notCool: 24,
            yabai: 17,
        },
        {
            id: 'C',
            value: 15,
            cool: 21,
            notCool: 8,
            yabai: 12,
        },
    ],
}

const stories = storiesOf('Marimekko', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Marimekko {...commonProps} />)

stories.add('using arrays for data', () => {
    type RawDatum = [string, number, number, number, number]

    const data: RawDatum[] = [
        ['A', 42, 9, 3, 31],
        ['B', 21, 13, 21, 9],
        ['C', 34, 7, 12, 32],
    ]

    return (
        <Marimekko<RawDatum>
            {...commonProps}
            data={data}
            id={0}
            value={1}
            dimensions={[
                {
                    id: 'cool stuff',
                    value: 2,
                },
                {
                    id: 'not cool stuff',
                    value: 3,
                },
                {
                    id: 'YABAI!',
                    value: 4,
                },
            ]}
        />
    )
})

stories.add('diverging', () => {
    const data = [
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
            cool: 12,
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
    ]

    return (
        <Marimekko
            {...commonProps}
            data={data}
            layout="vertical"
            offset="diverging"
            axisLeft={{
                format: (v: number) => Math.abs(v),
            }}
        />
    )
})
