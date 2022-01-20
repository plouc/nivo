import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Box Anchor',
    type: 'box_anchor',
    value: 'center',
}

const props = [
    {
        name: 'type',
        type: `'box_anchor'`,
        required: true,
    },
    {
        name: 'value',
        type: 'BoxAnchor',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="BoxAnchorControl" config={config} props={props} />
}
