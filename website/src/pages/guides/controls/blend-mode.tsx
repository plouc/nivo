import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Blend Mode',
    type: 'blend_mode',
    value: 'multiply',
}

const props = [
    {
        name: 'type',
        type: `'blend_mode'`,
        required: true,
    },
    {
        name: 'value',
        type: 'string',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="BlendModeControl" config={config} props={props} />
}
