import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Opacity',
    type: 'opacity',
    value: 0.35,
}

const props = [
    {
        name: 'type',
        type: `'opacity'`,
        required: true,
    },
    {
        name: 'value',
        type: 'number',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="OpacityControl" config={config} props={props} />
}
