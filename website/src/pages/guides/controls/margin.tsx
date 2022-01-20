import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Margin',
    type: 'margin',
    value: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    },
}

const props = [
    {
        name: 'type',
        type: `'margin'`,
        required: true,
    },
    {
        name: 'value',
        type: 'Margin',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="MarginControl" config={config} props={props} />
}
