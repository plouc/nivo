import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Angle',
    type: 'angle',
    value: 90,
}

const props = [
    {
        name: 'type',
        type: `'angle'`,
        required: true,
    },
    {
        name: 'value',
        type: 'number',
        required: true,
    },
    {
        name: 'start',
        type: 'number',
        required: false,
        defaultValue: 0,
    },
    {
        name: 'min',
        type: 'number',
        required: false,
        defaultValue: 0,
    },
    {
        name: 'max',
        type: 'number',
        required: false,
        defaultValue: 360,
    },
]

export default () => {
    return <ControlPageTemplate name="RadioControl" config={config} props={props} />
}
