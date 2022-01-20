import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Line Width',
    type: 'line_width',
    value: 3,
}

const props = [
    {
        name: 'type',
        type: `'line_width'`,
        required: true,
    },
    {
        name: 'value',
        type: 'number',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="LineWidthControl" config={config} props={props} />
}
