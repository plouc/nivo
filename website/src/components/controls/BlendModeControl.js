import React from 'react'
import { blendModes } from '@nivo/core'
import { ChoicesControl } from './ChoicesControl'

const choices = blendModes.map(mode => ({
    label: mode,
    value: mode,
}))

const BlendModeControl = ({ options, ...props }) => (
    <ChoicesControl
        {...props}
        options={{
            ...options,
            choices,
        }}
    />
)

export default BlendModeControl
