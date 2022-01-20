import React from 'react'
import { ControlPageTemplate } from '../../../components/guides/controls'

export default () => {
    const config = {
        id: 'Color',
        type: 'color',
        value: '#d33d1c',
    }

    return <ControlPageTemplate name="ObjectControl" config={config} />
}
