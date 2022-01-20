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
]

export default () => {
    return <ControlPageTemplate name="RadioControl" config={config} props={props} />
}
