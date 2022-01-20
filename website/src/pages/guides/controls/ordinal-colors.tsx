import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

const config = {
    id: 'Ordinal Colors',
    type: 'ordinal_colors',
    value: 'nivo',
}

const props = [
    {
        name: 'type',
        type: `'ordinal_colors'`,
        required: true,
    },
    {
        name: 'value',
        type: 'SchemeId',
        required: true,
    },
]

export default () => {
    return <ControlPageTemplate name="OrdinalColorsControl" config={config} props={props} />
}
