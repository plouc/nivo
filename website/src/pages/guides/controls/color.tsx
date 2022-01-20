import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Color',
    type: 'color',
    value: '#d33d1c',
}

const props = [
    {
        name: 'type',
        type: `'color'`,
        required: true,
    },
    {
        name: 'value',
        type: 'string',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="ColorControl" config={config} props={props} />
}
