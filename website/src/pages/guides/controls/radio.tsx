import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Radio',
    type: 'radio',
    value: 'option_a',
    columns: 3,
    choices: [
        { label: 'Option A', value: 'option_a' },
        { label: 'Option B', value: 'option_b' },
        { label: 'Option C', value: 'option_c' },
    ],
}

const props = [
    {
        name: 'type',
        type: `'radio'`,
        required: true,
    },
    {
        name: 'value',
        type: 'string | number',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="RadioControl" config={config} props={props} />
}
