import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Range',
    type: 'range',
    value: 10,
    min: 0,
    max: 100,
    unit: 'px',
}

const props = [
    {
        name: 'type',
        type: `'range'`,
        required: true,
    },
    {
        name: 'value',
        type: 'number',
        required: true,
    },
    {
        name: 'min',
        type: 'number',
        required: true,
        description: 'Forwarded to the underlying range input',
    },
    {
        name: 'max',
        type: 'number',
        required: true,
        description: 'Forwarded to the underlying range input',
    },
    {
        name: 'step',
        type: 'number',
        required: false,
        defaultValue: 1,
        description: 'Forwarded to the underlying range input',
    },
    {
        name: 'unit',
        type: 'Unit',
        required: false,
        description: 'If specified, append a unit to the text input',
    },
]

export default () => {
    return <ControlPageTemplate name="RangeControl" config={config} props={props} />
}
