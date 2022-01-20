import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Text',
    type: 'text',
    value: 'Hi there!',
}

const props = [
    {
        name: 'type',
        type: `'text'`,
        required: true,
    },
    {
        name: 'value',
        type: 'string',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="TextControl" config={config} props={props} />
}
